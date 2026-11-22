/* ===== ZARANA shared script ===== */
(function () {
  'use strict';

  const WA_NUMBER = '966535692256'; // 0535692256 -> 966...

  // ---------- Mobile nav ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // ---------- Active nav link ----------
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // ---------- WhatsApp links ----------
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const msg = el.getAttribute('data-wa') || 'مرحباً، أود الاستفسار';
    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    if (el.tagName === 'A') el.href = url;
    else el.addEventListener('click', () => window.open(url, '_blank'));
  });

  // ---------- Floating WhatsApp tooltip ----------
  const floatBtn = document.querySelector('.wa-float');
  if (floatBtn) {
    floatBtn.setAttribute('href', 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('مرحباً، أود التواصل مع مركز زارانا'));
    floatBtn.setAttribute('target', '_blank');
    floatBtn.setAttribute('rel', 'noopener');
  }

  // ---------- Contact form -> WhatsApp ----------
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const phone = fd.get('phone') || '';
      const service = fd.get('service') || '';
      const msg = fd.get('message') || '';
      const text =
        'مرحباً مركز زارانا،\n' +
        'الاسم: ' + name + '\n' +
        'الجوال: ' + phone + '\n' +
        'الخدمة: ' + service + '\n' +
        'الرسالة: ' + msg;
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  // ---------- Gallery lightbox ----------
  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lb-close');
    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    const close = () => lightbox.classList.remove('open');
    if (lbClose) lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // ---------- Testimonial slider controls ----------
  const track = document.querySelector('.testi-track');
  const prev = document.querySelector('.testi-prev');
  const next = document.querySelector('.testi-next');
  if (track && (prev || next)) {
    const step = 340;
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step, behavior: 'smooth' }));
  }

  // ---------- Counter animation ----------
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    let done = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done) {
          done = true;
          let cur = 0;
          const dur = 1200;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            cur = Math.floor(target * (1 - Math.pow(1 - t, 3)));
            el.textContent = cur.toLocaleString('ar-SA');
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString('ar-SA');
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
})();