(function () {
  // Sombra del header al hacer scroll
  var header = document.querySelector('.site-header');
  addEventListener('scroll', function () { header.classList.toggle('scrolled', scrollY > 8); }, { passive: true });

  // Menú móvil
  var drawer = document.getElementById('drawer');
  var openBtn = document.querySelector('.nav .burger');
  function setDrawer(open) {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  openBtn.addEventListener('click', function () { setDrawer(true); });
  drawer.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', function () { setDrawer(false); }); });
  drawer.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

  // Aparición al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Carruseles horizontales
  document.querySelectorAll('[data-scroller]').forEach(function (s) {
    var track = s.querySelector('.track');
    s.querySelector('[data-prev]').addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }); });
    s.querySelector('[data-next]').addEventListener('click', function () { track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }); });
  });

  // Sub-navegación de páginas internas: resalta la sección que se está leyendo
  var bar = document.querySelector('.subnav ul');
  if (bar && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(bar.querySelectorAll('a'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var mark = function (id) {
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      var a = byId[id];
      if (!a) return;
      a.setAttribute('aria-current', 'true');
      var left = a.offsetLeft - 16, right = a.offsetLeft + a.offsetWidth + 16;
      if (left < bar.scrollLeft || right > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: left, behavior: 'smooth' });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    var hero = document.querySelector('.page-hero');
    if (hero) spy.observe(hero);
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // Carruseles con fondos en movimiento: cambian solos cada 7 s; puntos, flechas y botón de pausa
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var slides = slider.querySelectorAll('.slide');
    var dots = slider.querySelectorAll('[data-dot]');
    if (slides.length < 2) return;
    var current = 0, timer = null;
    var paused = false;
    var toggle = slider.querySelector('[data-toggle]');
    function show(n) {
      current = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === current;
        s.classList.toggle('active', on);
        if (on) s.removeAttribute('inert'); else s.setAttribute('inert', '');
      });
      dots.forEach(function (d, k) {
        if (k === current) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function play() { clearInterval(timer); if (!paused) timer = setInterval(function () { show(current + 1); }, 7000); }
    function pause() { clearInterval(timer); }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); play(); }); });
    var prev = slider.querySelector('[data-prev]'), next = slider.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { show(current - 1); play(); });
    if (next) next.addEventListener('click', function () { show(current + 1); play(); });
    if (toggle) toggle.addEventListener('click', function () {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', paused ? 'Reanudar el carrusel' : 'Pausar el carrusel');
      if (paused) pause(); else play();
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else play(); });
    show(0);
    play();
  });

  // Visor de fotos: cada [data-gallery] abre sus fotos en grande en el [data-lightbox] de la página
  var box = document.querySelector('[data-lightbox]');
  if (box && box.showModal) {
    var lbImg = box.querySelector('img'), lbCap = box.querySelector('figcaption'), list = [], at = 0;
    var showPhoto = function (n) {
      at = (n + list.length) % list.length;
      var it = list[at], label = it.querySelector('span');
      lbImg.src = it.getAttribute('data-full');
      lbImg.alt = it.querySelector('img').alt;
      lbCap.textContent = label ? label.textContent : '';
    };
    document.querySelectorAll('[data-gallery]').forEach(function (g) {
      var items = Array.prototype.slice.call(g.querySelectorAll('[data-full]'));
      items.forEach(function (it, k) {
        it.addEventListener('click', function () { list = items; showPhoto(k); box.showModal(); });
      });
    });
    box.querySelector('[data-lb-close]').addEventListener('click', function () { box.close(); });
    box.querySelector('[data-lb-prev]').addEventListener('click', function () { showPhoto(at - 1); });
    box.querySelector('[data-lb-next]').addEventListener('click', function () { showPhoto(at + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showPhoto(at - 1);
      if (e.key === 'ArrowRight') showPhoto(at + 1);
    });
  }
})();
