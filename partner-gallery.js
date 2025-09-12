// partner-gallery.js
// Infinite automatic horizontal scrolling for each logo's gallery row with smooth looping

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.partner-gallery-scroll').forEach(function(row) {
    // Clone images for seamless infinite scroll
    const imgs = Array.from(row.children);
    imgs.forEach(img => {
      const clone = img.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      row.appendChild(clone);
    });
    let scrollAmount = 1;
    let running = true;
    function smoothScroll() {
      if (!running) return;
      row.scrollLeft += scrollAmount;
      // When reaching the end of the first set, jump back instantly to the equivalent position
      if (row.scrollLeft >= row.scrollWidth / 2) {
        row.scrollLeft = row.scrollLeft - row.scrollWidth / 2;
      }
      requestAnimationFrame(smoothScroll);
    }
    requestAnimationFrame(smoothScroll);
    // Pause on hover/touch
    row.addEventListener('mouseenter', () => { running = false; });
    row.addEventListener('mouseleave', () => {
      if (!running) {
        running = true;
        requestAnimationFrame(smoothScroll);
      }
    });
    row.addEventListener('touchstart', () => { running = false; });
    row.addEventListener('touchend', () => {
      if (!running) {
        running = true;
        requestAnimationFrame(smoothScroll);
      }
    });
  });
});
