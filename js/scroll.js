'use strict';

(function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  // Observe all scroll-reveal and scroll-reveal-stagger elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger').forEach(function(el) {
    observer.observe(el);
  });
})();
