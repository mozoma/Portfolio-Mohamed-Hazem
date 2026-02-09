/**
 * Portfolio - Mohamed Hazem Fahmy
 * Main JS: Nav, theme, i18n, scroll animations, project filters, contact form
 */

(function () {
  'use strict';

  const DOM = {
    header: document.getElementById('header'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('theme-toggle'),
    langToggle: document.getElementById('lang-toggle'),
    html: document.documentElement,
    contactForm: document.getElementById('contact-form'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    projectCards: document.querySelectorAll('.project-card'),
    typewriterEl: document.querySelector('.typewriter-text'),
  };

  let currentLang = 'en';
  let typewriterInterval = null;

  // ----- i18n -----
  const translations = {
    en: {
      title: 'Mohamed Hazem Fahmy | AI & Data Analytics Engineer',
      navName: 'Mohamed Hazem',
      navHome: 'Home',
      navAbout: 'About',
      navSkills: 'Skills',
      navEducation: 'Education',
      navExperience: 'Experience',
      navProjects: 'Projects',
      navCertifications: 'Certifications',
      navContact: 'Contact',
      heroGreeting: "Hi, I'm",
      heroImA: "I'm a ",
      heroRoles: ['AI Engineer', 'Data Analyst', 'ML Enthusiast'],
      heroSubtitle: 'AI & Data Analytics Engineer | Machine Learning Enthusiast',
      btnDownloadCV: 'Download CV',
      btnViewProjects: 'View Projects',
      btnGetInTouch: 'Get in Touch',
      aboutTitle: 'About Me',
      aboutP1: 'I specialize in ',
      aboutP1b: ' with ',
      aboutP1c: '. I build ',
      aboutP2: ' models using ',
      aboutP2b: ' and work on ',
      aboutP2c: ' projects. I also have experience in ',
      aboutP2d: '.',
      aboutP3: 'I thrive on turning data into insights and building intelligent solutions that make a real impact.',
      skillsTitle: 'Skills',
      educationTitle: 'Education',
      eduDegree: "Bachelor's in Software Engineering",
      eduMajor: 'Major: Software Engineering',
      eduExpected: 'Expected 2027',
      experienceTitle: 'Experience',
      exp1Title: 'Data Engineering Internship',
      exp1Desc: 'Hands-on data engineering, ETL pipelines, and data warehousing.',
      exp2Title: 'AI Training Program',
      exp2Desc: 'AI and machine learning training, model development, and best practices.',
      projectsTitle: 'Projects',
      filterAll: 'All',
      proj1Desc: 'Exploratory data analysis, dashboards, and insights from sales datasets.',
      proj2Desc: 'Classification/regression model with feature engineering and evaluation.',
      proj3Desc: 'Visualization and statistical analysis of real-world datasets.',
      certTitle: 'Certifications & Training',
      certSubtitle: 'Professional certificates and training that reflect my journey in Data & AI.',
      certView: 'View Certificate',
      certDriveLink: 'View All Certificates (Google Drive)',
      contactTitle: 'Get In Touch',
      contactSubtitle: 'Reach out for opportunities, collaborations, or freelance work.',
      contactEmail: 'Email',
      contactWhatsApp: 'Phone / WhatsApp',
      contactLocation: 'Egypt',
      placeholderName: 'Full Name',
      placeholderEmail: 'Email Address',
      placeholderSubject: 'Subject',
      placeholderMessage: 'Message',
      btnSend: 'Send Message',
      footerBuilt: 'Built with passion for Data & AI',
    },
    ar: {
      title: 'محمد حازم فهمي  | مهندس الذكاء الاصطناعي وتحليل البيانات',
      navName: 'محمد حازم  فهمي  ',
      navHome: 'الرئيسية',
      navAbout: 'عني',
      navSkills: 'المهارات',
      navEducation: 'التعليم',
      navExperience: 'الخبرات',
      navProjects: 'المشاريع',
      navCertifications: 'الشهادات',
      navContact: 'تواصل',
      heroGreeting: 'مرحباً، أنا',
      heroImA: 'أنا ',
      heroRoles: ['مهندس ذكاء اصطناعي', 'محلل بيانات', 'مهتم بتعلم الآلة'],
      heroSubtitle: 'مهندس ذكاء اصطناعي وتحليل البيانات | مهتم بتعلم الآلة',
      btnDownloadCV: 'تحميل السيرة',
      btnViewProjects: 'المشاريع',
      btnGetInTouch: 'تواصل معي',
      aboutTitle: 'عني',
      aboutP1: 'أختص في ',
      aboutP1b: ' باستخدام ',
      aboutP1c: '. أبني نماذج ',
      aboutP2: ' باستخدام ',
      aboutP2b: ' وأعمل على مشاريع ',
      aboutP2c: '. لدي خبرة أيضاً في ',
      aboutP2d: '.',
      aboutP3: 'أحب تحويل البيانات إلى رؤى وبناء حلول ذكية ذات أثر حقيقي.',
      skillsTitle: 'المهارات',
      educationTitle: 'التعليم',
      eduDegree: 'بكالوريوس هندسة البرمجيات',
      eduMajor: 'التخصص: هندسة البرمجيات',
      eduExpected: 'متوقع 2027',
      experienceTitle: 'الخبرات',
      exp1Title: 'تدريب هندسة البيانات',
      exp1Desc: 'هندسة بيانات، أنابيب ETL، ومستودعات البيانات.',
      exp2Title: 'برنامج تدريب الذكاء الاصطناعي',
      exp2Desc: 'تدريب الذكاء الاصطناعي وتعلم الآلة وتطوير النماذج.',
      projectsTitle: 'المشاريع',
      filterAll: 'الكل',
      proj1Desc: 'تحليل استكشافي للبيانات وتقارير ورؤى من بيانات المبيعات.',
      proj2Desc: 'نموذج تنبؤي مع هندسة الميزات والتقييم.',
      proj3Desc: 'تصور وتحليل إحصائي لبيانات حقيقية.',
      certTitle: 'الشهادات والتدريب',
      certSubtitle: 'شهادات وتدريب يعكس مساري في البيانات والذكاء الاصطناعي.',
      certView: 'عرض الشهادة',
      certDriveLink: 'عرض كل الشهادات (Google Drive)',
      contactTitle: 'تواصل معي',
      contactSubtitle: 'تواصل للفرص أو التعاون أو العمل الحر.',
      contactEmail: 'البريد',
      contactWhatsApp: 'الهاتف / واتساب',
      contactLocation: 'مصر',
      placeholderName: 'الاسم الكامل',
      placeholderEmail: 'البريد الإلكتروني',
      placeholderSubject: 'الموضوع',
      placeholderMessage: 'الرسالة',
      btnSend: 'إرسال',
      footerBuilt: 'صُنع بشغف للبيانات والذكاء الاصطناعي',
    },
  };

  function applyTranslations(lang) {
    const t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });
    const titleEl = document.querySelector('[data-i18n="title"]');
    if (titleEl) document.title = titleEl.textContent;
    if (DOM.langToggle) DOM.langToggle.textContent = lang === 'en' ? 'AR' : 'EN';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (DOM.typewriterEl && t.heroRoles) startTypewriter(t.heroRoles);
  }

  function startTypewriter(roles) {
    if (typewriterInterval) clearInterval(typewriterInterval);
    let roleIndex = 0;
    let charIndex = 0;
    let current = roles[0] || '';
    function tick() {
      if (charIndex <= current.length) {
        DOM.typewriterEl.textContent = current.slice(0, charIndex);
        charIndex++;
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        current = roles[roleIndex];
        charIndex = 0;
      }
    }
    tick();
    typewriterInterval = setInterval(tick, 120);
  }

  // ----- Theme -----
  function getStoredTheme() {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }
  function setTheme(theme) {
    DOM.html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {}
  }
  function toggleTheme() {
    const next = DOM.html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // ----- Scroll: active section & reveal -----
  function onScroll() {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('.section[id]');
    sections.forEach(function (section) {
      const id = section.getAttribute('id');
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        DOM.navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
      // Reveal
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85;
      if (inView) {
        section.querySelectorAll('.timeline-item, .project-card, .cert-card, .skill-card').forEach(function (el) {
          el.classList.add('visible');
        });
      }
    });
  }

  // ----- Mobile menu -----
  function toggleMenu() {
    if (DOM.navMenu) DOM.navMenu.classList.toggle('show');
    if (DOM.navToggle) DOM.navToggle.classList.toggle('active');
    document.body.style.overflow = DOM.navMenu.classList.contains('show') ? 'hidden' : '';
  }
  function closeMenuOnLink() {
    DOM.navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        DOM.navMenu.classList.remove('show');
        DOM.navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Project filter -----
  function filterProjects(filter) {
    DOM.projectCards.forEach(function (card) {
      const cat = card.getAttribute('data-category');
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hide', !show);
      if (show) card.classList.add('visible');
    });
    DOM.filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
  }

  // ----- Contact form -----
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const obj = {};
    data.forEach(function (v, k) {
      obj[k] = v;
    });
    // Optional: send to backend or mailto
    const mailto = 'mailto:mohamedhazemsa30@gmail.com?subject=' + encodeURIComponent(obj.subject || 'Portfolio Contact') + '&body=' + encodeURIComponent('From: ' + obj.name + ' <' + obj.email + '>\n\n' + obj.message);
    window.location.href = mailto;
    form.reset();
  }

  // ----- Init -----
  function init() {
    setTheme(getStoredTheme());
    const langStored = (function () {
      try {
        return localStorage.getItem('portfolio-lang') || 'en';
      } catch (e) {
        return 'en';
      }
    })();
    currentLang = langStored;
    applyTranslations(currentLang);

    if (DOM.typewriterEl && translations.en.heroRoles) {
      startTypewriter(translations[currentLang].heroRoles);
    }

    if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
    if (DOM.langToggle) {
      DOM.langToggle.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        try {
          localStorage.setItem('portfolio-lang', currentLang);
        } catch (e) {}
        applyTranslations(currentLang);
      });
    }

    window.addEventListener('scroll', function () {
      onScroll();
      if (DOM.header) {
        DOM.header.classList.toggle('scrolled', window.scrollY > 50);
      }
    });
    onScroll();

    if (DOM.navToggle) DOM.navToggle.addEventListener('click', toggleMenu);
    closeMenuOnLink();

    DOM.filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterProjects(btn.getAttribute('data-filter'));
      });
    });

    if (DOM.contactForm) DOM.contactForm.addEventListener('submit', handleSubmit);

    // Skill bars: add visible on scroll
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.skill-card').forEach(function (el) {
      skillObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
