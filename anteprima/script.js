(function () {
  // ---------- Menu mobile ----------
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('menu-panel');

  if (toggle && panel) {
    var setMenu = function (open) {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      panel.setAttribute('aria-hidden', String(!open));
    };

    toggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Chiudi il menu passando da mobile a desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1100) setMenu(false);
    });
  }

  // ---------- Listino: apri la sezione indicata dal link ----------
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var acc = target.matches('details') ? target : target.querySelector('details');
    if (acc && !acc.open) {
      acc.open = true;
      target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // ---------- Galleria: lightbox ----------
  var lightbox = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));

  if (lightbox && items.length) {
    var lbImg = lightbox.querySelector('img');
    var lbCount = lightbox.querySelector('.lb-count');
    var current = 0;
    var lastFocus = null;

    var show = function (index) {
      current = (index + items.length) % items.length;
      var thumb = items[current].querySelector('img');
      lbImg.src = thumb.getAttribute('src');
      lbImg.alt = thumb.alt;
      lbCount.textContent = (current + 1) + ' / ' + items.length;
    };

    var openLightbox = function (index) {
      lastFocus = document.activeElement;
      show(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      lightbox.querySelector('.lb-close').focus();
    };

    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (item, index) {
      item.addEventListener('click', function () { openLightbox(index); });
    });

    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

    // Clic sullo sfondo per chiudere
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    // Swipe su mobile
    var startX = null;
    lightbox.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  }
})();
