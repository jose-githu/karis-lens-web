/* ═══════════════════════════════
   KARIS LENS · script.js
   Cursor · Navbar · Filter · Reveal
═══════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;

// Only initialize custom cursor logic if elements exist (desktop safety)
if (cursor && cursorDot) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* Cursor interaction on hover */
  document.querySelectorAll('a, button, .photo-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.borderColor = 'rgba(201,168,76,0.6)';
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
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ── GALLERY FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('.photo-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    photoCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.style.display = 'block'; // Using display for cleaner filtering
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.section-header, .photo-card, .about-img-wrap, .about-text, .contact-grid, .testimonial-inner'
);

// Only run observer if there are elements to reveal
if (revealEls.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* ── CONTACT FORM HANDLING ── */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#4caf50'; // Success Green
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      this.reset();
    }, 3000);
  });
}
