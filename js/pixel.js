/**
 * pixel.js — Facebook Pixel Tracking
 * Corallo Residence — All FB Events
 * Replace YOUR_PIXEL_ID with actual Pixel ID
 */

(function() {
  'use strict';

  // ---- FB Pixel Init ----
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  var PIXEL_ID = 'YOUR_PIXEL_ID'; // ← Replace with real pixel ID

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  // ---- Helpers ----
  function getVariant() {
    return localStorage.getItem('corallo_variant') || 'unknown';
  }

  function getUTMParams() {
    var params = {};
    var search = window.location.search.substring(1);
    search.split('&').forEach(function(pair) {
      var parts = pair.split('=');
      if (parts[0]) params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    });
    return {
      utm_source:   params['utm_source']   || '',
      utm_medium:   params['utm_medium']   || '',
      utm_campaign: params['utm_campaign'] || '',
      utm_content:  params['utm_content']  || '',
      utm_term:     params['utm_term']     || ''
    };
  }

  // ---- ViewContent on Hero Visible ----
  var heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        fbq('track', 'ViewContent', {
          content_name: 'Corallo Residence - ' + getVariant(),
          content_category: 'Real Estate',
          content_type: 'product',
          value: 1,
          currency: 'EGP'
        });
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  var hero = document.querySelector('.hero');
  if (hero) heroObserver.observe(hero);

  // ---- InitiateCheckout on Payment Plan Scroll ----
  var paymentObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Payment Plan Viewed',
          content_category: 'Real Estate',
          currency: 'EGP',
          value: 1
        });
        paymentObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  var paymentSection = document.querySelector('#payment-plans, .payment-section');
  if (paymentSection) paymentObserver.observe(paymentSection);

  // ---- Contact on WhatsApp Button Click ----
  document.addEventListener('click', function(e) {
    var target = e.target.closest('.wa-btn, .wa-float, [data-wa-track]');
    if (target) {
      fbq('track', 'Contact', {
        content_name: 'WhatsApp CTA - ' + getVariant(),
        content_category: 'Real Estate'
      });
      // Also track as custom event
      fbq('trackCustom', 'WhatsAppClick', {
        variant: getVariant(),
        page: window.location.pathname
      });
    }
  });

  // ---- Video play tracking ----
  document.addEventListener('play', function(e) {
    if (e.target.tagName === 'VIDEO' || e.target.tagName === 'IFRAME') {
      fbq('track', 'ViewContent', {
        content_name: 'Video Play - ' + getVariant(),
        content_category: 'Real Estate - Video'
      });
    }
  }, true);

  // ---- ROI Calculator interactions (Page B) ----
  document.addEventListener('input', function(e) {
    if (e.target.classList.contains('calc-range') || e.target.id === 'roi-calc-input') {
      // Debounce
      clearTimeout(window._calcTimer);
      window._calcTimer = setTimeout(function() {
        fbq('trackCustom', 'ROICalculatorUsed', {
          variant: 'b',
          input_value: e.target.value
        });
      }, 2000);
    }
  });

  // ---- Form interaction ----
  document.addEventListener('focus', function(e) {
    if (e.target.closest('#lead-form')) {
      if (!window._formInteractionFired) {
        window._formInteractionFired = true;
        fbq('trackCustom', 'FormInteraction', {
          variant: getVariant()
        });
      }
    }
  }, true);

  // ---- Public tracking functions for form.js to call ----
  window.CoralloPixel = {
    trackLead: function(data) {
      fbq('track', 'Lead', {
        content_name: 'Corallo Lead - ' + getVariant(),
        content_category: 'Real Estate',
        currency: 'EGP',
        value: 5000,
        custom_data: data || {}
      });
    },
    trackCompleteRegistration: function() {
      fbq('track', 'CompleteRegistration', {
        content_name: 'Corallo Registration Complete',
        status: true,
        currency: 'EGP',
        value: 5000
      });
    },
    trackContact: function(source) {
      fbq('track', 'Contact', {
        content_name: 'WhatsApp - ' + (source || 'unknown')
      });
    }
  };

  // ---- No-script fallback image ----
  var noscript = document.createElement('noscript');
  var img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = 'https://www.facebook.com/tr?id=' + PIXEL_ID + '&ev=PageView&noscript=1';
  img.alt = '';
  noscript.appendChild(img);
  if (document.body) {
    document.body.insertBefore(noscript, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.insertBefore(noscript, document.body.firstChild);
    });
  }

  console.log('[Corallo Pixel] Initialized. Variant:', getVariant());
})();
