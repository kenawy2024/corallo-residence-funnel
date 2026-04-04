/**
 * ab-router.js — Language Detection + A/B Split Router
 * 1. Detects user country via ipapi.co
 * 2. Arabic countries → landing-a or landing-b (50/50 A/B)
 * 3. Other countries → landing-en
 * 4. Manual toggle stored in localStorage overrides auto-detection
 */

(function () {
  'use strict';

  var ARAB_COUNTRIES = [
    'EG','SA','AE','KW','QA','BH','OM','JO','LB','SY',
    'IQ','LY','TN','DZ','MA','SD','YE','PS','MR','SO','KM','DJ'
  ];

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

  // ---- Preserve UTM params + add variant ----
  function getUTMs(variant) {
    var params = new URLSearchParams(window.location.search);
    if (variant) params.set('variant', variant);
    var str = params.toString();
    return str ? '?' + str : '';
  }

  // ---- Track impression in localStorage ----
  function trackImpression(variant) {
    try {
      var stats = JSON.parse(localStorage.getItem('corallo_ab_stats') || '{"a":0,"b":0}');
      stats[variant] = (stats[variant] || 0) + 1;
      localStorage.setItem('corallo_ab_stats', JSON.stringify(stats));
    } catch (e) {}
  }

  // ---- Main redirect ----
  function redirect(lang, variant) {
    localStorage.setItem('corallo_lang', lang);

    if (lang === 'ar') {
      var v = (variant === 'a' || variant === 'b') ? variant : (Math.random() < 0.5 ? 'a' : 'b');
      localStorage.setItem('corallo_variant', v);
      setCookie(COOKIE_NAME, v, COOKIE_DAYS);
      trackImpression(v);
      console.log('[Router] Arabic → landing-' + v + '.html');
      window.location.replace('landing-' + v + '.html' + getUTMs(v));
    } else {
      console.log('[Router] English → landing-en.html');
      window.location.replace('landing-en.html' + getUTMs(null));
    }
  }

  // ---- Check saved preference ----
  var savedLang = localStorage.getItem('corallo_lang');
  var savedVariant = getCookie(COOKIE_NAME) || localStorage.getItem('corallo_variant');

  if (savedLang === 'ar' || savedLang === 'en') {
    console.log('[Router] Saved preference:', savedLang);
    redirect(savedLang, savedVariant);
    return;
  }

  // ---- Detect via ipapi.co ----
  fetch('https://ipapi.co/json/')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var country = (data && data.country_code) ? data.country_code : '';
      var lang = ARAB_COUNTRIES.indexOf(country) !== -1 ? 'ar' : 'en';
      console.log('[Router] Detected country:', country, '→', lang);
      redirect(lang, savedVariant);
    })
    .catch(function () {
      // Fallback: Arabic if detection fails
      console.log('[Router] Detection failed, defaulting to Arabic');
      redirect('ar', savedVariant);
    });

})();
