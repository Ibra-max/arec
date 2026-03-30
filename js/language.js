'use strict';

(function() {
  function rebuildTitleLetters(text) {
    const title = document.querySelector('.hero__title');
    if (!title) return;
    title.textContent = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.className = 'hero__letter';
      span.style.animationDelay = (i * 0.04) + 's';
      title.appendChild(span);
    }
  }

  function setLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Swap text content for elements with data-ar/data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(function(el) {
      // Skip hero title — handled separately with letter animation
      if (el.classList.contains('hero__title')) return;
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Rebuild hero title with letter animation
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      const text = heroTitle.getAttribute('data-' + lang);
      rebuildTitleLetters(text);
    }

    // Swap placeholders for inputs
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(function(el) {
      el.setAttribute('placeholder', el.getAttribute('data-' + lang + '-placeholder'));
    });

    // Update toggle button state
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update CTA arrow direction
    const arrow = document.querySelector('.hero__cta-arrow');
    if (arrow) {
      arrow.innerHTML = lang === 'ar' ? '&larr;' : '&rarr;';
    }

    // Update page title
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
