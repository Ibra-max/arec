'use strict';

(function() {
  // Respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var isMobile = window.innerWidth <= 768;
  var pathCount = isMobile ? 18 : 36;

  function generatePaths(position) {
    return Array.from({ length: pathCount }, function(_, i) {
      return {
        id: i,
        d: 'M-' + (380 - i * 5 * position) + ' -' + (189 + i * 6) +
           'C-' + (380 - i * 5 * position) + ' -' + (189 + i * 6) +
           ' -' + (312 - i * 5 * position) + ' ' + (216 - i * 6) +
           ' ' + (152 - i * 5 * position) + ' ' + (343 - i * 6) +
           'C' + (616 - i * 5 * position) + ' ' + (470 - i * 6) +
           ' ' + (684 - i * 5 * position) + ' ' + (875 - i * 6) +
           ' ' + (684 - i * 5 * position) + ' ' + (875 - i * 6),
        strokeOpacity: 0.1 + i * 0.03,
        strokeWidth: 0.5 + i * 0.03
      };
    });
  }

  function createSVG(container, position) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 696 316');
    svg.setAttribute('fill', 'none');
    svg.classList.add('hero__paths-svg');

    var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'Background Paths';
    svg.appendChild(title);

    var paths = generatePaths(position);

    paths.forEach(function(p) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', p.strokeWidth);
      path.setAttribute('stroke-opacity', p.strokeOpacity);
      svg.appendChild(path);
    });

    container.appendChild(svg);

    // After DOM insertion, measure actual path lengths and apply animations
    requestAnimationFrame(function() {
      var pathElements = svg.querySelectorAll('path');
      pathElements.forEach(function(pathEl, index) {
        var totalLength = pathEl.getTotalLength();

        // Set up stroke-dasharray for flowing animation
        pathEl.style.strokeDasharray = totalLength;
        pathEl.style.strokeDashoffset = totalLength * 0.7;

        // Each path gets unique duration: 20 + random * 10
        var duration = 20 + Math.random() * 10;

        // CSS custom property for keyframe
        pathEl.style.setProperty('--path-length', totalLength);

        // Apply continuous flowing animation
        pathEl.style.animation = 
          'pathFlow ' + duration + 's linear infinite, ' +
          'pathOpacity ' + duration + 's ease-in-out infinite';
      });
    });
  }

  var leftContainer = document.querySelector('.hero__paths--left');
  var rightContainer = document.querySelector('.hero__paths--right');

  if (leftContainer) createSVG(leftContainer, 1);
  if (rightContainer) createSVG(rightContainer, -1);

  // Letter-by-letter title animation (initial load)
  var titleEl = document.querySelector('.hero__title');
  if (titleEl) {
    var text = titleEl.textContent;
    var arText = titleEl.getAttribute('data-ar');
    var enText = titleEl.getAttribute('data-en');
    var currentLang = document.documentElement.getAttribute('lang') || 'ar';

    titleEl.textContent = '';
    titleEl.style.opacity = '1';
    titleEl.style.transform = 'none';
    titleEl.classList.remove('hero-anim', 'hero-anim--title');

    // For Arabic: animate whole words to preserve ligatures
    if (currentLang === 'ar') {
      var words = text.trim().split(/\s+/);
      words.forEach(function(word, wordIndex) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'hero__word';
        wordSpan.textContent = word;
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(40px)';
        wordSpan.style.animation = 'letterReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        wordSpan.style.animationDelay = (wordIndex * 0.15) + 's';
        titleEl.appendChild(wordSpan);
      });
    } else {
      // For English: word-grouped letter animation
      var words = text.trim().split(/\s+/);
      words.forEach(function(word, wordIndex) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'hero__word';

        word.split('').forEach(function(letter, letterIndex) {
          var letterSpan = document.createElement('span');
          letterSpan.textContent = letter;
          letterSpan.className = 'hero__letter';
          letterSpan.style.animationDelay = (wordIndex * 0.1 + letterIndex * 0.03) + 's';
          wordSpan.appendChild(letterSpan);
        });

        titleEl.appendChild(wordSpan);
      });
    }

    // Store data for language switch rebuild
    titleEl.setAttribute('data-ar', arText);
    titleEl.setAttribute('data-en', enText);
  }
})();
