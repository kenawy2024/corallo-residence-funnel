/**
 * whatsapp.js — WhatsApp Button Logic + UTM Passthrough
 * Corallo Residence
 */

(function() {
  'use strict';

  var WA_NUMBER = '20XXXXXXXXXX'; // ← Replace with real number (country code + number, no +)

  // ---- Messages per variant ----
  var MESSAGES = {
    'a': 'أهلاً، شفت كورالو ريزيدنس وعايز أعرف أكتر عن الوحدات والحياة هناك',
    'b': 'أهلاً، شفت كورالو ريزيدنس وعايز أعرف عن العائد الاستثماري والأسعار',
    'default': 'أهلاً، شفت كورالو ريزيدنس وعايز أعرف أكتر'
  };

  // ---- Get UTM params from URL ----
  function getUTMString() {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var parts = [];
    utmKeys.forEach(function(key) {
      var val = params.get(key);
      if (val) parts.push(key + '=' + encodeURIComponent(val));
    });
    return parts.join('&');
  }

  // ---- Get current variant ----
  function getVariant() {
    // Check URL param first, then localStorage
    var params = new URLSearchParams(window.location.search);
    var urlVariant = params.get('variant');
    if (urlVariant === 'a' || urlVariant === 'b') {
      localStorage.setItem('corallo_variant', urlVariant);
      return urlVariant;
    }
    return localStorage.getItem('corallo_variant') || 'default';
  }

  // ---- Build WA URL ----
  function buildWAUrl(variant, customMessage) {
    var message = customMessage || MESSAGES[variant] || MESSAGES['default'];
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  // ---- Update all WA buttons on page ----
  function updateWAButtons() {
    var variant = getVariant();
    var buttons = document.querySelectorAll('.wa-btn, .wa-float, [data-wa-btn]');

    buttons.forEach(function(btn) {
      var customMsg = btn.getAttribute('data-wa-message');
      var url = buildWAUrl(variant, customMsg);
      btn.href = url;

      // Track click
      btn.addEventListener('click', function(e) {
        // Fire pixel event
        if (window.CoralloPixel) {
          window.CoralloPixel.trackContact('wa_button_' + variant);
        }
        // Log to console for debugging
        console.log('[WhatsApp] Button clicked. Variant:', variant, 'URL:', url);
      });
    });
  }

  // ---- Floating WA button ----
  function initFloatingButton() {
    var floatBtn = document.querySelector('.wa-float');
    if (!floatBtn) return;

    // Show after 3 seconds
    floatBtn.style.opacity = '0';
    floatBtn.style.transform = 'scale(0.5)';
    floatBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(function() {
      floatBtn.style.opacity = '1';
      floatBtn.style.transform = 'scale(1)';
    }, 3000);

    // Add tooltip
    var tooltip = document.createElement('div');
    tooltip.textContent = 'تواصل معنا';
    tooltip.style.cssText = [
      'position:absolute',
      'right:70px',
      'top:50%',
      'transform:translateY(-50%)',
      'background:rgba(0,0,0,0.8)',
      'color:white',
      'padding:5px 10px',
      'border-radius:6px',
      'font-size:13px',
      'white-space:nowrap',
      'font-family:Cairo,sans-serif',
      'opacity:0',
      'transition:opacity 0.2s ease',
      'pointer-events:none'
    ].join(';');
    floatBtn.style.position = 'relative';
    floatBtn.appendChild(tooltip);

    floatBtn.addEventListener('mouseenter', function() {
      tooltip.style.opacity = '1';
    });
    floatBtn.addEventListener('mouseleave', function() {
      tooltip.style.opacity = '0';
    });
  }

  // ---- Thank-you page: redirect to WA ----
  function initThankYouWA() {
    var waBtn = document.getElementById('thankyou-wa-btn');
    if (!waBtn) return;

    var storedUrl = localStorage.getItem('corallo_wa_url');
    var variant = getVariant();

    var url = storedUrl || buildWAUrl(variant);
    waBtn.href = url;

    var name = localStorage.getItem('corallo_lead_name');
    if (name) {
      var greet = document.getElementById('thankyou-name');
      if (greet) greet.textContent = name;
    }

    // Auto-open after 2 seconds on mobile
    var isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(function() {
        window.location.href = url;
      }, 2500);
    }
  }

  // ---- Init ----
  function init() {
    updateWAButtons();
    initFloatingButton();
    initThankYouWA();

    // Expose for external use
    window.CoralloWA = {
      getVariant: getVariant,
      buildUrl: buildWAUrl,
      open: function(variant, message) {
        var url = buildWAUrl(variant || getVariant(), message);
        window.open(url, '_blank');
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
