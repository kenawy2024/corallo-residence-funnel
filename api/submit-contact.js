/**
 * Vercel Serverless Function — POST /api/submit-contact
 * Saves contact form submissions to contacts.json on GitHub
 *
 * Required Vercel env vars:
 *   GITHUB_TOKEN   — Personal Access Token with repo write access
 *   GITHUB_OWNER   — GitHub username (default: kenawy2024)
 *   GITHUB_REPO    — Repository name (default: corallo-residence-funnel)
 *   GITHUB_BRANCH  — Branch (default: master)
 */
export default async function handler(req, res) {
  // Allow CORS for same-origin POST
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Parse body
  const { name, email, phone, unit } = req.body || {};
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
  }

  // GitHub config
  const token  = process.env.GITHUB_TOKEN;
  const owner  = process.env.GITHUB_OWNER  || 'kenawy2024';
  const repo   = process.env.GITHUB_REPO   || 'corallo-residence-funnel';
  const branch = process.env.GITHUB_BRANCH || 'master';
  const file   = 'contacts.json';

  if (!token) {
    return res.status(500).json({ error: 'Server not configured (missing GITHUB_TOKEN)' });
  }

  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'corallo-contact-handler'
  };

  // Fetch existing contacts.json (if exists)
  let existing = [];
  let sha = null;
  try {
    const r = await fetch(`${apiBase}?ref=${branch}`, { headers });
    if (r.ok) {
      const f = await r.json();
      sha = f.sha;
      const decoded = Buffer.from(f.content, 'base64').toString('utf8');
      existing = JSON.parse(decoded);
    }
  } catch (_) {
    // File doesn't exist yet — start fresh
  }

  // Append new entry
  existing.push({
    date:  new Date().toISOString(),
    name:  name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    unit:  (unit || '').trim()
  });

  // Encode and save back to GitHub
  const content = Buffer.from(JSON.stringify(existing, null, 2)).toString('base64');
  const saveBody = {
    message: `New contact: ${name.trim()}`,
    content,
    branch
  };
  if (sha) saveBody.sha = sha;

  const saveRes = await fetch(apiBase, {
    method: 'PUT',
    headers,
    body: JSON.stringify(saveBody)
  });

  if (!saveRes.ok) {
    const err = await saveRes.json().catch(() => ({}));
    return res.status(500).json({ error: 'GitHub save failed: ' + (err.message || saveRes.status) });
  }

  return res.status(200).json({ ok: true });
}
