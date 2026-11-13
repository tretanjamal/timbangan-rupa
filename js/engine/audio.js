/* Suara: efek disintesis WebAudio (kertas, gunting, ting, derit kayu), musik mp3 dengan ducking. */
var Suara = (function () {
  var ctx = null, master = null, musik = null, mulai = false, nyala = true, volMusik = 0.28, duckSampai = 0;

  function siap() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
      } catch (e) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(function () {});
    return ctx;
  }

  function nada(f, durasi, opsi) {
    if (!nyala || !siap()) return;
    opsi = opsi || {};
    var t = ctx.currentTime + (opsi.tunda || 0), o = ctx.createOscillator(), g = ctx.createGain();
    o.type = opsi.tipe || 'sine';
    o.frequency.setValueAtTime(f, t);
    if (opsi.ke) o.frequency.exponentialRampToValueAtTime(opsi.ke, t + durasi);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(opsi.vol || 0.15, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durasi);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + durasi + 0.02);
    // nada kedua (oktaf) memberi warna seperti kolintang kayu
    if (opsi.kayu) {
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = 'sine'; o2.frequency.setValueAtTime(f * 4, t);
      g2.gain.setValueAtTime(0.0001, t); g2.gain.exponentialRampToValueAtTime((opsi.vol || 0.15) * 0.3, t + 0.005);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + durasi * 0.35);
      o2.connect(g2); g2.connect(master); o2.start(t); o2.stop(t + durasi);
    }
  }

  function desis(durasi, frek, vol, q) {
    if (!nyala || !siap()) return;
    var n = Math.floor(ctx.sampleRate * durasi), B = ctx.createBuffer(1, n, ctx.sampleRate), d = B.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = B; f.type = 'bandpass'; f.frequency.value = frek; f.Q.value = q || 1; g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(master); s.start();
  }

  function duck(ms) {
    if (!musik) return;
    if (!ms) { duckSampai = 0; musik.volume = volMusik; return; }
    duckSampai = performance.now() + ms;
    musik.volume = volMusik * 0.35;
    setTimeout(function () { if (performance.now() >= duckSampai && musik) musik.volume = volMusik; }, ms + 30);
  }

  var api = {
    siap: siap,
    klik: function () { nada(660, 0.07, { tipe: 'triangle', vol: 0.08, ke: 520 }); },
    kertas: function () { desis(0.18, 1500, 0.22, 0.8); },
    gunting: function () { desis(0.06, 4200, 0.25, 2); setTimeout(function () { desis(0.06, 3800, 0.22, 2); }, 90); },
    ting: function (f) { nada(f || 880, 0.55, { vol: 0.14, kayu: true }); },
    derit: function () { nada(120, 0.32, { tipe: 'sawtooth', vol: 0.025, ke: 80 }); },
    lembut: function () { nada(392, 0.18, { tipe: 'triangle', vol: 0.08 }); nada(330, 0.26, { tipe: 'triangle', vol: 0.07, tunda: 0.12 }); },
    benar: function () { duck(900); [523, 659, 784].forEach(function (f, i) { nada(f, 0.35, { vol: 0.12, kayu: true, tunda: i * 0.09 }); }); },
    seimbang: function () { nada(988, 0.6, { vol: 0.12, kayu: true }); nada(1319, 0.7, { vol: 0.08, tunda: 0.08 }); },
    bintang: function (i) { duck(700); nada([659, 784, 988][i % 3], 0.5, { vol: 0.14, kayu: true }); },
    meriah: function () { duck(1500); [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { nada(f, 0.3, { vol: 0.11, kayu: true, tunda: i * 0.1 }); }); },
    musikMulai: function () {
      mulai = true;
      if (!musik) { try { musik = new Audio(ASET.musik); musik.loop = true; musik.volume = volMusik; } catch (e) { musik = null; } }
      if (musik && Pengaturan.musik && !document.hidden) musik.play().catch(function () {});
    },
    musikAtur: function () {
      if (!musik) return;
      if (Pengaturan.musik && mulai && nyala && !document.hidden) musik.play().catch(function () {}); else musik.pause();
    },
    duck: duck,
    nyala: function () { return nyala; },
    alih: function () { nyala = !nyala; api.musikAtur(); return nyala; }
  };

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (musik) musik.pause(); if (ctx && ctx.state === 'running') ctx.suspend().catch(function () {}); }
    else { if (ctx) ctx.resume().catch(function () {}); api.musikAtur(); }
  });
  return api;
})();
