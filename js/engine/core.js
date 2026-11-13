/* Inti: utilitas DOM, easing, tween berbasis waktu, simpan, penskala kanvas 1280x720, dan pengatur diam. */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function acak(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function kocok(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

var Ease = {
  outBack: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  inOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
  outCubic: function (t) { return 1 - Math.pow(1 - t, 3); }
};

/* tween(durasi ms, fungsi(t 0..1 setelah easing), easing, selesai) -> pembatal */
function tween(ms, fn, ease, done) {
  var t0 = performance.now(), batal = false;
  if (Pengaturan.kurangi) ms = 1;
  function step(now) {
    if (batal) return;
    var t = clamp((now - t0) / ms, 0, 1);
    fn((ease || Ease.inOutCubic)(t));
    if (t < 1) requestAnimationFrame(step); else if (done) done();
  }
  requestAnimationFrame(step);
  return function () { batal = true; };
}

/* Penyimpanan aman: gim tetap jalan bila localStorage diblokir. */
var Simpan = {
  kunci: 'timbangan-rupa-388',
  baca: function () { try { return JSON.parse(localStorage.getItem(this.kunci)) || null; } catch (e) { return null; } },
  tulis: function (d) { try { localStorage.setItem(this.kunci, JSON.stringify(d)); return true; } catch (e) { return false; } },
  hapus: function () { try { localStorage.removeItem(this.kunci); } catch (e) {} }
};

var Pengaturan = { musik: 1, santai: 0, bantuan: 0, kurangi: 0, baca: 0 };
try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) Pengaturan.kurangi = 1; } catch (e) {}

/* Penskala: panggung logis 1280x720 diskalakan dengan letterbox. */
var Layar = {
  skala: 1,
  pas: function () {
    var st = $('#stage'), s = Math.min(innerWidth / 1280, innerHeight / 720);
    Layar.skala = s;
    st.style.transform = 'scale(' + s + ')';
    st.style.left = Math.round((innerWidth - 1280 * s) / 2) + 'px';
    st.style.top = Math.round((innerHeight - 720 * s) / 2) + 'px';
  },
  /* koordinat layar -> koordinat panggung logis */
  titik: function (cx, cy) {
    var r = $('#stage').getBoundingClientRect();
    return [(cx - r.left) / Layar.skala, (cy - r.top) / Layar.skala];
  },
  /* pusat elemen dalam koordinat panggung */
  pusat: function (el) {
    var r = el.getBoundingClientRect();
    return Layar.titik(r.left + r.width / 2, r.top + r.height / 2);
  }
};

/* Pengatur diam: setelah 8 detik tanpa aksi, panggil fungsi isyarat milik layar aktif. */
var Diam = {
  batas: 8000, t: 0, isyarat: null, aktif: true,
  sentuh: function () { Diam.t = performance.now(); if (window.UI) UI.sembunyiTangan(); },
  periksa: function () {
    if (Diam.aktif && Diam.isyarat && !document.hidden && !$('.modal') && performance.now() - Diam.t > Diam.batas) {
      Diam.t = performance.now();
      try { Diam.isyarat(); } catch (e) {}
    }
  }
};
['pointerdown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, Diam.sentuh, true); });
setInterval(Diam.periksa, 500);

var MODE_UJI = /[?&]test=1\b/.test(location.search);
var Adegan = {};
