/**
 * ab-router.js — Cookie-based A/B Split (50/50)
 * Used in index.html to route to landing-a or landing-b
 * UTM params preserved on redirect
 */

(function() {
  'use strict';

  var COOKIE_NAME = 'corallo_ab';
  var COOKIE_DAYS = 30;

  // ---- Cookie helpers ----
  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  // ---- Get or assign variant ----
  function getOrAssignVariant() {
    var existing = getCookie(COOKIE_NAME) || localStorage.getItem('corallo_variant');

    if (existing === 'a' || existing === 'b') {
      return existing;
    }

    // 50/50 random assignment
    var variant = Math.random() < 0.5 ? 'a' : 'b';
    setCookie(COOKIE_NAME, variant, COOKIE_DAYS);
    localStorage.setItem('corallo_variant', variant);
    return variant;
  }

  // ---- Preserve UTM params + add variant ----
  function buildRedirectURL(variant) {
    var search = window.location.search;
    var params = new URLSearchParams(search);
    params.set('variant', variant);

    // Pass through all UTM params
    var utm_keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    utm_keys.forEach(function(key) {
      var val = params.get(key);
      if (val) params.set(key, val);
    });

    var page = variant === 'a' ? 'landing-a.html' : 'landing-b.html';
    return page + '?' + params.toString();
  }

  // ---- Track impression in localStorage ----
  function trackImpression(variant) {
    try {
      var stats = JSON.parse(localStorage.getItem('corallo_ab_stats') || '{"a":0,"b":0}');
      stats[variant] = (stats[variant] || 0) + 1;
      localStorage.setItem('corallo_ab_stats', JSON.stringify(stats));
    } catch(e) {}
  }

  // ---- Main router ----
  function route() {
    var variant = getOrAssignVariant();
    trackImpression(variant);

    // Log for debugging
    console.log('[A/B Router] Variant assigned:', variant);

    // Redirect
    window.location.replace(buildRedirectURL(variant));
  }

  // ---- Run immediately ----
  route();

})();
