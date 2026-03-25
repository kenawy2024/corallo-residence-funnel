/**
 * form.js — Lead Form Validation + Submission
 * Corallo Residence
 */

(function() {
  'use strict';

  var FORMSUBMIT_EMAIL = 'your-email@domain.com'; // ← Replace with real email

  // ---- Egyptian phone validation ----
  function validateEgyptianPhone(phone) {
    var clean = phone.replace(/[\s\-\(\)]/g, '');
    // Accept: 01XXXXXXXXX or +201XXXXXXXXX or 201XXXXXXXXX
    return /^(\+?2?0?1[0125][0-9]{8})$/.test(clean);
  }

  function formatPhone(phone) {
    var clean = phone.replace(/[\s\-\(\)]/g, '');
    if (clean.startsWith('+2')) return clean;
    if (clean.startsWith('2') && clean.length === 12) return '+' + clean;
    if (clean.startsWith('01')) return '+2' + clean;
    return clean;
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
  function validateForm(name, phone, budget) {
    var valid = true;

    if (!name || name.trim().length < 2) {
      showError('lead-name', 'من فضلك أدخل اسمك الكامل');
      valid = false;
    } else {
      clearError('lead-name');
    }

    if (!phone || !validateEgyptianPhone(phone)) {
      showError('lead-phone', 'أدخل رقم تليفون مصري صحيح (مثال: 01012345678)');
      valid = false;
    } else {
      clearError('lead-phone');
    }

    if (!budget || budget === '') {
      showError('lead-budget', 'من فضلك اختر نطاق ميزانيتك');
      valid = false;
    } else {
      clearError('lead-budget');
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
        variant: localStorage.getItem('corallo_variant') || 'unknown'
      }));
      // Keep last 20 only
      if (leads.length > 20) leads = leads.slice(-20);
      localStorage.setItem('corallo_leads', JSON.stringify(leads));
    } catch(e) {
      console.warn('[Form] Could not store lead locally:', e);
    }
  }

  // ---- Submit to FormSubmit.co ----
  function submitForm(data, onSuccess, onError) {
    var formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('budget', data.budget);
    formData.append('variant', data.variant);
    formData.append('utm_source', data.utm_source || '');
    formData.append('utm_campaign', data.utm_campaign || '');
    formData.append('page', window.location.href);
    formData.append('timestamp', data.timestamp);
    formData.append('_subject', 'عميل جديد - كورالو ريزيدنس: ' + data.name);
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
      console.warn('[Form] FormSubmit error:', err);
      // Still call success if we stored locally — don't block user
      onSuccess();
    });
  }

  // ---- Build WhatsApp redirect URL ----
  function buildWhatsAppURL(variant, name) {
    var phone = '20XXXXXXXXXX'; // ← Replace with real WhatsApp number
    var message = variant === 'b'
      ? 'أهلاً، شفت كورالو ريزيدنس وعايز أعرف عن العائد الاستثماري والأسعار'
      : 'أهلاً، شفت كورالو ريزيدنس وعايز أعرف أكتر عن الوحدات والحياة هناك';

    if (name) message = 'أهلاً، أنا ' + name + '. ' + message;

    var utms = getUTMs();
    var utm = '';
    if (utms.utm_source) utm = '?utm_source=' + utms.utm_source + '&utm_campaign=' + (utms.utm_campaign || 'corallo');

    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  }

  // ---- Main Form Handler ----
  function initForm() {
    var form = document.getElementById('lead-form');
    if (!form) return;

    var submitBtn = form.querySelector('[type="submit"]');
    var successMsg = document.getElementById('form-success-msg');
    var formInner = document.getElementById('form-inner');

    // Real-time validation on blur
    ['lead-name', 'lead-phone', 'lead-budget'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', function() {
        if (id === 'lead-name') {
          if (!el.value || el.value.trim().length < 2) {
            showError('lead-name', 'من فضلك أدخل اسمك الكامل');
          } else {
            clearError('lead-name');
          }
        }
        if (id === 'lead-phone') {
          if (!el.value || !validateEgyptianPhone(el.value)) {
            showError('lead-phone', 'أدخل رقم تليفون مصري صحيح');
          } else {
            clearError('lead-phone');
          }
        }
        if (id === 'lead-budget') {
          if (!el.value) {
            showError('lead-budget', 'من فضلك اختر نطاق ميزانيتك');
          } else {
            clearError('lead-budget');
          }
        }
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var name   = (document.getElementById('lead-name')   || {}).value || '';
      var phone  = (document.getElementById('lead-phone')  || {}).value || '';
      var budget = (document.getElementById('lead-budget') || {}).value || '';

      if (!validateForm(name, phone, budget)) return;

      // Disable submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
      }

      var utms = getUTMs();
      var variant = localStorage.getItem('corallo_variant') || 'unknown';
      var leadData = {
        name:         name.trim(),
        phone:        formatPhone(phone),
        budget:       budget,
        variant:      variant,
        utm_source:   utms.utm_source || '',
        utm_medium:   utms.utm_medium || '',
        utm_campaign: utms.utm_campaign || '',
        timestamp:    new Date().toISOString()
      };

      // Store locally immediately
      storeLeadLocally(leadData);

      // Fire pixel Lead event
      if (window.CoralloPixel) {
        window.CoralloPixel.trackLead(leadData);
      }

      // Submit to FormSubmit
      submitForm(leadData, function() {
        // Success
        if (window.CoralloPixel) {
          window.CoralloPixel.trackCompleteRegistration();
        }

        // Build redirect URL
        var waUrl = buildWhatsAppURL(variant, name.trim());
        localStorage.setItem('corallo_wa_url', waUrl);
        localStorage.setItem('corallo_lead_name', name.trim());

        // Redirect to thank-you
        var utmString = window.location.search || '';
        window.location.href = 'thank-you.html' + utmString + (utmString ? '&' : '?') + 'variant=' + variant;

      }, function(err) {
        // Error — re-enable button
        console.error('[Form] Error:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'أرسل بياناتك الآن';
        }
        // Show inline success anyway (data was stored locally)
        if (formInner && successMsg) {
          formInner.style.display = 'none';
          successMsg.classList.add('show');
        }
      });
    });
  }

  // ---- Init on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }

})();
