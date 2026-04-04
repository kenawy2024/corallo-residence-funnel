/**
 * Corallo CMS — Content Loader
 * يجيب content.json ويحدث DOM في كل الصفحات
 */
(function () {
  'use strict';

  function getVal(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o != null) ? o[k] : undefined;
    }, obj);
  }

  function applyData(data) {
    // نص عادي
    [].forEach.call(document.querySelectorAll('[data-cms]'), function (el) {
      var v = getVal(data, el.getAttribute('data-cms'));
      if (v != null) el.textContent = v;
    });

    // HTML (للعناوين اللي فيها tags)
    [].forEach.call(document.querySelectorAll('[data-cms-html]'), function (el) {
      var v = getVal(data, el.getAttribute('data-cms-html'));
      if (v != null) el.innerHTML = v;
    });

    // src للصور
    [].forEach.call(document.querySelectorAll('[data-cms-src]'), function (el) {
      var v = getVal(data, el.getAttribute('data-cms-src'));
      if (v) el.src = v;
    });

    // تحديد الصفحة وبناء الأقسام الديناميكية
    var pid = document.documentElement.id;

    if (pid === 'landing-a' && data.landing_a) {
      buildUnitsA(data.landing_a.units || []);
      buildPlansA(data.landing_a.payment_plans || []);
    }

    if (pid === 'landing-b' && data.landing_b) {
      buildUnitsB(data.landing_b.units || []);
      buildPlansB(data.landing_b.payment_plans || []);
    }

    if (document.documentElement.lang === 'en' && data.landing_en) {
      buildUnitsEn(data.landing_en.units || []);
      buildTestimonialsEn(data.landing_en.testimonials || []);
    }

    // تحديث عنوان الصفحة
    var pageKey = pid === 'landing-a' ? 'landing_a'
                : pid === 'landing-b' ? 'landing_b'
                : 'landing_en';
    if (data[pageKey] && data[pageKey].meta_title) {
      document.title = data[pageKey].meta_title;
    }
  }

  // ==================== LANDING A — UNITS ====================
  function buildUnitsA(units) {
    var c = document.getElementById('cms-units-a');
    if (!c) return;
    c.innerHTML = units.map(function (u, i) {
      var isLast = i === units.length - 1;
      var imgHtml = u.image
        ? '<img src="' + esc(u.image) + '" alt="' + esc(u.name) + '" style="width:64px;height:64px;object-fit:cover;border-radius:8px;">'
        : '<span>' + (u.emoji || '🛏️') + '</span>';
      return '<div class="unit-card-a">' +
        '<div class="unit-hero-img"' + (isLast ? ' style="background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(10,30,58,0.95));"' : '') + '>' +
        imgHtml +
        '<span class="unit-type-badge"' + (isLast ? ' style="background:rgba(201,168,76,0.3);border-color:var(--gold);"' : '') + '>' +
        esc(u.badge || u.name) + '</span>' +
        '</div>' +
        '<div class="unit-info">' +
        '<h3>' + esc(u.name) + '</h3>' +
        '<div class="unit-details">' +
        '<span class="unit-detail">📐 ' + esc(u.size) + '</span>' +
        '<span class="unit-detail">🛁 ' + esc(u.bathrooms) + '</span>' +
        '<span class="unit-detail">🌊 ' + esc(u.view) + '</span>' +
        '</div>' +
        '<span class="unit-price-a">' + esc(u.price) + '</span>' +
        '<a href="#lead-form-section" class="btn ' + (isLast ? 'btn-gold' : 'btn-outline-gold') + ' btn-block" style="font-size:0.9rem;">استفسر عن الوحدة</a>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  // ==================== LANDING A — PLANS ====================
  function buildPlansA(plans) {
    var tb = document.getElementById('cms-plans-a');
    if (!tb) return;
    tb.innerHTML = plans.map(function (p) {
      return '<tr' + (p.featured ? ' class="highlight"' : '') + '>' +
        '<td>' + esc(p.name) + '</td>' +
        '<td>' + esc(p.down) + '</td>' +
        '<td>' + esc(p.years) + ' سنوات</td>' +
        '<td>متغير حسب الوحدة</td>' +
        '<td><a href="#lead-form-section" class="btn ' + (p.featured ? 'btn-gold' : 'btn-outline-gold') +
        '" style="padding:0.4rem 1rem;font-size:0.82rem;">' + (p.featured ? 'الأفضل' : 'استفسر') + '</a></td>' +
        '</tr>';
    }).join('');
  }

  // ==================== LANDING B — UNITS ====================
  function buildUnitsB(units) {
    var c = document.getElementById('cms-units-b');
    if (!c) return;
    c.innerHTML = units.map(function (u) {
      return '<div class="unit-card-b">' +
        '<div class="unit-b-header">' +
        '<div class="unit-b-type">' + esc(u.name) + '</div>' +
        '<span class="badge badge-' + esc(u.badge_type || 'gold') + '">' + esc(u.badge) + '</span>' +
        '</div>' +
        '<div class="unit-b-body">' +
        (u.image ? '<img src="' + esc(u.image) + '" alt="' + esc(u.name) + '" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:1rem;">' : '') +
        '<div class="unit-b-price-row">' +
        '<div><div class="unit-b-egp">السعر بالجنيه</div><div class="unit-b-egp-val">' + esc(u.price_egp) + '</div></div>' +
        '<div class="unit-b-usd"><div class="unit-b-usd-label">إيجار شهري متوقع</div><div class="unit-b-usd-val">' + esc(u.rent_usd) + '</div></div>' +
        '</div>' +
        '<div class="unit-b-metrics">' +
        '<div class="unit-b-metric"><span class="m-val">' + esc(u.size) + '</span><span class="m-lbl">مساحة</span></div>' +
        '<div class="unit-b-metric"><span class="m-val">' + esc(u.roi) + '</span><span class="m-lbl">ROI</span></div>' +
        '<div class="unit-b-metric"><span class="m-val">' + esc(u.occupancy) + '</span><span class="m-lbl">إشغال</span></div>' +
        '</div>' +
        '<a href="#lead-form-section" class="btn ' + (u.featured ? 'btn-gold' : 'btn-outline-gold') + ' btn-block" style="margin-top:1rem;font-size:0.88rem;">استفسر عن الوحدة</a>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  // ==================== LANDING B — PLANS ====================
  function buildPlansB(plans) {
    var tb = document.getElementById('cms-plans-b');
    if (!tb) return;
    tb.innerHTML = plans.map(function (p) {
      return '<tr' + (p.featured ? ' class="highlight"' : '') + '>' +
        '<td>' + esc(p.name) + '</td>' +
        '<td>' + esc(p.down) + '</td>' +
        '<td>' + esc(p.years) + ' سنوات</td>' +
        '<td>' + esc(p.features || '') + '</td>' +
        '<td><a href="#lead-form-section" class="btn ' + (p.featured ? 'btn-gold' : 'btn-outline-gold') +
        '" style="padding:0.4rem 1rem;font-size:0.82rem;">' + (p.featured ? 'الأفضل' : 'استفسر') + '</a></td>' +
        '</tr>';
    }).join('');
  }

  // ==================== LANDING EN — UNITS ====================
  function buildUnitsEn(units) {
    var c = document.getElementById('cms-units-en');
    if (!c) return;
    c.innerHTML = units.map(function (u) {
      var iconHtml = u.image
        ? '<img src="' + esc(u.image) + '" class="icon-hd" alt="' + esc(u.name) + '">'
        : '<span style="font-size:3rem;">🏠</span>';
      return '<div class="unit-card fade-up">' +
        '<div class="unit-card-img">' +
        '<span class="unit-card-badge">' + esc(u.badge) + '</span>' +
        iconHtml +
        '</div>' +
        '<div class="unit-card-body">' +
        '<h3>' + esc(u.name) + '</h3>' +
        '<div class="unit-price">' + esc(u.price) + '</div>' +
        '<div class="unit-specs">' +
        '<span class="unit-spec"><i class="fi fi-hd-bed"></i> ' + esc(u.beds) + '</span>' +
        '<span class="unit-spec"><i class="fi fi-hd-shower"></i> ' + esc(u.baths) + '</span>' +
        '<span class="unit-spec"><i class="fi fi-hd-ruler-combined"></i> ' + esc(u.size) + '</span>' +
        '</div>' +
        '<p style="font-size:0.85rem;color:var(--gray);margin-bottom:1rem;">' + esc(u.desc) + '</p>' +
        '<a href="#contact" class="btn btn-gold btn-block">Inquire Now</a>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  // ==================== LANDING EN — TESTIMONIALS ====================
  function buildTestimonialsEn(testimonials) {
    var c = document.getElementById('cms-testimonials-en');
    if (!c) return;
    c.innerHTML = testimonials.map(function (t) {
      return '<div class="testimonial-card fade-up">' +
        '<div class="testimonial-stars">★★★★★</div>' +
        '<p style="margin-bottom:0.5rem;">"' + esc(t.text) + '"</p>' +
        '<div class="testimonial-author"><strong>' + esc(t.name) + '</strong>' + esc(t.location) + '</div>' +
        '</div>';
    }).join('');
  }

  // HTML escape
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // جيب content.json وشغّل
  fetch('content.json?_=' + Date.now())
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(applyData)
    .catch(function (e) {
      console.warn('[CMS] Failed to load content.json:', e);
    });

})();
