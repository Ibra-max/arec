'use strict';

(function() {
  function rebuildTitleLetters(text, lang) {
    var title = document.querySelector('.hero__title');
    if (!title) return;
    title.textContent = '';
    title.style.opacity = '1';
    title.style.transform = 'none';

    // For Arabic: animate whole words to preserve ligatures
    if (lang === 'ar') {
      var words = text.trim().split(/\s+/);
      words.forEach(function(word, wordIndex) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'hero__word';
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(40px)';
        wordSpan.style.animation = 'letterReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        wordSpan.style.animationDelay = (wordIndex * 0.15) + 's';
        title.appendChild(wordSpan);
      });
    } else {
      // For English/LTR: split into words, then letters
      var words = text.trim().split(/\s+/);
      words.forEach(function(word, wordIndex) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'hero__word';

        word.split('').forEach(function(letter, letterIndex) {
          var letterSpan = document.createElement('span');
          letterSpan.textContent = letter;
          letterSpan.className = 'hero__letter';
          letterSpan.style.display = 'inline-block';
          letterSpan.style.opacity = '0';
          letterSpan.style.transform = 'translateY(40px)';
          letterSpan.style.animation = 'letterReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
          letterSpan.style.animationDelay = (wordIndex * 0.1 + letterIndex * 0.03) + 's';
          wordSpan.appendChild(letterSpan);
        });

        title.appendChild(wordSpan);
      });
    }
  }

  function setLanguage(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Swap text content for elements with data-ar/data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(function(el) {
      // Skip hero title — handled separately with letter animation
      if (el.classList.contains('hero__title')) return;
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Rebuild hero title with letter animation
    var heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      var text = heroTitle.getAttribute('data-' + lang);
      rebuildTitleLetters(text, lang);
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
    var arrow = document.querySelector('.hero__cta-arrow');
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
  var saved = localStorage.getItem('arec-lang');
  if (saved && saved !== 'ar') {
    setLanguage(saved);
  }
})();
