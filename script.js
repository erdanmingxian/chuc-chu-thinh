/* ==========================================================
   20/11 Greeting Website for Anh Khal
   Theme: Impressionist Sunlit Forest & Soaring Light Birds
   Enhanced:
   - Always-on Auto Ambient Audio
   - Interactive mouse/touch stardust trails
   - Interactive radiant ripples on click/tap
   - 3D Card tilt interaction
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('natureCanvas');
  const ctx = canvas.getContext('2d');
  const letterCard = document.getElementById('letterCard');
  const audioIndicator = document.getElementById('audioIndicator');
  const audioStatusText = document.getElementById('audioStatusText');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* ----------------------------------------------------------
     1. CONTINUOUS & INTERACTIVE PARTICLES
  ----------------------------------------------------------- */
  const particles = [];
  const interactiveParticles = [];
  const ripples = [];
  const PARTICLE_COUNT = 45;

  class SunDust {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 2.8 + 1.2;
      this.vx = (Math.random() - 0.2) * 0.8;
      this.vy = -(Math.random() * 0.9 + 0.4);
      this.alpha = Math.random() * 0.7 + 0.2;
      this.maxAlpha = this.alpha;
      this.fadeSpeed = Math.random() * 0.006 + 0.003;
      this.fadingIn = true;
      this.hue = Math.random() * 25 + 42;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.fadingIn) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.fadingIn = false;
        }
      } else {
        this.alpha -= this.fadeSpeed;
        if (this.alpha <= 0.05) {
          this.reset();
        }
      }

      if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = `hsl(${this.hue}, 95%, 75%)`;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new SunDust());
  }

  // Interactive Cursor Sparkle
  class Stardust {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx || (Math.random() - 0.5) * 1.5;
      this.vy = vy || (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 3 + 1.5;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.color = Math.random() > 0.4 ? '#fff0be' : '#f6d365';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Interactive Click Ripple
  class LightRipple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 10;
      this.maxRadius = 140;
      this.alpha = 0.8;
    }

    update() {
      this.radius += 3.2;
      this.alpha -= 0.02;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.strokeStyle = '#fff0be';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#f6d365';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ----------------------------------------------------------
     2. GLOWING BIRDS OF LIGHT
  ----------------------------------------------------------- */
  const birds = [];
  const birdTrails = [];

  class LightBird {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = -80;
      this.y = Math.random() * (canvas.height * 0.6) + 40;
      this.speed = Math.random() * 1.5 + 1.8;
      this.scale = Math.random() * 0.35 + 0.65;
      this.wingAngle = 0;
      this.wingSpeed = Math.random() * 0.08 + 0.09;
      this.angle = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.3 + 0.7;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.wingAngle += this.wingSpeed;

      if (Math.random() < 0.65) {
        birdTrails.push({
          x: this.x - 10,
          y: this.y + (Math.random() * 6 - 3),
          size: Math.random() * 2.5 + 1,
          alpha: 0.8,
          color: Math.random() > 0.5 ? '#ffffff' : '#ffe885'
        });
      }

      if (this.x > canvas.width + 100 || this.y < -50 || this.y > canvas.height + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(this.scale, this.scale);

      const wingY = Math.sin(this.wingAngle) * 14;

      ctx.shadowColor = '#fff6bd';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#ffffff';

      ctx.beginPath();
      ctx.ellipse(8, 0, 11, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Top wing
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(6, -18 + wingY, 18, -12 + wingY);
      ctx.quadraticCurveTo(4, -4, -2, 0);
      ctx.fill();

      // Bottom wing
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.quadraticCurveTo(4, 16 - wingY, 16, 10 - wingY);
      ctx.quadraticCurveTo(2, 4, -4, 0);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-20, -5);
      ctx.lineTo(-17, 0);
      ctx.lineTo(-20, 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < 3; i++) {
    const bird = new LightBird();
    bird.x = Math.random() * canvas.width * 0.8;
    birds.push(bird);
  }

  /* ----------------------------------------------------------
     3. RENDER LOOP
  ----------------------------------------------------------- */
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sun dust
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Bird trails
    for (let i = birdTrails.length - 1; i >= 0; i--) {
      const t = birdTrails[i];
      t.alpha -= 0.015;
      t.x -= 0.4;
      if (t.alpha <= 0) {
        birdTrails.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Birds
    birds.forEach(bird => {
      bird.update();
      bird.draw();
    });

    // Interactive Stardust
    for (let i = interactiveParticles.length - 1; i >= 0; i--) {
      const sp = interactiveParticles[i];
      sp.update();
      sp.draw();
      if (sp.alpha <= 0) {
        interactiveParticles.splice(i, 1);
      }
    }

    // Interactive Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.update();
      rp.draw();
      if (rp.alpha <= 0) {
        ripples.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }
  render();

  /* ----------------------------------------------------------
     4. USER INTERACTION: MOUSE & TOUCH MAGIC
  ----------------------------------------------------------- */
  let lastX = 0, lastY = 0;

  function spawnStardust(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      interactiveParticles.push(new Stardust(x, y));
    }
  }

  window.addEventListener('mousemove', (e) => {
    spawnStardust(e.clientX, e.clientY, 1);

    // 3D Card Tilt
    if (letterCard && window.innerWidth > 768) {
      const rect = letterCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotateY = deltaX * 5.5;
      const rotateX = -deltaY * 5.5;

      letterCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  window.addEventListener('mouseleave', () => {
    if (letterCard) {
      letterCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      spawnStardust(t.clientX, t.clientY, 2);
    }
  }, { passive: true });

  window.addEventListener('click', (e) => {
    ripples.push(new LightRipple(e.clientX, e.clientY));
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 1.2;
      interactiveParticles.push(new Stardust(
        e.clientX,
        e.clientY,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
      ));
    }
    ensureAudio();
  });

  /* ----------------------------------------------------------
     5. ALWAYS-ON AUDIO (AUTO-START & RESILIENT LOOP)
  ----------------------------------------------------------- */
  let audioCtx = null;
  let isPlayingAudio = false;
  let melodyInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const pentatonicNotes = [
    293.66, // D4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    554.37, // C#5
    659.25, // E5
    739.99, // F#5
    880.00  // A5
  ];

  function playAmbientNote(freq, time) {
    if (!audioCtx || !isPlayingAudio) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.06, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 3.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 3.3);
  }

  function playNextArpeggio() {
    if (!isPlayingAudio || !audioCtx) return;
    const now = audioCtx.currentTime;

    const count = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const note = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
      playAmbientNote(note, now + i * 0.35);
    }
  }

  function startAudioEngine() {
    initAudio();
    if (!isPlayingAudio) {
      isPlayingAudio = true;
      playNextArpeggio();
      if (!melodyInterval) {
        melodyInterval = setInterval(playNextArpeggio, 3600);
      }
      if (audioStatusText) audioStatusText.textContent = 'Giai điệu đang phát';
      if (audioIndicator) audioIndicator.style.opacity = '1';
    }
  }

  function ensureAudio() {
    startAudioEngine();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Auto-start listeners on any interaction
  ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach(evt => {
    window.addEventListener(evt, ensureAudio, { once: true, passive: true });
  });

  // Try immediate autoplay
  try {
    startAudioEngine();
  } catch (e) {}

  // Toggle button for user preference
  audioIndicator.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      isPlayingAudio = false;
      clearInterval(melodyInterval);
      melodyInterval = null;
      audioStatusText.textContent = 'Đã tạm dừng';
      audioIndicator.style.opacity = '0.6';
    } else {
      startAudioEngine();
    }
  });

});
