'use strict';

(function () {
  // Duplicate track contents for seamless infinite scroll
  document.querySelectorAll('.clients__marquee').forEach(function (marquee) {
    var track = marquee.querySelector('.clients__track');
    if (!track) return;

    // Clone all children and append for seamless loop
    var items = Array.from(track.children);
    items.forEach(function (item) {
      var clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  });
})();
