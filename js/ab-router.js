/**
 * ab-router.js — Language Detection Router
 * 1. Detects user country via ipapi.co
 * 2. Arabic countries → landing-en.html (with corallo_lang=ar stored)
 * 3. Other countries → landing-en.html (default EN)
 * 4. Manual toggle stored in localStorage overrides auto-detection
 */

(function () {
  'use strict';

  var ARAB_COUNTRIES = [
    'EG','SA','AE','KW','QA','BH','OM','JO','LB','SY',
    'IQ','LY','TN','DZ','MA','SD','YE','PS','MR','SO','KM','DJ'
  ];

  // ---- Preserve UTM params ----
  function getUTMs() {
    var params = new URLSearchParams(window.location.search);
    // حذف param القديم للـ variant
    params.delete('variant');
    var str = params.toString();
    return str ? '?' + str : '';
  }

  // ---- Main redirect ----
  function redirect(lang) {
    localStorage.setItem('corallo_lang', lang);
    console.log('[Router] → landing-en.html (lang=' + lang + ')');
    window.location.replace('landing-en.html' + getUTMs());
  }

  // ---- Check saved preference ----
  var savedLang = localStorage.getItem('corallo_lang');

  if (savedLang === 'ar' || savedLang === 'en') {
    console.log('[Router] Saved preference:', savedLang);
    redirect(savedLang);
    return;
  }

  // ---- Detect via ipapi.co → ip-api.com → navigator.language ----
  fetch('https://ipapi.co/json/')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.country_code && !data.error) {
        var lang = ARAB_COUNTRIES.indexOf(data.country_code) !== -1 ? 'ar' : 'en';
        console.log('[Router] ipapi.co country:', data.country_code, '→', lang);
        redirect(lang);
      } else {
        throw new Error('invalid response from ipapi.co');
      }
    })
    .catch(function () {
      // Fallback 1: ip-api.com
      fetch('https://ip-api.com/json/?fields=countryCode')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var country = (data && data.countryCode) ? data.countryCode : '';
          var lang = ARAB_COUNTRIES.indexOf(country) !== -1 ? 'ar' : 'en';
          console.log('[Router] ip-api.com country:', country, '→', lang);
          redirect(lang);
        })
        .catch(function () {
          // Fallback 2: navigator.language
          var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
          var lang = navLang.startsWith('ar') ? 'ar' : 'en';
          console.log('[Router] navigator.language fallback:', navLang, '→', lang);
          redirect(lang);
        });
    });

})();
