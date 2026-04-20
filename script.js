/* ═══════════════════════════════════════════════
   KARIS LENS · script.js
   Three-Fold Architecture · Full Interaction Logic
   Author: Flynn Technologies
   Contact: +254 794 891 348
═══════════════════════════════════════════════ */

/* ── CUSTOM CURSOR (desktop only) ── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot && window.innerWidth >= 1024) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.1;
    curY += (mouseY - curY) * 0.1;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* Scale on interactive elements */
  document.querySelectorAll('a, button, .photo-card, .cat-btn, .channel-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.borderColor = 'rgba(201,168,76,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = '#c9a84c';
    });
  });
}

/* ── STICKY NAVBAR ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER / MOBILE DRAWER ── */
const hamburger    = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

if (hamburger && mobileDrawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
  });

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileDrawer.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    }
  });
}

/* ── HERO PARALLAX ── */
const heroBgImg = document.getElementById('parallaxHero');

if (heroBgImg) {
  // Trigger hero zoom-in animation on load
  heroBgImg.addEventListener('load', () => heroBgImg.classList.add('loaded'));
  // If already cached
  if (heroBgImg.complete) heroBgImg.classList.add('loaded');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBgImg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
}

/* ── GALLERY FILTER ── */
const catBtns    = document.querySelectorAll('.cat-btn');
const photoCards = document.querySelectorAll('.photo-card');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    photoCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;

      if (match) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        const idx = [...photoCards].indexOf(card);
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, idx * 60);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ── SCROLL REVEAL (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade');

if (revealEls.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ── CONTACT FORM — Live WhatsApp to +254794891348 ── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

const KARIS_WA_NUMBER = '254794891348';

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = '✓ Message Received!';
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '#3d9e5e';
      submitBtn.style.borderColor = '#3d9e5e';
      submitBtn.style.color = '#fff';

      // Build WhatsApp message from form data
      const name    = document.getElementById('fname')?.value || '';
      const phone   = document.getElementById('fphone')?.value || '';
      const email   = document.getElementById('femail')?.value || '';
      const type    = document.getElementById('ftype')?.value || '';
      const message = document.getElementById('fmsg')?.value  || '';

      const waText = encodeURIComponent(
        `Hello Karis Lens! 📸\n\n*Name:* ${name}\n*Session:* ${type}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Message:*\n${message}\n\n_Sent via karislens.co.ke_`
      );

      // Open WhatsApp with pre-filled message directed to live number
      const waLink = `https://wa.me/${KARIS_WA_NUMBER}?text=${waText}`;
      window.open(waLink, '_blank', 'noopener,noreferrer');

      // Reset after delay
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 4000);

    }, 1200);
  });
}

/* ── FLOATING WHATSAPP FAB — pulse & visibility ── */
const fab = document.querySelector('.whatsapp-fab');

if (fab) {
  // Show FAB after scrolling past the hero
  const heroStage = document.querySelector('.hero-stage');

  function updateFabVisibility() {
    if (!heroStage) { fab.classList.add('fab-visible'); return; }
    const heroBottom = heroStage.getBoundingClientRect().bottom;
    fab.classList.toggle('fab-visible', heroBottom < 0);
  }

  window.addEventListener('scroll', updateFabVisibility, { passive: true });
  updateFabVisibility();
}

/* ── SMOOTH NAV SCROLL (offset for fixed navbar) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navbarH = navbar ? navbar.offsetHeight : 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navbarH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
