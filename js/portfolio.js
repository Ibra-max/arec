'use strict';

(function() {
  const tabs = document.querySelectorAll('.portfolio__tab');
  const items = document.querySelectorAll('.portfolio__item');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Update active tab
      tabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Filter items
      items.forEach(function(item) {
        if (item.getAttribute('data-category') === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();
