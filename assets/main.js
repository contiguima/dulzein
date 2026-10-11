/* Dulzein Bio: scroll-driven "mini game" interactions. No dependencies. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- Reveal on scroll + counters ---------- */
  const counters = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      if (e.target.hasAttribute('data-count')) countUp(e.target);
      io.unobserve(e.target);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal], [data-count]').forEach((el) => io.observe(el));

  function countUp(el) {
    if (counters.has(el) || reduce) return;
    counters.add(el);
    const to = parseFloat(el.dataset.count);
    const from = parseFloat(el.dataset.from || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const sep = el.dataset.sep || ',';
    const fmt = (n) => {
      const [i, d] = n.toFixed(dec).split('.');
      const int = i.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      return d ? int + (sep === '.' ? ',' : '.') + d : int;
    };
    const t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const k = clamp((t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(from + (to - from) * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Scroll progress (--p) + HUD ---------- */
  const scrollEls = [...document.querySelectorAll('[data-scroll]')];
  const levels = [...document.querySelectorAll('[data-level]')];
  const hud = document.querySelector('.hud');
  const hudName = hud && hud.querySelector('.hud-name');
  const hudNum = hud && hud.querySelector('.hud-num');
  const bar = document.querySelector('.progress span');
  let lastLevel = -1, lastY = scrollY, velocity = 0, ticking = false;

  function onScroll() {
    const vh = innerHeight;
    const y = scrollY;
    velocity = clamp(Math.abs(y - lastY) / 40, 0, 3);
    lastY = y;
    const max = root.scrollHeight - vh;
    root.style.setProperty('--sy', (max > 0 ? y / max : 0).toFixed(4));
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    for (const el of scrollEls) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      let p;
      if (el.dataset.scroll === 'track') p = (vh * 0.7 - r.top) / r.height;
      else p = (vh - r.top) / (vh + r.height);
      el.style.setProperty('--p', clamp(p).toFixed(4));
      // Roadmap: unlock each stage as the player reaches it
      const stages = el.querySelectorAll('.stage');
      stages.forEach((s, i) => s.classList.toggle('on', clamp(p) >= i / stages.length + 0.04));
    }

    if (hud) {
      let idx = -1;
      levels.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.55) idx = i; });
      hud.classList.toggle('show', idx >= 0);
      if (idx >= 0 && idx !== lastLevel) {
        const s = levels[idx];
        hudName.textContent = s.dataset.level;
        hudNum.textContent = `${idx + 1}/${levels.length}`;
        if (lastLevel >= 0 && idx > lastLevel && !reduce) {
          hud.classList.remove('up'); void hud.offsetWidth; hud.classList.add('up');
        }
        lastLevel = idx;
      }
    }
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Brazzein molecule: 54 spheres, one per amino acid ---------- */
  const PTS = [[-0.495,-0.068,0.146],[0.054,-0.399,-0.528],[-0.857,-0.696,-0.512],[-1.699,-0.349,-0.322],[-2.004,0.026,0.477],[-1.297,-0.555,0.87],[-1.065,-0.457,1.73],[-1.894,-0.705,1.801],[-2.693,-0.904,1.714],[-1.788,-1.195,1.182],[-1.845,-0.97,0.203],[-1.816,-1.542,-0.477],[-2.007,-2.319,-0.532],[-2.113,-2.277,0.414],[-1.075,-2.028,0.367],[-0.329,-2.443,0.1],[0.341,-2.195,0.73],[0.881,-2.361,1.327],[0.537,-1.346,0.974],[1.333,-0.922,0.927],[1.321,0.058,0.803],[1.386,0.351,1.616],[0.37,0.342,1.227],[0.029,1.094,0.731],[-0.563,1.313,0.007],[-1.177,1.91,-0.011],[-0.371,2.307,0.068],[-0.772,2.763,0.642],[-0.105,2.259,1.201],[0.395,1.963,0.373],[0.517,2.404,-0.344],[-0.135,2.007,-1.001],[0.112,1.093,-1.368],[0.866,1.491,-1.225],[0.76,1.261,-2.051],[0.172,0.648,-2.484],[0.76,-0.08,-2.357],[-0.258,-0.1,-2.191],[-0.75,0.069,-1.246],[0.089,0.36,-0.833],[0.824,-0.022,-1.137],[1.075,0.439,-0.318],[1.348,1.109,0.183],[1.349,1.912,-0.072],[1.218,1.711,0.871],[2.005,1.403,0.732],[2.119,0.428,0.548],[2.31,-0.408,0.231],[1.816,-0.136,-0.621],[1.446,-0.996,-0.838],[1.426,-1.343,0.056],[0.616,-1.377,-0.565],[-0.33,-1.217,-0.189],[-0.038,-1.312,-1.027]];
  const COLORS = [[232, 107, 192], [92, 200, 232], [217, 227, 90], [59, 224, 141]];
  const colorOf = (i) => COLORS[Math.min(3, Math.floor(i / 13.5))];
  const mix = (c, k) => `rgb(${c.map((v) => Math.round(v + (k > 0 ? (255 - v) * k : v * k))).join(',')})`;

  class Molecule {
    constructor(canvas) {
      this.c = canvas; this.ctx = canvas.getContext('2d');
      this.ry = parseFloat(canvas.dataset.start || '0.6'); this.rx = 0.35;
      this.tx = 0; this.ty = 0; this.visible = false;
      this.resize();
      new ResizeObserver(() => this.resize()).observe(canvas);
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; }).observe(canvas);
      if (canvas.dataset.tilt !== undefined && matchMedia('(pointer: fine)').matches) {
        addEventListener('pointermove', (e) => {
          this.tx = (e.clientY / innerHeight - 0.5) * 0.8;
          this.ty = (e.clientX / innerWidth - 0.5) * 0.8;
        }, { passive: true });
      }
    }
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const { width, height } = this.c.getBoundingClientRect();
      this.w = width; this.h = height;
      this.c.width = Math.round(width * dpr); this.c.height = Math.round(height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.draw();
    }
    draw() {
      const { ctx, w, h } = this;
      if (!w) return;
      ctx.clearRect(0, 0, w, h);
      const s = Math.min(w, h) / 7.6, cx = w / 2, cy = h / 2;
      const ay = this.ry + this.ty, ax = this.rx + this.tx;
      const cyA = Math.cos(ay), syA = Math.sin(ay), cxA = Math.cos(ax), sxA = Math.sin(ax);
      const proj = PTS.map(([x, y, z], i) => {
        const x1 = x * cyA + z * syA, z1 = -x * syA + z * cyA;
        const y1 = y * cxA - z1 * sxA, z2 = y * sxA + z1 * cxA;
        const f = 9 / (9 + z2);
        return { x: cx + x1 * s * f, y: cy + y1 * s * f, z: z2, r: s * 0.52 * f, i };
      });
      // backbone
      ctx.lineWidth = Math.max(1, s * 0.08);
      ctx.strokeStyle = 'rgba(157,178,166,0.25)';
      ctx.beginPath();
      proj.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
      proj.sort((a, b) => b.z - a.z);
      for (const p of proj) {
        const c = colorOf(p.i);
        const depth = clamp((p.z + 3.4) / 6.8); // 0 = front, 1 = back
        const g = ctx.createRadialGradient(p.x - p.r * 0.35, p.y - p.r * 0.4, p.r * 0.1, p.x, p.y, p.r);
        g.addColorStop(0, mix(c, 0.55 - depth * 0.4));
        g.addColorStop(0.55, mix(c, -depth * 0.45));
        g.addColorStop(1, mix(c, -0.55 - depth * 0.3));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    tick(dt) {
      if (!this.visible) return;
      this.ry += dt * (0.00025 + velocity * 0.0009);
      this.draw();
    }
  }

  const mols = [...document.querySelectorAll('canvas.molecule')].map((c) => new Molecule(c));
  if (!reduce && mols.length) {
    let t = performance.now();
    const loop = (now) => {
      const dt = Math.min(64, now - t); t = now;
      velocity *= 0.94;
      mols.forEach((m) => m.tick(dt));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
