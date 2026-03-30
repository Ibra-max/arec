'use strict';

(function() {
  function setLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Swap text content for elements with data-ar/data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(function(el) {
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Swap placeholders for inputs
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(function(el) {
      el.setAttribute('placeholder', el.getAttribute('data-' + lang + '-placeholder'));
    });

    // Update toggle button state
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update page title
    html.setAttribute('lang', lang);
    if (lang === 'ar') {
      document.title = 'AREC | أريك للهندسة والمقاولات';
    } else {
      document.title = 'AREC | Constructions & Engineering';
    }

    localStorage.setItem('arec-lang', lang);
  }

  // Toggle buttons
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLanguage(this.dataset.lang);
    });
  });

  // Restore saved language (default: Arabic)
  const saved = localStorage.getItem('arec-lang');
  if (saved && saved !== 'ar') {
    setLanguage(saved);
  }
})();
