/**
 * Africa Climate Finance - i18n (Internationalization)
 * Dictionary-based translations for English (en) and Swahili (sw)
 * Supports ?lang=en | ?lang=sw, localStorage persistence, data-i18n attributes
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'climatefinance_lang';
  const SUPPORTED_LANGS = ['en', 'sw'];
  const DEFAULT_LANG = 'en';

  const TRANSLATIONS = {
    en: {
      nav: {
        home: 'Home',
        aboutUs: 'About Us',
        ourTeam: 'Our Team',
        copEngagements: 'COP Engagements',
        climatePolicyInsights: 'Insights on Climate Policy & Finance',
        beneficiaries: 'Our Beneficiaries',
        whatWeDo: 'What We Do',
        contactUs: 'Contact Us',
        search: 'Search',
        searchPlaceholder: 'Search Here..',
        searchAria: 'Search',
        marketAnalysis: 'Market Analysis',
        financialModelling: 'Financial Modelling',
        microfinance: 'Microfinance',
        microfinanceClimate: 'Microfinance for Climate',
        genderAssessment: 'Gender Assessment',
        stakeholdersEngagement: 'Stakeholders Engagement',
        scientificAssessment: 'Scientific Assessment',
        climateRisk: 'Climate Risk',
        impact: 'Impact',
        ourWork: 'Our Work',
        insights: 'Insights',
        internationalEngagement: 'International Engagement',
        beneficiaries: 'Our Beneficiaries',
        womenEmpowerment: 'Women Empowerment',
        loanProgram: 'Loan Program',
        donate: 'Donate'
      },
      team: {
        title: 'Our Team',
        leadership: 'Leadership & Experts',
        leadershipDesc: 'Executive leadership, financial inclusion, and technical implementation across Africa.',
        execLeadership: 'Executive Leadership',
        teamSection: 'Team',
        viewProfile: 'View Profile',
        intro: 'Our team combines 25+ years of banking, data science, and grassroots finance to deliver climate solutions from village level to global policy forums.'
      },
      profile: {
        teamProfile: 'Team Profile',
        backToTeam: 'Back to Team',
        about: 'About',
        education: 'Education & Credentials',
        expertise: 'Expertise',
        leadership: 'Leadership',
        contact: 'Contact',
        quickContact: 'Quick Contact',
        email: 'Email',
        linkedIn: 'LinkedIn',
        whatsapp: 'WhatsApp'
      },
      cop: {
        title: 'COP Engagements',
        subtitle: 'Africa Climate Finance at Global Climate Negotiations',
        overview: 'Overview',
        overviewText: 'Africa Climate Finance participates in global climate forums and UN climate summits (COP). Our engagements at these negotiations shape policy dialogue, advance climate finance mechanisms, and strengthen partnerships with international funds and development institutions.',
        internationalEngagement: 'International Engagement',
        findUs: 'Find Us'
      },
      contact: {
        title: 'Contact Us',
        getInTouch: 'Write to us. We respond within 24 hours.',
        ourAddress: 'Our Address',
        emailAddress: 'Email Address',
        support: '24/7 Support',
        followUs: 'Follow us',
        findUs: 'Find Us',
        namePlaceholder: 'Name*',
        emailPlaceholder: 'Email*',
        phonePlaceholder: 'Phone*',
        subjectPlaceholder: 'Subject*',
        messagePlaceholder: 'Your Message*',
        agreementBefore: 'I agree to the',
        agreementAnd: 'and',
        terms: 'Terms',
        privacyPolicy: 'Privacy Policy',
        sendMessage: 'Send Message'
      },
      footer: {
        ctaTitle: 'Building Climate Resilience Across Africa',
        ctaDesc: 'Partner with Africa Climate Finance to empower communities and scale climate-smart solutions.',
        partnerWithUs: 'Partner With Us',
        contactUs: 'Contact Us',
        explore: 'Quick Links',
        aboutUs: 'About Us',
        ourTeam: 'Our Team',
        whatWeDo: 'What We Do',
        climatePolicyInsights: 'Insights on Climate Policy & Finance',
        copEngagements: 'COP Engagements',
        beneficiaries: 'Our Beneficiaries',
        events: 'Events',
        faq: 'FAQ',
        donate: 'Donate',
        contact: 'Contact',
        beneficiaries: 'Our Beneficiaries',
        womenEmpowerment: 'Women Empowerment',
        loanProgram: 'Loan Program',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        climateResources: 'Climate Resources',
        copyright: '© Africa Climate Finance',
        operatedBy: 'Operated by'
      },
      common: {
        home: 'Home',
        loading: 'Loading...'
      }
    },
    sw: {
      nav: {
        home: 'Nyumbani',
        aboutUs: 'Kuhusu Sisi',
        ourTeam: 'Timu Yetu',
        climatePolicyInsights: 'Maarifa ya Sera ya Mazingira na Fedha',
        copEngagements: 'Maandalizi ya COP',
        beneficiaries: 'Wanufaika Wetu',
        whatWeDo: 'Tunafanya Nini',
        contactUs: 'Wasiliana Nasi',
        search: 'Tafuta',
        searchPlaceholder: 'Tafuta hapa..',
        searchAria: 'Tafuta',
        marketAnalysis: 'Uchambuzi wa Soko',
        financialModelling: 'Mfano wa Kifedha',
        microfinance: 'Mikrobenki',
        microfinanceClimate: 'Mikrobenki kwa Hali ya Hewa',
        genderAssessment: 'Tathmini ya Jinsia',
        stakeholdersEngagement: 'Ushiriki wa Washiriki',
        scientificAssessment: 'Tathmini ya Kisayansi',
        climateRisk: 'Hatari za Hali ya Hewa',
        impact: 'Athari',
        ourWork: 'Kazi Yetu',
        insights: 'Maarifa',
        internationalEngagement: 'Ushiriki wa Kimataifa',
        beneficiaries: 'Wanufaika Wetu',
        womenEmpowerment: 'Uwezeshaji wa Wanawake',
        loanProgram: 'Mpango wa Mikopo',
        donate: 'Changia'
      },
      team: {
        title: 'Timu Yetu',
        leadership: 'Uongozi na Wataalamu',
        leadershipDesc: 'Uongozi wa juu, uwezo wa kifedha, na utekelezaji wa kiufundi kote Afrika.',
        execLeadership: 'Uongozi wa Juu',
        teamSection: 'Timu',
        viewProfile: 'Onyesha Wasifu',
        intro: 'Timu yetu inachanganya uzoefu wa zaidi ya miaka 25 katika benki, sayansi ya data, na fedha za jamii kutoa suluhu za hali ya hewa kutoka kijijini hadi mijadala ya kimataifa.'
      },
      profile: {
        teamProfile: 'Wasifu wa Mwanachama',
        backToTeam: 'Rudi kwa Timu',
        about: 'Kuhusu',
        education: 'Elimu na Sifa',
        expertise: 'Utaalamu',
        leadership: 'Uongozi',
        contact: 'Mawasiliano',
        quickContact: 'Mawasiliano ya Haraka',
        email: 'Barua pepe',
        linkedIn: 'LinkedIn',
        whatsapp: 'WhatsApp'
      },
      cop: {
        title: 'Maandalizi ya COP',
        subtitle: 'Africa Climate Finance kwenye Maongezi ya Kimataifa ya Hali ya Hewa',
        overview: 'Muhtasari',
        overviewText: 'Africa Climate Finance inashiriki katika mijadala ya kimataifa ya hali ya hewa na vikao vya COP. Ushiriki wetu katika mazungumzo haya unaunda mjadala wa sera, kuharakisha mbinu za kifedha za hali ya hewa, na kuimarisha urafiki na misaada ya kimataifa na taasisi za maendeleo.',
        internationalEngagement: 'Ushiriki wa Kimataifa',
        findUs: 'Tutafute'
      },
      contact: {
        title: 'Wasiliana Nasi',
        getInTouch: 'Tuandikie. Tunajibu ndani ya masaa 24.',
        ourAddress: 'Mahali Tulipo',
        emailAddress: 'Barua pepe',
        support: 'Msaada 24/7',
        followUs: 'Tufuate',
        findUs: 'Tutafute',
        namePlaceholder: 'Jina*',
        emailPlaceholder: 'Barua pepe*',
        phonePlaceholder: 'Simu*',
        subjectPlaceholder: 'Mada*',
        messagePlaceholder: 'Ujumbe wako*',
        agreementBefore: 'Nakubali',
        agreementAnd: 'na',
        terms: 'Masharti',
        privacyPolicy: 'Sera ya Faragha',
        sendMessage: 'Tuma Ujumbe'
      },
      footer: {
        ctaTitle: 'Kuunda Uwazi wa Hali ya Hewa Kote Afrika',
        ctaDesc: 'Shiriki na Africa Climate Finance kuwezesha jamii na kuongeza suluhu zenye akili ya hali ya hewa.',
        partnerWithUs: 'Shiriki Nasi',
        contactUs: 'Wasiliana Nasi',
        explore: 'Viungo vya Haraka',
        aboutUs: 'Kuhusu Sisi',
        ourTeam: 'Timu Yetu',
        climatePolicyInsights: 'Maarifa ya Sera ya Mazingira na Fedha',
        whatWeDo: 'Tunafanya Nini',
        copEngagements: 'Maandalizi ya COP',
        beneficiaries: 'Wanufaika Wetu',
        events: 'Matukio',
        faq: 'Maswali',
        donate: 'Changia',
        contact: 'Mawasiliano',
        beneficiaries: 'Wanufaika Wetu',
        womenEmpowerment: 'Uwezeshaji wa Wanawake',
        loanProgram: 'Mpango wa Mikopo',
        privacy: 'Sera ya Faragha',
        terms: 'Masharti',
        climateResources: 'Rasilimali za Hali ya Hewa',
        copyright: '© Africa Climate Finance',
        operatedBy: 'Inaendeshwa na'
      },
      common: {
        home: 'Nyumbani',
        loading: 'Inapakia...'
      }
    }
  };

  function getLangFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get('lang');
    return (lang && SUPPORTED_LANGS.indexOf(lang) >= 0) ? lang : null;
  }

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return (stored && SUPPORTED_LANGS.indexOf(stored) >= 0) ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function getLanguage() {
    return getLangFromUrl() || getStoredLang() || DEFAULT_LANG;
  }

  function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) < 0) lang = DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyTranslations();
    updateLangDropdown();
    return lang;
  }

  function t(key) {
    var lang = getLanguage();
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    var parts = key.split('.');
    var val = dict;
    for (var i = 0; i < parts.length; i++) {
      val = val ? val[parts[i]] : undefined;
    }
    return (typeof val === 'string') ? val : key;
  }

  function applyTranslations() {
    var lang = getLanguage();

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var text = t(key);
      if (text !== key) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var text = t(key);
      if (text !== key) el.placeholder = text;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-aria');
      var text = t(key);
      if (text !== key) el.setAttribute('aria-label', text);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      var text = t(key);
      if (text !== key) el.setAttribute('title', text);
    });
  }

  function updateLangDropdown() {
    var lang = getLanguage();
    var label = lang === 'sw' ? 'SW' : 'EN';
    document.querySelectorAll('.lang-name').forEach(function(el) {
      el.textContent = label;
    });
  }

  function initLangDropdown() {
    var menus = document.querySelectorAll('.language-dropdown-menu');
    menus.forEach(function(menu) {
      var path = window.location.pathname.split('/').pop() || 'index.html';
      menu.innerHTML = '<a class="dropdown-item lang-option" href="' + path + '?lang=en" data-lang="en">English</a><a class="dropdown-item lang-option" href="' + path + '?lang=sw" data-lang="sw">Kiswahili</a>';

      menu.querySelectorAll('.lang-option').forEach(function(opt) {
        opt.addEventListener('click', function(e) {
          e.preventDefault();
          var lang = opt.getAttribute('data-lang');
          if (lang) {
            setLanguage(lang);
            var btn = menu.closest('.dropdown') && menu.closest('.dropdown').querySelector('.dropdown-toggle');
            if (btn && typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
              var d = bootstrap.Dropdown.getInstance(btn);
              if (d) d.hide();
            }
          }
        });
      });
    });

    updateLangDropdown();

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-menu.show').forEach(function(m) {
          var btn = m.closest('.dropdown') && m.closest('.dropdown').querySelector('.dropdown-toggle');
          if (btn && bootstrap && bootstrap.Dropdown) {
            var d = bootstrap.Dropdown.getInstance(btn);
            if (d) d.hide();
          }
        });
      }
    });
  }

  function init() {
    var lang = getLangFromUrl();
    if (lang) setLanguage(lang);
    else applyTranslations();
    initLangDropdown();
  }

  document.addEventListener('DOMContentLoaded', function() {
    init();
  });

  window.i18n = {
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    t: t,
    applyTranslations: applyTranslations,
    SUPPORTED_LANGS: SUPPORTED_LANGS
  };

  window.__i18nApplyTranslations = applyTranslations;
  window.__i18nInitLanguageSwitcher = initLangDropdown;
})();
