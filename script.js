/* ═══════════════════════════════════════════════════════
   BATMAN PORTFOLIO — JAGADEESH PADAM
   Dark Knight of Code
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── GOTHAM RAIN CANVAS ─────────────────────────────── */
  const canvas = document.getElementById('batCanvas');
  const ctx    = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const DROPS_COUNT = Math.floor(W / 18);
  const drops = Array.from({ length: DROPS_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    len:   12 + Math.random() * 18,
    speed: 4  + Math.random() * 8,
    alpha: 0.1 + Math.random() * 0.25,
    width: 0.5 + Math.random() * 0.8,
  }));

  function drawRain() {
    ctx.clearRect(0, 0, W, H);
    drops.forEach(d => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(240, 197, 0, ${d.alpha})`;
      ctx.lineWidth   = d.width;
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1, d.y + d.len);
      ctx.stroke();
      d.y += d.speed;
      if (d.y > H + 40) {
        d.y = -d.len;
        d.x = Math.random() * W;
      }
    });
    requestAnimationFrame(drawRain);
  }
  drawRain();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });


  /* ── TYPED.JS HERO ──────────────────────────────────── */
  if (window.Typed && document.querySelector('.typing-hero')) {
    new Typed('.typing-hero', {
      strings: [
        'Production RAG Pipelines',
        'AI-Driven Backends',
        'Scalable Microservices',
        'Semantic Search Engines',
        'Privacy-First Systems',
      ],
      typeSpeed:  55,
      backSpeed:  30,
      backDelay:  1800,
      startDelay: 600,
      loop:       true,
    });
  }


  /* ── NAVBAR STICKY ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('sticky', window.scrollY > 30);
  });


  /* ── HAMBURGER MENU ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    });
  });


  /* ── SCROLL UP BUTTON ───────────────────────────────── */
  const scrollBtn = document.getElementById('scrollUpBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 500);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── CUSTOM BAT CURSOR (mouse/desktop only) ─────────── */
  const isTouch = window.matchMedia('(hover: none)').matches;
  const cursor  = document.getElementById('batCursor');
  if (!isTouch && cursor) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function animateCursor() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .proj-card, .ach-card, .skill-pills span').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }


  /* ── SCROLL REVEAL ──────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el, i) => {
    el.dataset.delay = i % 6;
    revealObserver.observe(el);
  });


  /* ── COUNTER ANIMATION ──────────────────────────────── */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1800;
        const start  = performance.now();

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / dur, 1);
          const ease     = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.floor(ease * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(c => counterObserver.observe(c));


  /* ── NAV ACTIVE LINK ON SCROLL ──────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');
  const activeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach(s => activeObserver.observe(s));


  /* ── HERO FLOATING PARTICLES ────────────────────────── */
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;
        width:${2 + Math.random()*3}px;
        height:${2 + Math.random()*3}px;
        background:rgba(240,197,0,${0.2 + Math.random()*0.4});
        border-radius:50%;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        animation: floatPar ${4 + Math.random()*5}s ease-in-out infinite;
        animation-delay:${Math.random()*4}s;
      `;
      heroParticles.appendChild(p);
    }
  }

  /* inject float keyframe */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatPar {
      0%,100% { transform: translateY(0) translateX(0); opacity:0.3; }
      25%      { transform: translateY(-20px) translateX(10px); opacity:0.8; }
      50%      { transform: translateY(-35px) translateX(-8px); opacity:0.5; }
      75%      { transform: translateY(-15px) translateX(12px); opacity:0.7; }
    }
    .nav-link.active { color: var(--yellow) !important; }
    .nav-link.active::after { width: 60%; }
  `;
  document.head.appendChild(style);


  /* ── PROJ CARD MOUSE GLOW (mouse only) ─────────────── */
  if (!isTouch) {
    document.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.proj-glow');
        if (glow) {
          glow.style.background =
            `radial-gradient(circle at ${x}px ${y}px, rgba(240,197,0,0.07), transparent 55%)`;
        }
      });
    });
  }


  /* ── ACHIEVEMENT CARD 3D TILT (mouse only) ──────────── */
  if (!isTouch) document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── SECTION TITLE REVEAL ───────────────────────────── */
  document.querySelectorAll('.section-title').forEach(title => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          title.style.animation = 'titleReveal 0.8s ease forwards';
          observer.unobserve(title);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(title);
  });

  const titleStyle = document.createElement('style');
  titleStyle.textContent = `
    @keyframes titleReveal {
      from { opacity:0; letter-spacing:20px; }
      to   { opacity:1; letter-spacing:6px; }
    }
    .section-title { opacity:0; }
    .section-title.light { opacity:0; }
  `;
  document.head.appendChild(titleStyle);


  /* ── SKILL PILLS STAGGER ────────────────────────────── */
  document.querySelectorAll('.skill-cat').forEach(cat => {
    const pills = cat.querySelectorAll('.skill-pills span');
    const catObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pills.forEach((pill, i) => {
            pill.style.transition = `all 0.3s ease ${i * 50}ms`;
          });
          catObserver.unobserve(cat);
        }
      });
    }, { threshold: 0.3 });
    catObserver.observe(cat);
  });


  /* ── SMOOTH LINK SCROLL ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── NAVBAR LOGO MINI BAT PULSE ─────────────────────── */
  const navBat = document.querySelector('.nav-bat');
  if (navBat) {
    setInterval(() => {
      navBat.style.filter = 'drop-shadow(0 0 8px rgba(240,197,0,0.8))';
      setTimeout(() => {
        navBat.style.filter = '';
      }, 300);
    }, 4000);
  }

});
