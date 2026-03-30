'use strict';

(function() {
  let counted = false;

  function animateCounter(el, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(start + (target - start) * easedProgress);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const featuredSection = document.getElementById('featured');
  if (!featuredSection) return;

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        const counters = featuredSection.querySelectorAll('.featured__counter-num');
        counters.forEach(function(counter) {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          animateCounter(counter, target, 2000);
        });
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(featuredSection);
})();
