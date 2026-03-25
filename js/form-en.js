/**
 * form-en.js — Lead Form Validation + Submission (English Version)
 * Corallo Residence — International Buyers
 */

(function() {
  'use strict';

  var FORMSUBMIT_EMAIL = 'your-email@domain.com'; // ← Replace with real email

  // ---- International phone validation ----
  function validateInternationalPhone(phone) {
    var clean = phone.replace(/[\s\-\(\)]/g, '');
    // Accept international formats: +1234567890, 1234567890 (7-15 digits)
    return /^\+?[1-9]\d{6,14}$/.test(clean);
  }

  function formatPhone(phone) {
    var clean = phone.replace(/[\s\-\(\)]/g, '');
    if (!clean.startsWith('+')) return '+' + clean;
    return clean;
  }

  // ---- Email validation ----
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // ---- Get UTM params ----
  function getUTMs() {
    var p = {};
    window.location.search.substring(1).split('&').forEach(function(pair) {
      var kv = pair.split('=');
      if (kv[0]) p[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    });
    return p;
  }

  // ---- Show field error ----
  function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (error) {
      error.textContent = message;
      error.classList.add('visible');
    }
  }

  function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (error) error.classList.remove('visible');
  }

  // ---- Validate form ----
  function validateForm(name, phone, email, unit) {
    var valid = true;

    if (!name || name.trim().length < 2) {
      showError('lead-name', 'Please enter your full name');
      valid = false;
    } else {
      clearError('lead-name');
    }

    if (!phone || !validateInternationalPhone(phone)) {
      showError('lead-phone', 'Please enter a valid international phone number (e.g. +44 7911 123456)');
      valid = false;
    } else {
      clearError('lead-phone');
    }

    if (!email || !validateEmail(email)) {
      showError('lead-email', 'Please enter a valid email address');
      valid = false;
    } else {
      clearError('lead-email');
    }

    if (!unit || unit === '') {
      showError('lead-unit', 'Please select a unit type');
      valid = false;
    } else {
      clearError('lead-unit');
    }

    return valid;
  }

  // ---- Store to localStorage ----
  function storeLeadLocally(data) {
    try {
      var leads = JSON.parse(localStorage.getItem('corallo_leads') || '[]');
      leads.push(Object.assign({}, data, {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        variant: 'en'
      }));
      if (leads.length > 20) leads = leads.slice(-20);
      localStorage.setItem('corallo_leads', JSON.stringify(leads));
    } catch(e) {
      console.warn('[Form EN] Could not store lead locally:', e);
    }
  }

  // ---- Submit to FormSubmit.co ----
  function submitForm(data, onSuccess, onError) {
    var formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('unit', data.unit);
    formData.append('variant', 'en');
    formData.append('utm_source', data.utm_source || '');
    formData.append('utm_campaign', data.utm_campaign || '');
    formData.append('page', window.location.href);
    formData.append('timestamp', data.timestamp);
    formData.append('_subject', 'New Lead - Corallo Residence (EN): ' + data.name);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('_next', window.location.origin + '/thank-you.html');

    fetch('https://formsubmit.co/' + FORMSUBMIT_EMAIL, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (response.ok || response.status === 200 || response.status === 302) {
        onSuccess();
      } else {
        onError(new Error('Server responded with ' + response.status));
      }
    })
    .catch(function(err) {
      console.warn('[Form EN] FormSubmit error:', err);
      onSuccess(); // Don't block user if network fails
    });
  }

  // ---- Build WhatsApp redirect URL ----
  function buildWhatsAppURL(name) {
    var phone = '20XXXXXXXXXX'; // ← Replace with real WhatsApp number
    var message = "Hi, I just filled in the Corallo Residence form. My name is " + name + " and I'd like to learn more.";
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  }

  // ---- Show inline success with WA button ----
  function showSuccess(name) {
    var formInner = document.getElementById('form-inner');
    var successMsg = document.getElementById('form-success-msg');
    var successWaBtn = document.getElementById('success-wa-btn');

    if (formInner) formInner.style.display = 'none';
    if (successMsg) successMsg.classList.add('show');
    if (successWaBtn) {
      successWaBtn.href = buildWhatsAppURL(name);
    }
  }

  // ---- Main Form Handler ----
  function initForm() {
    var form = document.getElementById('lead-form');
    if (!form) return;

    var submitBtn = form.querySelector('[type="submit"]');

    // Real-time validation on blur
    var fields = ['lead-name', 'lead-phone', 'lead-email', 'lead-unit'];
    fields.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', function() {
        if (id === 'lead-name') {
          if (!el.value || el.value.trim().length < 2) {
            showError('lead-name', 'Please enter your full name');
          } else {
            clearError('lead-name');
          }
        }
        if (id === 'lead-phone') {
          if (!el.value || !validateInternationalPhone(el.value)) {
            showError('lead-phone', 'Please enter a valid international phone number');
          } else {
            clearError('lead-phone');
          }
        }
        if (id === 'lead-email') {
          if (!el.value || !validateEmail(el.value)) {
            showError('lead-email', 'Please enter a valid email address');
          } else {
            clearError('lead-email');
          }
        }
        if (id === 'lead-unit') {
          if (!el.value) {
            showError('lead-unit', 'Please select a unit type');
          } else {
            clearError('lead-unit');
          }
        }
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var name  = (document.getElementById('lead-name')  || {}).value || '';
      var phone = (document.getElementById('lead-phone') || {}).value || '';
      var email = (document.getElementById('lead-email') || {}).value || '';
      var unit  = (document.getElementById('lead-unit')  || {}).value || '';

      if (!validateForm(name, phone, email, unit)) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      var utms = getUTMs();
      var leadData = {
        name:         name.trim(),
        phone:        formatPhone(phone),
        email:        email.trim(),
        unit:         unit,
        variant:      'en',
        utm_source:   utms.utm_source || '',
        utm_medium:   utms.utm_medium || '',
        utm_campaign: utms.utm_campaign || '',
        timestamp:    new Date().toISOString()
      };

      storeLeadLocally(leadData);

      if (window.CoralloPixel) {
        window.CoralloPixel.trackLead(leadData);
      }

      submitForm(leadData, function() {
        if (window.CoralloPixel) {
          window.CoralloPixel.trackCompleteRegistration();
        }
        localStorage.setItem('corallo_lead_name', name.trim());
        showSuccess(name.trim());
      }, function(err) {
        console.error('[Form EN] Error:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Get Free Brochure';
        }
        showSuccess(name.trim());
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }

})();
