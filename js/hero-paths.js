'use strict';

(function() {
  const isMobile = window.innerWidth <= 768;
  const pathCount = isMobile ? 18 : 36;

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
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 696 316');
    svg.setAttribute('fill', 'none');
    svg.style.width = '100%';
    svg.style.height = '100%';

    const paths = generatePaths(position);
    paths.forEach(function(p) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('stroke', 'white');
      path.setAttribute('stroke-opacity', p.strokeOpacity);
      path.setAttribute('stroke-width', p.strokeWidth);

      // Dash animation
      const len = 2000;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.style.animation = 'pathDraw ' + (3 + p.id * 0.08) + 's ease forwards ' + (p.id * 0.1) + 's, pathPulse ' + (4 + p.id * 0.05) + 's ease-in-out infinite ' + (3 + p.id * 0.1) + 's';
      path.style.willChange = 'stroke-dashoffset, opacity';

      svg.appendChild(path);
    });

    container.appendChild(svg);
  }

  // Check reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const leftContainer = document.querySelector('.hero__paths--left');
  const rightContainer = document.querySelector('.hero__paths--right');

  if (leftContainer) createSVG(leftContainer, 1);
  if (rightContainer) createSVG(rightContainer, -1);

  // Letter-by-letter title animation
  const title = document.querySelector('.hero__title');
  if (title) {
    const text = title.textContent;
    const arText = title.getAttribute('data-ar');
    const enText = title.getAttribute('data-en');
    title.textContent = '';
    title.style.opacity = '1';
    title.style.transform = 'none';
    title.classList.remove('hero-anim', 'hero-anim--title');

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.className = 'hero__letter';
      span.style.animationDelay = (0.3 + i * 0.04) + 's';
      title.appendChild(span);
    }

    // Store data for language switch rebuild
    title.setAttribute('data-ar', arText);
    title.setAttribute('data-en', enText);
  }
})();
