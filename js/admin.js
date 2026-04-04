/**
 * Corallo CMS — Admin Logic
 * تسجيل دخول + تعديل المحتوى + حفظ على GitHub
 */
(function () {
  'use strict';

  // ==================== CONFIG ====================
  var CMS_PASSWORD = 'corallo2024';
  var CONTENT_FILE  = 'content.json';

  // GitHub settings (stored in localStorage)
  var GH = {
    owner:  function () { return localStorage.getItem('cms_gh_owner')  || 'kenawy2024'; },
    repo:   function () { return localStorage.getItem('cms_gh_repo')   || 'corallo-residence-funnel'; },
    branch: function () { return localStorage.getItem('cms_gh_branch') || 'master'; },
    token:  function () { return localStorage.getItem('cms_gh_token')  || ''; }
  };

  var currentContent = null;  // الـ content.json المحمل

  // ==================== LOGIN ====================
  window.doLogin = function () {
    var pwd = document.getElementById('pwd-input').value;
    if (pwd === CMS_PASSWORD) {
      sessionStorage.setItem('cms_auth', '1');
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      initDashboard();
    } else {
      document.getElementById('login-err').textContent = 'كلمة السر غلط، حاول تاني';
    }
  };

  window.doLogout = function () {
    sessionStorage.removeItem('cms_auth');
    location.reload();
  };

  // تحقق من الجلسة عند تحميل الصفحة
  if (sessionStorage.getItem('cms_auth') === '1') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    initDashboard();
  }

  // ==================== TABS ====================
  window.showTab = function (name, btn) {
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.getElementById('tab-' + name).classList.add('active');
    if (btn) btn.classList.add('active');
  };

  // ==================== INIT ====================
  function initDashboard() {
    loadGitHubSettings();
    loadContent();
  }

  // ==================== LOAD CONTENT ====================
  function loadContent() {
    setStatus('جاري تحميل المحتوى…', 'saving');
    fetch(CONTENT_FILE + '?_=' + Date.now())
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        currentContent = data;
        populateForms(data);
        setStatus('تم تحميل المحتوى ✓', 'success');
      })
      .catch(function (e) {
        setStatus('تعذّر تحميل content.json — ' + e.message, 'error');
        // استخدم محتوى فارغ
        currentContent = buildEmptyContent();
        populateForms(currentContent);
      });
  }

  // ==================== POPULATE FORMS ====================
  function populateForms(data) {
    var g = data.general || {};
    setValue('g-whatsapp', g.whatsapp_number);
    setValue('g-phone', g.phone_display);
    setValue('g-logo', g.logo);

    var a = data.landing_a || {};
    setValue('a-meta-title',    a.meta_title);
    setValue('a-hero-badge',    a.hero_badge);
    setValue('a-hero-title',    a.hero_title);
    setValue('a-hero-subtitle', a.hero_subtitle);
    setValue('a-stat-families',  a.stat_families);
    setValue('a-stat-occupancy', a.stat_occupancy);
    setValue('a-stat-airport',   a.stat_airport);
    setValue('a-scarcity-text',  a.scarcity_text);
    renderUnitsTable('a', a.units || []);
    renderPlansTable('a', a.payment_plans || []);

    var b = data.landing_b || {};
    setValue('b-meta-title',    b.meta_title);
    setValue('b-hero-badge',    b.hero_badge);
    setValue('b-hero-title',    b.hero_title);
    setValue('b-hero-subtitle', b.hero_subtitle);
    setValue('b-stat-roi',       b.stat_roi);
    setValue('b-stat-occupancy', b.stat_occupancy);
    setValue('b-stat-monthly',   b.stat_monthly);
    renderUnitsTable('b', b.units || []);
    renderPlansTable('b', b.payment_plans || []);

    var en = data.landing_en || {};
    setValue('en-meta-title',    en.meta_title);
    setValue('en-hero-badge',    en.hero_badge);
    setValue('en-hero-title',    en.hero_title);
    setValue('en-hero-subtitle', en.hero_subtitle);
    setValue('en-hero-scarcity', en.hero_scarcity);
    setValue('en-stat-roi',       en.stat_roi);
    setValue('en-stat-occupancy', en.stat_occupancy);
    setValue('en-stat-from',      en.stat_from);
    renderUnitsTable('en', en.units || []);
    renderTestimonialsTable(en.testimonials || []);
  }

  function setValue(id, val) {
    var el = document.getElementById(id);
    if (el && val != null) el.value = val;
  }

  // ==================== UNITS TABLES ====================
  function renderUnitsTable(page, units) {
    var tbody = document.getElementById('units-' + page + '-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    units.forEach(function (u, i) {
      tbody.appendChild(buildUnitRow(page, u, i));
    });
  }

  function buildUnitRow(page, u, idx) {
    var tr = document.createElement('tr');
    tr.dataset.idx = idx;

    if (page === 'a') {
      tr.innerHTML =
        '<td><input type="text" value="' + esc(u.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(u.badge || '') + '" data-field="badge" style="min-width:80px;"></td>' +
        '<td><input type="text" value="' + esc(u.emoji || '') + '" data-field="emoji" style="min-width:50px;"></td>' +
        '<td><input type="text" value="' + esc(u.size) + '" data-field="size"></td>' +
        '<td><input type="text" value="' + esc(u.bathrooms) + '" data-field="bathrooms"></td>' +
        '<td><input type="text" value="' + esc(u.view) + '" data-field="view"></td>' +
        '<td><input type="text" value="' + esc(u.price) + '" data-field="price"></td>' +
        '<td>' + buildImgCell(u.image, page, idx) + '</td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    } else if (page === 'b') {
      tr.innerHTML =
        '<td><input type="text" value="' + esc(u.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(u.price_egp) + '" data-field="price_egp"></td>' +
        '<td><input type="text" value="' + esc(u.rent_usd) + '" data-field="rent_usd"></td>' +
        '<td><input type="text" value="' + esc(u.roi) + '" data-field="roi" style="min-width:70px;"></td>' +
        '<td><input type="text" value="' + esc(u.size) + '" data-field="size"></td>' +
        '<td><input type="text" value="' + esc(u.occupancy) + '" data-field="occupancy" style="min-width:60px;"></td>' +
        '<td><input type="text" value="' + esc(u.badge) + '" data-field="badge"></td>' +
        '<td><select data-field="badge_type"><option value="green"' + (u.badge_type==='green'?' selected':'') + '>green</option><option value="gold"' + (u.badge_type==='gold'?' selected':'') + '>gold</option></select></td>' +
        '<td style="text-align:center;"><input type="checkbox" data-field="featured"' + (u.featured?' checked':'') + '></td>' +
        '<td>' + buildImgCell(u.image, page, idx) + '</td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    } else if (page === 'en') {
      tr.innerHTML =
        '<td><input type="text" value="' + esc(u.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(u.price) + '" data-field="price" style="min-width:80px;"></td>' +
        '<td><input type="text" value="' + esc(u.size) + '" data-field="size" style="min-width:70px;"></td>' +
        '<td><input type="text" value="' + esc(u.beds) + '" data-field="beds" style="min-width:70px;"></td>' +
        '<td><input type="text" value="' + esc(u.baths) + '" data-field="baths" style="min-width:70px;"></td>' +
        '<td><input type="text" value="' + esc(u.desc) + '" data-field="desc" style="min-width:160px;"></td>' +
        '<td><input type="text" value="' + esc(u.badge) + '" data-field="badge" style="min-width:80px;"></td>' +
        '<td>' + buildImgCell(u.image, page, idx) + '</td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    }
    return tr;
  }

  function buildImgCell(imgPath, page, idx) {
    var preview = imgPath
      ? '<img src="' + esc(imgPath) + '" class="img-preview" onerror="this.style.display=\'none\'">'
      : '<div class="img-preview-empty">لا صورة</div>';
    return '<div style="text-align:center;">' + preview + '<br>' +
      '<input type="file" accept="image/*" style="font-size:0.72rem;margin-top:4px;" ' +
      'onchange="handleImageUpload(this,\'' + page + '\',' + idx + ')">' +
      '<input type="hidden" data-field="image" value="' + esc(imgPath || '') + '">' +
      '</div>';
  }

  // ==================== PLANS TABLES ====================
  function renderPlansTable(page, plans) {
    var tbody = document.getElementById('plans-' + page + '-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    plans.forEach(function (p, i) {
      tbody.appendChild(buildPlanRow(page, p, i));
    });
  }

  function buildPlanRow(page, p) {
    var tr = document.createElement('tr');
    if (page === 'a') {
      tr.innerHTML =
        '<td><input type="text" value="' + esc(p.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(p.down) + '" data-field="down" style="min-width:60px;"></td>' +
        '<td><input type="text" value="' + esc(p.years) + '" data-field="years" style="min-width:50px;"></td>' +
        '<td><input type="text" value="' + esc(p.discount || '') + '" data-field="discount"></td>' +
        '<td style="text-align:center;"><input type="checkbox" data-field="featured"' + (p.featured?' checked':'') + '></td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    } else if (page === 'b') {
      tr.innerHTML =
        '<td><input type="text" value="' + esc(p.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(p.down) + '" data-field="down" style="min-width:60px;"></td>' +
        '<td><input type="text" value="' + esc(p.years) + '" data-field="years" style="min-width:50px;"></td>' +
        '<td><input type="text" value="' + esc(p.features || '') + '" data-field="features"></td>' +
        '<td><input type="text" value="' + esc(p.discount || '') + '" data-field="discount"></td>' +
        '<td style="text-align:center;"><input type="checkbox" data-field="featured"' + (p.featured?' checked':'') + '></td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    }
    return tr;
  }

  // ==================== TESTIMONIALS TABLE ====================
  function renderTestimonialsTable(testimonials) {
    var tbody = document.getElementById('testimonials-en-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    testimonials.forEach(function (t) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><input type="text" value="' + esc(t.text) + '" data-field="text" style="min-width:200px;"></td>' +
        '<td><input type="text" value="' + esc(t.name) + '" data-field="name"></td>' +
        '<td><input type="text" value="' + esc(t.location) + '" data-field="location"></td>' +
        '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
      tbody.appendChild(tr);
    });
  }

  // ==================== ADD ROW ====================
  window.addUnitRow = function (page) {
    var tbody = document.getElementById('units-' + page + '-body');
    if (!tbody) return;
    var idx = tbody.rows.length;
    var empty = page === 'a'
      ? { name: '', badge: '', emoji: '🛏️', size: '', bathrooms: '', view: '', price: '', image: '' }
      : page === 'b'
      ? { name: '', price_egp: '', rent_usd: '', roi: '', size: '', occupancy: '', badge: '', badge_type: 'gold', featured: false, image: '' }
      : { name: '', price: '', size: '', beds: '', baths: '', desc: '', badge: '', image: '' };
    tbody.appendChild(buildUnitRow(page, empty, idx));
  };

  window.addPlanRow = function (page) {
    var tbody = document.getElementById('plans-' + page + '-body');
    if (!tbody) return;
    var empty = page === 'a'
      ? { name: '', down: '', years: '', discount: '', featured: false }
      : { name: '', down: '', years: '', features: '', discount: '', featured: false };
    tbody.appendChild(buildPlanRow(page, empty));
  };

  window.addTestimonialRow = function () {
    var tbody = document.getElementById('testimonials-en-body');
    if (!tbody) return;
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><input type="text" value="" data-field="text" style="min-width:200px;"></td>' +
      '<td><input type="text" value="" data-field="name"></td>' +
      '<td><input type="text" value="" data-field="location"></td>' +
      '<td><button class="btn btn-red btn-sm" onclick="removeRow(this)">✕</button></td>';
    tbody.appendChild(tr);
  };

  window.removeRow = function (btn) {
    btn.closest('tr').remove();
  };

  // ==================== IMAGE UPLOAD ====================
  window.handleImageUpload = function (input, page, idx) {
    if (!input.files || !input.files[0]) return;
    var file = input.files[0];
    var token = GH.token();
    if (!token) {
      alert('ادخل GitHub Token في تبويب إعدادات GitHub الأول');
      return;
    }

    var ext = file.name.split('.').pop();
    var filename = 'images/' + page + '-unit-' + idx + '-' + Date.now() + '.' + ext;
    var cell = input.closest('td');
    var statusEl = document.createElement('span');
    statusEl.innerHTML = ' <span class="spinner"></span>';
    cell.appendChild(statusEl);

    var reader = new FileReader();
    reader.onload = function (e) {
      var base64 = e.target.result.split(',')[1];
      var apiUrl = 'https://api.github.com/repos/' + GH.owner() + '/' + GH.repo() +
                   '/contents/' + filename;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'token ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Upload image: ' + filename,
          content: base64,
          branch: GH.branch()
        })
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        statusEl.remove();
        if (data.content && data.content.download_url) {
          var imgPath = filename;
          // تحديث hidden input
          var hiddenInput = cell.querySelector('input[data-field="image"]');
          if (hiddenInput) hiddenInput.value = imgPath;
          // تحديث preview
          var preview = cell.querySelector('.img-preview, .img-preview-empty');
          if (preview) {
            var img = document.createElement('img');
            img.src = imgPath;
            img.className = 'img-preview';
            preview.replaceWith(img);
          }
        } else {
          alert('فشل رفع الصورة: ' + (data.message || 'خطأ غير معروف'));
        }
      })
      .catch(function (e) {
        statusEl.remove();
        alert('خطأ في رفع الصورة: ' + e.message);
      });
    };
    reader.readAsDataURL(file);
  };

  // ==================== COLLECT CONTENT ====================
  function collectContent() {
    var data = currentContent ? JSON.parse(JSON.stringify(currentContent)) : buildEmptyContent();

    // General
    data.general.whatsapp_number = val('g-whatsapp');
    data.general.phone_display   = val('g-phone');
    data.general.logo            = val('g-logo');

    // Landing A
    data.landing_a.meta_title    = val('a-meta-title');
    data.landing_a.hero_badge    = val('a-hero-badge');
    data.landing_a.hero_title    = val('a-hero-title');
    data.landing_a.hero_subtitle = val('a-hero-subtitle');
    data.landing_a.stat_families  = val('a-stat-families');
    data.landing_a.stat_occupancy = val('a-stat-occupancy');
    data.landing_a.stat_airport   = val('a-stat-airport');
    data.landing_a.scarcity_text  = val('a-scarcity-text');
    data.landing_a.units          = collectTableRows('units-a-body', ['name','badge','emoji','size','bathrooms','view','price','image']);
    data.landing_a.payment_plans  = collectTableRows('plans-a-body', ['name','down','years','discount','featured']);

    // Landing B
    data.landing_b.meta_title    = val('b-meta-title');
    data.landing_b.hero_badge    = val('b-hero-badge');
    data.landing_b.hero_title    = val('b-hero-title');
    data.landing_b.hero_subtitle = val('b-hero-subtitle');
    data.landing_b.stat_roi       = val('b-stat-roi');
    data.landing_b.stat_occupancy = val('b-stat-occupancy');
    data.landing_b.stat_monthly   = val('b-stat-monthly');
    data.landing_b.units          = collectTableRows('units-b-body', ['name','price_egp','rent_usd','roi','size','occupancy','badge','badge_type','featured','image']);
    data.landing_b.payment_plans  = collectTableRows('plans-b-body', ['name','down','years','features','discount','featured']);

    // Landing EN
    data.landing_en.meta_title    = val('en-meta-title');
    data.landing_en.hero_badge    = val('en-hero-badge');
    data.landing_en.hero_title    = val('en-hero-title');
    data.landing_en.hero_subtitle = val('en-hero-subtitle');
    data.landing_en.hero_scarcity = val('en-hero-scarcity');
    data.landing_en.stat_roi       = val('en-stat-roi');
    data.landing_en.stat_occupancy = val('en-stat-occupancy');
    data.landing_en.stat_from      = val('en-stat-from');
    data.landing_en.units          = collectTableRows('units-en-body', ['name','price','size','beds','baths','desc','badge','image']);
    data.landing_en.testimonials   = collectTableRows('testimonials-en-body', ['text','name','location']);

    return data;
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function collectTableRows(tbodyId, fields) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return [];
    var rows = [];
    [].forEach.call(tbody.rows, function (tr) {
      var obj = {};
      fields.forEach(function (field) {
        var input = tr.querySelector('[data-field="' + field + '"]');
        if (!input) { obj[field] = ''; return; }
        if (input.type === 'checkbox') {
          obj[field] = input.checked;
        } else {
          obj[field] = input.value;
        }
      });
      rows.push(obj);
    });
    return rows;
  }

  // ==================== SAVE ====================
  window.saveChanges = function () {
    var token = GH.token();
    if (!token) {
      showTabByName('github');
      setStatus('⚠️ ادخل GitHub Token في تبويب إعدادات GitHub', 'error');
      return;
    }

    var data = collectContent();
    currentContent = data;
    var jsonStr = JSON.stringify(data, null, 2);

    setStatus('<span class="spinner"></span> جاري الحفظ…', 'saving');
    document.getElementById('save-btn').disabled = true;

    // احصل على SHA الملف الحالي
    var apiBase = 'https://api.github.com/repos/' + GH.owner() + '/' + GH.repo() + '/contents/';
    var fileUrl = apiBase + CONTENT_FILE + '?ref=' + GH.branch();

    fetch(fileUrl, {
      headers: { 'Authorization': 'token ' + token }
    })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' — تأكد من إعدادات GitHub');
      return r.json();
    })
    .then(function (fileData) {
      var sha = fileData.sha;
      var encoded = btoa(unescape(encodeURIComponent(jsonStr)));
      return fetch(apiBase + CONTENT_FILE, {
        method: 'PUT',
        headers: {
          'Authorization': 'token ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'CMS update: ' + new Date().toLocaleString('ar-EG'),
          content: encoded,
          sha: sha,
          branch: GH.branch()
        })
      });
    })
    .then(function (r) {
      if (!r.ok) return r.json().then(function (e) { throw new Error(e.message); });
      return r.json();
    })
    .then(function () {
      setStatus('✅ تم الحفظ بنجاح! Vercel سيعمل deploy خلال 30 ثانية.', 'success');
      document.getElementById('save-btn').disabled = false;
    })
    .catch(function (e) {
      setStatus('❌ فشل الحفظ: ' + e.message, 'error');
      document.getElementById('save-btn').disabled = false;
    });
  };

  function setStatus(html, type) {
    var el = document.getElementById('save-status');
    if (!el) return;
    el.innerHTML = html;
    el.className = 'save-status ' + (type || '');
  }

  function showTabByName(name) {
    var btns = document.querySelectorAll('.tab-btn');
    var tabNames = ['general','landing-a','landing-b','landing-en','github'];
    var idx = tabNames.indexOf(name);
    if (idx >= 0 && btns[idx]) showTab(name, btns[idx]);
  }

  // ==================== GITHUB SETTINGS ====================
  function loadGitHubSettings() {
    setValue2('gh-owner',  GH.owner());
    setValue2('gh-repo',   GH.repo());
    setValue2('gh-branch', GH.branch());
    setValue2('gh-token',  GH.token());
  }

  function setValue2(id, val) {
    var el = document.getElementById(id);
    if (el && val) el.value = val;
  }

  window.saveGitHubSettings = function () {
    localStorage.setItem('cms_gh_owner',  document.getElementById('gh-owner').value.trim());
    localStorage.setItem('cms_gh_repo',   document.getElementById('gh-repo').value.trim());
    localStorage.setItem('cms_gh_branch', document.getElementById('gh-branch').value.trim());
    localStorage.setItem('cms_gh_token',  document.getElementById('gh-token').value.trim());
    document.getElementById('gh-status').innerHTML =
      '<span style="color:#25d366;">✅ تم حفظ الإعدادات في المتصفح</span>';
  };

  window.testGitHub = function () {
    var token = GH.token();
    var result = document.getElementById('gh-test-result');
    if (!token) {
      result.innerHTML = '<span style="color:#e53e3e;">ادخل Token الأول</span>';
      return;
    }
    result.innerHTML = '<span class="spinner"></span> جاري الاختبار…';
    fetch('https://api.github.com/repos/' + GH.owner() + '/' + GH.repo(), {
      headers: { 'Authorization': 'token ' + token }
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.full_name) {
        result.innerHTML = '<span style="color:#25d366;">✅ متصل بـ ' + data.full_name + '</span>';
      } else {
        result.innerHTML = '<span style="color:#e53e3e;">❌ ' + (data.message || 'خطأ') + '</span>';
      }
    })
    .catch(function (e) {
      result.innerHTML = '<span style="color:#e53e3e;">❌ ' + e.message + '</span>';
    });
  };

  // ==================== HELPERS ====================
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildEmptyContent() {
    return {
      general: { logo: 'Corallo-Logo.png', whatsapp_number: '', phone_display: '' },
      landing_a: { meta_title: '', hero_badge: '', hero_title: '', hero_subtitle: '',
                   stat_families: '', stat_occupancy: '', stat_airport: '', units_left: '7',
                   scarcity_text: '', units: [], payment_plans: [] },
      landing_b: { meta_title: '', hero_badge: '', hero_title: '', hero_subtitle: '',
                   stat_roi: '', stat_occupancy: '', stat_monthly: '', units: [], payment_plans: [] },
      landing_en: { meta_title: '', hero_badge: '', hero_title: '', hero_subtitle: '',
                    hero_scarcity: '', stat_roi: '', stat_occupancy: '', stat_from: '',
                    units: [], testimonials: [] }
    };
  }

})();
