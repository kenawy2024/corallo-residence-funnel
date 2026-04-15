/**
 * Corallo Residence — i18n Engine
 * Languages: English (en) | Arabic (ar) | Italian (it)
 * Auto-detects browser language, falls back to EN.
 * Manual choice saved in localStorage under "preferred-lang".
 */
(function () {
  'use strict';

  // ==================== TRANSLATIONS ====================
  var T = {

    // ─────────────────────────── ENGLISH ───────────────────────────
    en: {
      meta_title: 'Corallo Residence — Own a Luxury Chalet on the Red Sea | Port Ghalib',

      nav_home: 'Home',
      nav_units: 'Properties',
      nav_invest: 'Invest',
      nav_contact: 'Contact',

      hero_badge: 'Port Ghalib, Red Sea, Egypt',
      hero_title: 'Own a Luxury Chalet<br><span class="text-gradient">on the Red Sea</span>',
      hero_subtitle: 'Where the desert meets turquoise waters — Corallo Residence offers you a rare blend of luxury living and exceptional investment returns at one of Egypt\'s most exclusive resorts.',
      hero_search_type: 'Unit Type',
      search_type_studio: 'Studio',
      search_type_1bed: '1 Bedroom',
      search_type_2bed: '2 Bedrooms',
      search_type_penthouse: 'Penthouse',
      hero_search_beds: 'Bedrooms',
      search_beds_studio: 'Studio',
      search_beds_1: '1 Bed',
      search_beds_2: '2 Beds',
      search_beds_3: '3+ Beds',
      hero_search_price: 'Price Range',
      search_price_1: '€30K – €55K',
      search_price_2: '€55K – €100K',
      search_price_3: '€100K – €170K',
      search_price_4: '€170K+',
      hero_search_btn: 'View Properties →',
      hero_scarcity: 'Only 7 units remain at launch pricing',

      stat_roi: '15–22%',
      stat_roi_lbl: 'Annual Rental ROI',
      stat_occupancy: '90%+',
      stat_occupancy_lbl: 'Occupancy Rate',
      stat_from: 'from €30K',
      stat_from_lbl: 'Entry Price',

      section_units_title: 'Featured Properties',
      section_units_desc: 'Each unit is fully furnished and professionally managed — ready to generate income from day one.',
      unit_inquire_btn: 'Inquire Now',
      units: [
        { name: 'Studio',        price: '€30,000',  size: '38 m²',  beds: 'Studio',     baths: '1 Bath',   desc: 'Sea-view studio with fully fitted kitchen and private terrace.',                        image: 'icons/studio-new.png'    },
        { name: '1 Bedroom',     price: '€55,000',  size: '62 m²',  beds: '1 Bed',      baths: '1 Bath',   desc: 'Spacious one-bedroom with open-plan living area.',                                     image: 'icons/bed1-new.png'      },
        { name: '2 Bedrooms',    price: '€100,000', size: '105 m²', beds: '2 Beds',     baths: '2 Baths',  desc: 'Family-sized apartment with private balcony.',                                         image: 'icons/bed2-new.png'      },
        { name: 'Penthouse',     price: '€170,000', size: '210 m²', beds: '3 Beds',     baths: '3 Baths',  desc: 'Rooftop penthouse with private plunge pool, 360° sea views.',                          image: 'icons/penthouse-new.png' }
      ],

      section_invest_title: 'Why Invest in Port Ghalib?',
      section_invest_desc: 'Port Ghalib is Egypt\'s premier integrated resort destination — 10 km of pristine coastline, the largest private marina on the Red Sea, and world-class infrastructure.',
      invest_marina_title: 'Private Marina',
      invest_marina_desc: 'Berths for over 1,000 vessels — the largest private marina on the Red Sea, attracting international yacht owners and high-net-worth visitors year-round.',
      invest_roi_title: '15–22% Rental ROI',
      invest_roi_desc: 'Egypt\'s tourism sector is booming. Corallo Residence owners benefit from a fully managed rental programme with guaranteed occupancy support and transparent quarterly reporting.',
      invest_location_title: 'Prime Location',
      invest_location_desc: 'Just 5 minutes from Marsa Alam International Airport (RMF) — direct flights from London, Frankfurt, Amsterdam, and across the Gulf. Your guests arrive with ease.',
      invest_freehold_title: 'Freehold Ownership',
      invest_freehold_desc: 'Full title deed — foreigners can own 100% freehold property in Egypt\'s Red Sea zone.',
      invest_managed_title: 'Turnkey & Managed',
      invest_managed_desc: 'Fully furnished, professionally managed, and rented out for you — completely hands-off investment.',

      section_amenities_title: 'Resort Amenities',
      section_amenities_desc: 'Corallo Residence is more than a property — it\'s a world-class resort experience.',
      amenity_pool: 'Infinity Pool',
      amenity_beach: 'Private Beach',
      amenity_marina: 'Private Marina',
      amenity_jacuzzi: 'Rooftop Jacuzzi',
      amenity_security: '24/7 Security',
      amenity_fitness: 'Fitness Centre',

      section_testimonials_title: 'What Our Owners Say',
      testimonials: [
        { text: 'We purchased a 1-bedroom unit. The location is stunning and the management team is exceptionally professional. We are very happy with this investment.',     name: 'James & Claire M.', location: 'Manchester, United Kingdom' },
        { text: 'I was looking for a Red Sea investment and Corallo was the ideal choice. The return exceeds my expectations and the management is excellent.',                       name: 'Thomas M.',          location: 'Munich, Germany'           },
        { text: 'As an Egyptian living in Cairo, I wanted a holiday and investment property. Corallo combines both perfectly.',                                                       name: 'Ahmed K.',           location: 'Cairo, Egypt'              }
      ],

      footer_tagline: 'Luxury Red Sea chalets at Port Ghalib — where exceptional investment meets an extraordinary lifestyle.',
      footer_links_title: 'Quick Links',
      footer_nav_home: 'Home',
      footer_nav_units: 'Properties',
      footer_nav_invest: 'Investment',
      footer_nav_amenities: 'Amenities',
      footer_nav_testimonials: 'Testimonials',
      footer_nav_contact: 'Contact',
      footer_contact_title: 'Get in Touch',
      footer_contact_address: 'Port Ghalib, Marsa Alam, Red Sea, Egypt',
      footer_contact_airport: '5 min from Marsa Alam Airport (RMF)',
      footer_contact_email: 'info@coralloresidence-portgahlip.com',
      footer_disclaimer: '* All prices shown in EUR are indicative and subject to exchange rate fluctuations. ROI figures are based on historical performance and market projections — actual returns may vary. This page is for informational purposes only and does not constitute financial advice. Corallo Residence is a registered development in Port Ghalib, Marsa Alam, Egypt.',
      footer_copy: '© 2026 Corallo Residence. All rights reserved.'
    },

    // ─────────────────────────── ARABIC ───────────────────────────
    ar: {
      meta_title: 'كورالو ريزيدنس — امتلك شاليه فاخر على البحر الأحمر | بورت غالب',

      nav_home: 'الرئيسية',
      nav_units: 'الوحدات',
      nav_invest: 'استثمر',
      nav_contact: 'تواصل',

      hero_badge: 'بورت غالب، البحر الأحمر، مصر',
      hero_title: 'امتلك شاليه فاخر<br><span class="text-gradient">على البحر الأحمر</span>',
      hero_subtitle: 'حيث تلتقي الصحراء بالمياه الفيروزية — كورالو ريزيدنس يقدم لك مزيجاً نادراً من الحياة الفاخرة والعوائد الاستثمارية المتميزة في أحد أرقى المنتجعات المصرية.',
      hero_search_type: 'نوع الوحدة',
      search_type_studio: 'استوديو',
      search_type_1bed: 'غرفة نوم واحدة',
      search_type_2bed: 'غرفتا نوم',
      search_type_penthouse: 'بنتهاوس',
      hero_search_beds: 'غرف النوم',
      search_beds_studio: 'استوديو',
      search_beds_1: '1 غرفة',
      search_beds_2: '2 غرفة',
      search_beds_3: '+3 غرف',
      hero_search_price: 'نطاق السعر',
      search_price_1: '€30K – €55K',
      search_price_2: '€55K – €100K',
      search_price_3: '€100K – €170K',
      search_price_4: '+€170K',
      hero_search_btn: '← استعرض الوحدات',
      hero_scarcity: 'باقي 7 وحدات فقط بسعر الإطلاق',

      stat_roi: '15–22%',
      stat_roi_lbl: 'عائد إيجار سنوي',
      stat_occupancy: '+90%',
      stat_occupancy_lbl: 'نسبة الإشغال',
      stat_from: 'يبدأ من €30K',
      stat_from_lbl: 'سعر البداية',

      section_units_title: 'الوحدات المميزة',
      section_units_desc: 'كل وحدة مفروشة بالكامل وتُدار باحترافية — جاهزة لتحقيق دخل من اليوم الأول.',
      unit_inquire_btn: 'استفسر الآن',
      units: [
        { name: 'استوديو',       price: '€30,000',  size: '38 م²',  beds: 'استوديو',   baths: '1 حمام',    desc: 'استوديو بإطلالة بحرية مع مطبخ مجهز بالكامل وتراس خاص.',                                 image: 'icons/studio-new.png'    },
        { name: '1 غرفة نوم',   price: '€55,000',  size: '62 م²',  beds: '1 غرفة',    baths: '1 حمام',    desc: 'غرفة نوم واسعة مع منطقة معيشة مفتوحة.',                                                  image: 'icons/bed1-new.png'      },
        { name: '2 غرفة نوم',   price: '€100,000', size: '105 م²', beds: '2 غرفة',    baths: '2 حمام',    desc: 'شقة عائلية مع شرفة خاصة.',                                                               image: 'icons/bed2-new.png'      },
        { name: 'بنتهاوس',      price: '€170,000', size: '210 م²', beds: '3 غرف',     baths: '3 حمامات',  desc: 'بنتهاوس على السطح مع مسبح خاص وإطلالة 360° على البحر.',                                  image: 'icons/penthouse-new.png' }
      ],

      section_invest_title: 'لماذا تستثمر في بورت غالب؟',
      section_invest_desc: 'بورت غالب هو الوجهة المتكاملة الأولى في مصر — 10 كم من الشواطئ البكر، أكبر مارينا خاصة على البحر الأحمر، وبنية تحتية عالمية المستوى.',
      invest_marina_title: 'مارينا خاصة',
      invest_marina_desc: 'أرصفة لأكثر من 1,000 مركبة — أكبر مارينا خاصة على البحر الأحمر، تستقطب أصحاب اليخوت الدوليين وكبار الزوار على مدار العام.',
      invest_roi_title: 'عائد إيجار 15–22%',
      invest_roi_desc: 'القطاع السياحي في مصر في ازدهار مستمر. يستفيد ملاك كورالو ريزيدنس من برنامج إيجار مُدار بالكامل مع دعم الإشغال المضمون وتقارير ربع سنوية شفافة.',
      invest_location_title: 'موقع استراتيجي',
      invest_location_desc: 'على بُعد 5 دقائق فقط من مطار مرسى علم الدولي (RMF) — رحلات مباشرة من لندن وفرانكفورت وأمستردام وعبر الخليج.',
      invest_freehold_title: 'تملك حر',
      invest_freehold_desc: 'سند ملكية كامل — يمكن للأجانب تملك 100% ملكية حرة في منطقة البحر الأحمر المصرية.',
      invest_managed_title: 'مُسلَّم جاهزاً ومُدار',
      invest_managed_desc: 'مفروش بالكامل، يُدار باحترافية، ويُؤجَّر نيابةً عنك — استثمار بدون أي جهد.',

      section_amenities_title: 'مرافق المنتجع',
      section_amenities_desc: 'كورالو ريزيدنس أكثر من مجرد عقار — إنه تجربة منتجع عالمية المستوى.',
      amenity_pool: 'حمام سباحة لانهائي',
      amenity_beach: 'شاطئ خاص',
      amenity_marina: 'مارينا خاصة',
      amenity_jacuzzi: 'جاكوزي على السطح',
      amenity_security: 'أمن 24/7',
      amenity_fitness: 'مركز لياقة بدنية',

      section_testimonials_title: 'ماذا يقول ملاكنا',
      testimonials: [
        { text: 'اشترينا وحدة غرفة نوم واحدة. الموقع رائع والفريق المشرف على الإدارة محترف للغاية. نحن سعداء جداً بهذا الاستثمار.',           name: 'جيمس وكلير م.',  location: 'مانشستر، المملكة المتحدة' },
        { text: 'كنت أبحث عن استثمار في البحر الأحمر وكورالو كان الخيار الأمثل. العائد يتجاوز توقعاتي والإدارة ممتازة.',                                   name: 'توماس م.',        location: 'ميونخ، ألمانيا'           },
        { text: 'كمصري مقيم في القاهرة، أردت عقاراً للإجازات والاستثمار. كورالو يجمع الاثنين بشكل مثالي.',                                                 name: 'أحمد ك.',          location: 'القاهرة، مصر'             }
      ],

      footer_tagline: 'شاليهات فاخرة على البحر الأحمر في بورت غالب — حيث يلتقي الاستثمار الاستثنائي بأسلوب الحياة الرفيع.',
      footer_links_title: 'روابط سريعة',
      footer_nav_home: 'الرئيسية',
      footer_nav_units: 'الوحدات',
      footer_nav_invest: 'الاستثمار',
      footer_nav_amenities: 'المرافق',
      footer_nav_testimonials: 'آراء العملاء',
      footer_nav_contact: 'تواصل',
      footer_contact_title: 'تواصل معنا',
      footer_contact_address: 'بورت غالب، مرسى علم، البحر الأحمر، مصر',
      footer_contact_airport: '5 دقائق من مطار مرسى علم (RMF)',
      footer_contact_email: 'info@coralloresidence-portgahlip.com',
      footer_disclaimer: '* جميع الأسعار المعروضة بالأورو تقريبية وتخضع لتقلبات سعر الصرف. أرقام العائد مبنية على الأداء التاريخي والتوقعات السوقية — قد تختلف العوائد الفعلية. هذه الصفحة لأغراض معلوماتية فقط ولا تمثل نصيحة مالية. كورالو ريزيدنس مشروع مسجل في بورت غالب، مرسى علم، مصر.',
      footer_copy: '© 2026 كورالو ريزيدنس. جميع الحقوق محفوظة.'
    },

    // ─────────────────────────── ITALIAN ───────────────────────────
    it: {
      meta_title: 'Corallo Residence — Possiedi uno Chalet di Lusso sul Mar Rosso | Port Ghalib',

      nav_home: 'Home',
      nav_units: 'Proprietà',
      nav_invest: 'Investire',
      nav_contact: 'Contatti',

      hero_badge: 'Port Ghalib, Mar Rosso, Egitto',
      hero_title: 'Possiedi uno Chalet di Lusso<br><span class="text-gradient">sul Mar Rosso</span>',
      hero_subtitle: 'Dove il deserto incontra acque turchesi — Corallo Residence offre un raro connubio di vita lussuosa e rendimenti d\'investimento eccezionali in uno dei resort più esclusivi d\'Egitto.',
      hero_search_type: 'Tipo di Unità',
      search_type_studio: 'Monolocale',
      search_type_1bed: '1 Camera da Letto',
      search_type_2bed: '2 Camere da Letto',
      search_type_penthouse: 'Attico',
      hero_search_beds: 'Camere da Letto',
      search_beds_studio: 'Monolocale',
      search_beds_1: '1 Camera',
      search_beds_2: '2 Camere',
      search_beds_3: '3+ Camere',
      hero_search_price: 'Fascia di Prezzo',
      search_price_1: '€30K – €55K',
      search_price_2: '€55K – €100K',
      search_price_3: '€100K – €170K',
      search_price_4: '€170K+',
      hero_search_btn: 'Visualizza Proprietà →',
      hero_scarcity: 'Solo 7 unità rimaste al prezzo di lancio',

      stat_roi: '15–22%',
      stat_roi_lbl: 'ROI Locazione Annuale',
      stat_occupancy: '90%+',
      stat_occupancy_lbl: 'Tasso di Occupazione',
      stat_from: 'da €30K',
      stat_from_lbl: 'Prezzo d\'Ingresso',

      section_units_title: 'Proprietà in Evidenza',
      section_units_desc: 'Ogni unità è completamente arredata e gestita professionalmente — pronta a generare reddito dal primo giorno.',
      unit_inquire_btn: 'Richiedi Info',
      units: [
        { name: 'Monolocale',         price: '€30.000',  size: '38 m²',  beds: 'Monolocale',  baths: '1 Bagno',   desc: 'Monolocale con vista mare, cucina completamente attrezzata e terrazza privata.',  image: 'icons/studio-new.png'    },
        { name: '1 Camera da Letto',  price: '€55.000',  size: '62 m²',  beds: '1 Camera',    baths: '1 Bagno',   desc: 'Ampio appartamento con zona living open space.',                                  image: 'icons/bed1-new.png'      },
        { name: '2 Camere da Letto',  price: '€100.000', size: '105 m²', beds: '2 Camere',    baths: '2 Bagni',   desc: 'Appartamento familiare con balcone privato.',                                     image: 'icons/bed2-new.png'      },
        { name: 'Attico',             price: '€170.000', size: '210 m²', beds: '3 Camere',    baths: '3 Bagni',   desc: 'Attico con piscina privata e vista panoramica a 360° sul mare.',                  image: 'icons/penthouse-new.png' }
      ],

      section_invest_title: 'Perché Investire a Port Ghalib?',
      section_invest_desc: 'Port Ghalib è la principale destinazione resort integrata d\'Egitto — 10 km di costa incontaminata, il più grande porto privato del Mar Rosso e infrastrutture di classe mondiale.',
      invest_marina_title: 'Marina Privata',
      invest_marina_desc: 'Ormeggi per oltre 1.000 imbarcazioni — il più grande porto privato del Mar Rosso, che attira armatori internazionali e visitatori benestanti tutto l\'anno.',
      invest_roi_title: 'ROI Locazione 15–22%',
      invest_roi_desc: 'Il settore turistico egiziano è in piena espansione. I proprietari di Corallo Residence beneficiano di un programma di locazione completamente gestito con supporto garantito all\'occupazione e reportistica trimestrale trasparente.',
      invest_location_title: 'Posizione Privilegiata',
      invest_location_desc: 'A soli 5 minuti dall\'aeroporto internazionale di Marsa Alam (RMF) — voli diretti da Londra, Francoforte, Amsterdam e tutto il Golfo.',
      invest_freehold_title: 'Piena Proprietà',
      invest_freehold_desc: 'Titolo di proprietà completo — gli stranieri possono possedere al 100% proprietà in piena proprietà nella zona del Mar Rosso egiziano.',
      invest_managed_title: 'Chiavi in Mano e Gestito',
      invest_managed_desc: 'Completamente arredato, gestito professionalmente e affittato per te — investimento completamente senza pensieri.',

      section_amenities_title: 'Servizi del Resort',
      section_amenities_desc: 'Corallo Residence è più di una proprietà — è un\'esperienza resort di classe mondiale.',
      amenity_pool: 'Piscina a Sfioro',
      amenity_beach: 'Spiaggia Privata',
      amenity_marina: 'Marina Privata',
      amenity_jacuzzi: 'Jacuzzi sul Tetto',
      amenity_security: 'Sicurezza 24/7',
      amenity_fitness: 'Centro Fitness',

      section_testimonials_title: 'Cosa Dicono i Nostri Proprietari',
      testimonials: [
        { text: 'Abbiamo acquistato un bilocale. La posizione è magnifica e il team di gestione è estremamente professionale. Siamo molto soddisfatti di questo investimento.',  name: 'James & Claire M.', location: 'Manchester, Regno Unito'        },
        { text: 'Cercavo un investimento nel Mar Rosso e Corallo era la scelta ideale. Il rendimento supera le mie aspettative e la gestione è eccellente.',                              name: 'Thomas M.',          location: 'Monaco di Baviera, Germania'   },
        { text: 'Da egiziano che vive al Cairo, volevo una proprietà per le vacanze e l\'investimento. Corallo combina perfettamente entrambi.',                                          name: 'Ahmed K.',           location: 'Cairo, Egitto'                 }
      ],

      footer_tagline: 'Chalet di lusso sul Mar Rosso a Port Ghalib — dove gli investimenti eccezionali incontrano uno stile di vita straordinario.',
      footer_links_title: 'Link Rapidi',
      footer_nav_home: 'Home',
      footer_nav_units: 'Proprietà',
      footer_nav_invest: 'Investimento',
      footer_nav_amenities: 'Servizi',
      footer_nav_testimonials: 'Testimonianze',
      footer_nav_contact: 'Contatti',
      footer_contact_title: 'Contattaci',
      footer_contact_address: 'Port Ghalib, Marsa Alam, Mar Rosso, Egitto',
      footer_contact_airport: '5 min dall\'Aeroporto di Marsa Alam (RMF)',
      footer_contact_email: 'info@coralloresidence-portgahlip.com',
      footer_disclaimer: '* Tutti i prezzi in EUR sono indicativi e soggetti a fluttuazioni del tasso di cambio. Le cifre ROI si basano su performance storiche e proiezioni di mercato — i rendimenti effettivi possono variare. Questa pagina è solo a scopo informativo e non costituisce consulenza finanziaria. Corallo Residence è uno sviluppo registrato a Port Ghalib, Marsa Alam, Egitto.',
      footer_copy: '© 2026 Corallo Residence. Tutti i diritti riservati.'
    }

  }; // end T

  // ==================== ENGINE ====================

  var currentLang = 'en';

  /** Detect language: localStorage → browser → fallback EN */
  function detectLang() {
    var saved = localStorage.getItem('preferred-lang');
    if (saved && T[saved]) return saved;
    var browser = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    return T[browser] ? browser : 'en';
  }

  /** HTML-escape a string */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Apply language to entire page */
  function applyLang(lang) {
    var t = T[lang];
    if (!t) return;
    currentLang = lang;

    // ── HTML direction + lang attr ──
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // ── Font family ──
    if (lang === 'ar') {
      document.body.style.setProperty('font-family', "'Cairo', sans-serif", 'important');
      [].forEach.call(document.querySelectorAll('h1,h2,h3,h4,h5'), function (el) {
        el.style.fontFamily = "'Cairo', sans-serif";
      });
    } else {
      document.body.style.removeProperty('font-family');
      [].forEach.call(document.querySelectorAll('h1,h2,h3,h4,h5'), function (el) {
        el.style.fontFamily = '';
      });
    }

    // ── Static text (textContent) ──
    [].forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] != null) el.textContent = t[key];
    });

    // ── HTML content (innerHTML — for tags like <br> inside headings) ──
    [].forEach.call(document.querySelectorAll('[data-i18n-html]'), function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] != null) el.innerHTML = t[key];
    });

    // ── Select option text ──
    updateSelectOptions(t);

    // ── Page title ──
    if (t.meta_title) document.title = t.meta_title;

    // ── Active button highlight ──
    [].forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // ── Dynamic sections ──
    renderUnits(t);
    renderTestimonials(t);
  }

  /** Update <select> option labels */
  function updateSelectOptions(t) {
    var maps = {
      'search-type':  [null, 'search_type_studio', 'search_type_1bed', 'search_type_2bed', 'search_type_penthouse'],
      'search-beds':  [null, 'search_beds_studio', 'search_beds_1', 'search_beds_2', 'search_beds_3'],
      'search-price': [null, 'search_price_1', 'search_price_2', 'search_price_3', 'search_price_4']
    };
    var placeholders = { 'search-type': 'hero_search_type', 'search-beds': 'hero_search_beds', 'search-price': 'hero_search_price' };

    Object.keys(maps).forEach(function (id) {
      var sel = document.getElementById(id);
      if (!sel) return;
      var keys = maps[id];
      [].forEach.call(sel.querySelectorAll('option'), function (opt, i) {
        if (i === 0) {
          var phKey = placeholders[id];
          if (t[phKey] != null) opt.textContent = t[phKey];
        } else if (keys[i] && t[keys[i]] != null) {
          opt.textContent = t[keys[i]];
        }
      });
    });
  }

  /** Render property unit cards */
  function renderUnits(t) {
    var c = document.getElementById('cms-units-en');
    if (!c || !t.units) return;
    var inquireBtn = t.unit_inquire_btn || 'Inquire Now';
    c.innerHTML = t.units.map(function (u) {
      var iconHtml = u.image
        ? '<img src="' + esc(u.image) + '" class="icon-hd" alt="' + esc(u.name) + '">'
        : '<span style="font-size:3rem;">🏠</span>';
      return '<div class="unit-card fade-up visible">' +
        '<div class="unit-card-img">' + iconHtml + '</div>' +
        '<div class="unit-card-body">' +
        '<h3>' + esc(u.name) + '</h3>' +
        '<div class="unit-price">' + esc(u.price) + '</div>' +
        '<div class="unit-specs">' +
        '<span class="unit-spec"><i class="fi fi-hd-bed"></i> ' + esc(u.beds) + '</span>' +
        '<span class="unit-spec"><i class="fi fi-hd-shower"></i> ' + esc(u.baths) + '</span>' +
        '<span class="unit-spec"><i class="fi fi-hd-ruler-combined"></i> ' + esc(u.size) + '</span>' +
        '</div>' +
        '<p style="font-size:0.85rem;color:var(--gray);margin-bottom:1rem;">' + esc(u.desc) + '</p>' +
        '<a href="#contact" class="btn btn-gold btn-block">' + esc(inquireBtn) + '</a>' +
        '</div></div>';
    }).join('');
  }

  /** Render testimonial cards */
  function renderTestimonials(t) {
    var c = document.getElementById('cms-testimonials-en');
    if (!c || !t.testimonials) return;
    c.innerHTML = t.testimonials.map(function (item) {
      return '<div class="testimonial-card fade-up visible">' +
        '<div class="testimonial-stars">★★★★★</div>' +
        '<p style="margin-bottom:0.5rem;">"' + esc(item.text) + '"</p>' +
        '<div class="testimonial-author"><strong>' + esc(item.name) + '</strong> — ' + esc(item.location) + '</div>' +
        '</div>';
    }).join('');
  }

  /** Public: switch language and persist choice */
  function setLanguage(lang) {
    if (!T[lang]) return;
    localStorage.setItem('preferred-lang', lang);
    applyLang(lang);
  }

  // ── Public API ──
  window.i18n = {
    setLanguage: setLanguage,
    currentLang: function () { return currentLang; }
  };

  // ── Init on DOMContentLoaded ──
  document.addEventListener('DOMContentLoaded', function () {
    currentLang = detectLang();
    applyLang(currentLang);

    [].forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });
  });

  // ── Re-apply after cms.js finishes its async fetch ──
  // This prevents cms.js from overwriting i18n text with English-only content.json data.
  document.addEventListener('cms:ready', function () {
    applyLang(currentLang);
  });

})();
