'use strict';

// Main entry — all modules are loaded via individual script tags with defer.
// This file serves as a final initialization point.

(function() {
  // Contact form validation
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const email = form.querySelector('#email');
      const name = form.querySelector('#name');
      const message = form.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(function(field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      // Email format check
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e53e3e';
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
})();
