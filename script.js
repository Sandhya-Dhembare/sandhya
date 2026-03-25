// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ---------- THEME TOGGLE ----------
    const themeToggle = document.getElementById('button-theme-toggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    const setTheme = (theme) => {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    };
  
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  
    // ---------- MOBILE MENU ----------
    const mobileToggle = document.getElementById('button-mobile-menu-toggle');
    const mobileMenu = document.getElementById('div-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const closeMobileMenu = () => {
      mobileMenu.classList.remove('open');
    };
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  
    // ---------- ACTIVE NAV HIGHLIGHT + SMOOTH SCROLL ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToSection = (e) => {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (mobileMenu.classList.contains('open')) closeMobileMenu();
        }
      }
    };
    navLinks.forEach(link => link.addEventListener('click', scrollToSection));
    document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', scrollToSection));
  
    const updateActiveNav = () => {
      let current = '';
      const scrollPos = window.scrollY + 150;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) link.classList.add('active');
      });
    };
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  
    // ---------- SCROLL REVEAL (Intersection Observer) ----------
    const revealSections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealSections.forEach(section => observer.observe(section));
  
    // ---------- BACK TO TOP BUTTON ----------
    const backToTop = document.getElementById('button-back-to-top');
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) backToTop.style.opacity = '1';
      else backToTop.style.opacity = '0.6';
    });
    backToTop.style.opacity = '0.6';
  
    // optional small fix for anchor links from buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        if (targetId && document.querySelector(targetId)) {
          e.preventDefault();
          document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });