/**
 * whatsapp-en.js — WhatsApp Button Logic (English Version)
 * Corallo Residence — International Buyers
 */

(function() {
  'use strict';

  var WA_NUMBER = '20XXXXXXXXXX'; // ← Replace with real number (country code + number, no +)

  // ---- Default English message ----
  var DEFAULT_MESSAGE = "Hi, I saw Corallo Residence and I'd like to learn more about the units and pricing.";

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

  // ---- Build WA URL ----
  function buildWAUrl(customMessage) {
    var message = customMessage || DEFAULT_MESSAGE;
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  // ---- Update all WA buttons on page ----
  function updateWAButtons() {
    var buttons = document.querySelectorAll('.wa-btn, .wa-float, [data-wa-btn]');

    buttons.forEach(function(btn) {
      var customMsg = btn.getAttribute('data-wa-message');
      var url = buildWAUrl(customMsg);
      btn.href = url;

      btn.addEventListener('click', function() {
        if (window.CoralloPixel) {
          window.CoralloPixel.trackContact('wa_button_en');
        }
        console.log('[WhatsApp EN] Button clicked. URL:', url);
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

    // Add English tooltip
    var tooltip = document.createElement('div');
    tooltip.textContent = 'Chat with us';
    tooltip.style.cssText = [
      'position:absolute',
      'left:70px',
      'right:auto',
      'top:50%',
      'transform:translateY(-50%)',
      'background:rgba(0,0,0,0.8)',
      'color:white',
      'padding:5px 10px',
      'border-radius:6px',
      'font-size:13px',
      'white-space:nowrap',
      'font-family:\'Plus Jakarta Sans\',sans-serif',
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

  // ---- Init ----
  function init() {
    updateWAButtons();
    initFloatingButton();

    window.CoralloWA = {
      buildUrl: buildWAUrl,
      open: function(message) {
        var url = buildWAUrl(message);
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
