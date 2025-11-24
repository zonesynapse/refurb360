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
  
  // Also enable infinite scroll for main gallery containers (.gallery-scroll-container)
  // Uses continuous RAF loop with modulo wrapping to avoid any pause on wrap
  document.querySelectorAll('.gallery-scroll-container').forEach(function(container) {
    const track = container.querySelector('.gallery-scroll-track');
    if (!track) return;

    // Clone gallery items for seamless loop (runtime clone keeps HTML unchanged)
    const items = Array.from(track.children);
    items.forEach(it => {
      const clone = it.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Continuous RAF loop that keeps running; only skip scroll when paused
    let scrollAmount = 1;
    let running = true;

    function smoothScroll() {
      // RAF loop runs continuously; only update scroll if running is true
      if (running) {
        container.scrollLeft += scrollAmount;
        const half = track.scrollWidth / 2 || 1;
        // Use modulo to wrap seamlessly without visible pause
        if (container.scrollLeft >= half) {
          container.scrollLeft = container.scrollLeft % half;
        }
      }
      requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);

    // Pause on hover/touch, but RAF loop stays active for immediate resume
    container.addEventListener('mouseenter', () => { running = false; });
    container.addEventListener('mouseleave', () => { running = true; });
    container.addEventListener('touchstart', () => { running = false; }, {passive: true});
    container.addEventListener('touchend', () => { running = true; }, {passive: true});
  });
});
