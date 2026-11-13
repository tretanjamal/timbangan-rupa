/* Komponen antarmuka yang dipakai ulang: ikon, tombol, kepala layar, Mira, modal, tangan penunjuk, partikel. */
var IKON = (function () {
  var g = function (d, extra) { return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '>' + d + '</svg>'; };
  return {
    beranda: g('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
    suaraNyala: g('<path d="M3 9v6h4l5 4V5L7 9z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12"/>'),
    suaraMati: g('<path d="M3 9v6h4l5 4V5L7 9z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6"/>'),
    layarPenuh: g('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    atur: g('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>', ' stroke-width="2"'),
    bintang: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" fill="#F2B632" stroke="#C98A12" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    bintangKosong: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" fill="#EADFC8" stroke="#CDBFA9" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    lampu: g('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/>'),
    bingkai: g('<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="6.5" y="7.5" width="11" height="9" rx="1"/><path d="M8 15l3-3 2 2 1.5-1.5L17 15"/>'),
    besar: g('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6"/>'),
    kecil: g('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M7.5 10.5h6"/>'),
    warna: g('<path d="M12 3a9 9 0 100 18c1.3 0 2-1 1.6-2.1-.4-1.1.3-2.3 1.5-2.3H18a3 3 0 003-3A9 9 0 0012 3z"/><circle cx="7.5" cy="11" r="1.3" fill="currentColor"/><circle cx="10.5" cy="7" r="1.3" fill="currentColor"/><circle cx="15" cy="7.5" r="1.3" fill="currentColor"/>'),
    putar: g('<path d="M20 12a8 8 0 11-2.3-5.6"/><path d="M20 4v5h-5"/>'),
    salin: g('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>'),
    hapus: g('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    cek: g('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    lanjut: g('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    kembali: g('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    info: g('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
    buku: g('<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M8 7h7"/>'),
    orang: g('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 016 5.5"/>'),
    jurnal: g('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>'),
    cetak: g('<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>'),
    ulang: g('<path d="M4 12a8 8 0 0113.7-5.7L20 8.5"/><path d="M20 3.5v5h-5"/><path d="M20 12a8 8 0 01-13.7 5.7L4 15.5"/><path d="M4 20.5v-5h5"/>'),
    peta: g('<path d="M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>'),
    guru: g('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20l4-4 4 4M7 8h6M7 11h9"/>'),
    gembok: '<g aria-hidden="true"><circle r="15" fill="#fff" stroke="#CDBFA9" stroke-width="2"/><path d="M-5.5 -2v-3.5a5.5 5.5 0 0111 0V-2" fill="none" stroke="#7B4B94" stroke-width="2.6"/><rect x="-8" y="-2.5" width="16" height="12" rx="2.5" fill="#7B4B94"/></g>'
  };
})();

var Muat = (function () {
  var siap = {};
  return {
    ada: function (k) { return !!siap[k]; },
    semua: function (lapor) {
      var kunci = Object.keys(ASET.img), n = 0, total = kunci.length + 1;
      function satu() { n++; if (lapor) lapor(n / total); }
      var janji = kunci.map(function (k) {
        return new Promise(function (ok) {
          var im = new Image();
          im.onload = function () { siap[k] = true; satu(); ok(); };
          im.onerror = function () { satu(); ok(); };
          im.src = ASET.img[k];
        });
      });
      var huruf = (document.fonts && document.fonts.load) ? Promise.all([
        document.fonts.load('800 40px "Baloo 2"'), document.fonts.load('400 24px Andika'), document.fonts.load('700 24px Andika')
      ]).catch(function () {}).then(satu) : Promise.resolve(satu());
      return Promise.all(janji.concat([huruf]));
    }
  };
})();

/* Bacakan teks gelembung dengan suara baca perangkat (speechSynthesis, bahasa Indonesia). Musik diturunkan selama dibacakan. */
var Baca = (function () {
  var ss = window.speechSynthesis, suara = null;
  function pilih() { if (!ss) return; var v = ss.getVoices(); suara = v.filter(function (x) { return /^id|^in/i.test(x.lang); })[0] || null; }
  if (ss) { pilih(); if (ss.addEventListener) ss.addEventListener('voiceschanged', pilih); }
  return {
    /* hanya bila perangkat punya suara bahasa Indonesia (tidak membacakan dengan logat bahasa lain) */
    ada: function () { return !!(ss && suara); },
    ucap: function (teks) {
      if (!ss || !suara || !teks) return;
      try {
        ss.cancel();
        var u = new SpeechSynthesisUtterance(teks.replace(/<[^>]+>/g, ''));
        u.lang = suara.lang || 'id-ID'; u.rate = 0.92; u.voice = suara;
        Suara.duck(60000); // musik turun sampai kalimat selesai dibacakan
        u.onend = u.onerror = function () { Suara.duck(0); };
        ss.speak(u);
      } catch (e) {}
    },
    henti: function () { try { if (ss) ss.cancel(); } catch (e) {} }
  };
})();

var UI = (function () {
  var app = null, tangan = null, tanganT = 0, gantiSedang = false;

  function tombol(id, teks, kelas, ikon, attr) {
    return '<button class="btn ' + (kelas || '') + '" ' + (id ? 'id="' + id + '" ' : '') + (attr || '') + '>' + (ikon ? '<span class="ik">' + ikon + '</span>' : '') + (teks ? '<span>' + teks + '</span>' : '') + '</button>';
  }
  function tombolIkon(id, ikon, label, kelas) {
    return '<button class="btn ikon ' + (kelas || '') + '" id="' + id + '" aria-label="' + label + '" title="' + label + '">' + ikon + '</button>';
  }
  function bintang(n, ukuran) {
    var s = '';
    for (var i = 0; i < 3; i++) s += '<span class="bt' + (ukuran ? ' ' + ukuran : '') + '">' + (i < n ? IKON.bintang : IKON.bintangKosong) + '</span>';
    return '<span class="bintang3" aria-label="' + n + ' dari 3 bintang">' + s + '</span>';
  }
  function kontrol() {
    return tombolIkon('k-suara', Suara.nyala() ? IKON.suaraNyala : IKON.suaraMati, STR.tombol.suara, 'krem') +
      tombolIkon('k-penuh', IKON.layarPenuh, STR.tombol.layarPenuh, 'krem') +
      tombolIkon('k-atur', IKON.atur, STR.tombol.atur, 'krem');
  }
  /* Kepala layar: tombol beranda, judul, langkah, jumlah bintang, kontrol */
  function kepala(judul, langkah) {
    return '<header class="kepala">' + tombolIkon('k-beranda', IKON.beranda, STR.tombol.beranda, 'krem') +
      '<div class="kepala-judul kertas"><b>' + judul + '</b>' + (langkah ? '<span class="langkah">' + langkah + '</span>' : '') + '</div>' +
      '<div class="kepala-bintang kertas" aria-label="' + STR.bintang + '">' + IKON.bintang + '<b id="jml-bintang">' + Game.totalBintang() + '</b></div>' +
      kontrol() + '</header>';
  }
  /* Gelembung Mira */
  function gelembung() {
    return '<div class="mira-baris"><div class="mira" id="mira"><img alt="Mira si merak" src="' + ASET.img.miraSenang + '"></div>' +
      '<div class="gelembung kertas" id="gelembung" aria-live="polite"><p></p>' +
      (Baca.ada() ? '<button class="btn ikon krem baca" id="k-baca" aria-label="' + STR.guru.bacakan + '" title="' + STR.guru.bacakan + '">' + IKON.suaraNyala + '</button>' : '') + '</div></div>';
  }
  var EKSPRESI = { senang: 'miraSenang', berpikir: 'miraBerpikir', bangga: 'miraBangga' };
  function mira(ekspresi, gerak) {
    var m = $('#mira'); if (!m) return;
    var img = $('img', m), src = ASET.img[EKSPRESI[ekspresi] || 'miraSenang'];
    if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    if (gerak) { m.classList.remove('hore', 'bingung'); void m.offsetWidth; m.classList.add(gerak); }
  }
  function kata(teks, ekspresi, gerak) {
    var g = $('#gelembung p'); if (!g) return;
    if (g.textContent !== teks) {
      g.textContent = teks;
      var b = $('#gelembung'); b.classList.remove('baru'); void b.offsetWidth; b.classList.add('baru');
      if (Pengaturan.baca) Baca.ucap(teks);
    }
    mira(ekspresi || 'senang', gerak);
  }

  function modal(html, opsi) {
    opsi = opsi || {};
    var m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = '<div class="modal-isi kertas ' + (opsi.kelas || '') + '" role="dialog" aria-modal="true">' + html +
      (opsi.tanpaTutup ? '' : '<div class="modal-kaki">' + (opsi.kaki || '') + tombol('m-tutup', STR.tombol.tutup, 'krem', IKON.cek) + '</div>') + '</div>';
    $('#stage').appendChild(m);
    var sebelum = document.activeElement;
    function tutup() { if (!m.isConnected) return; m.classList.add('keluar'); setTimeout(function () { m.remove(); }, 180); if (sebelum && sebelum.focus) try { sebelum.focus(); } catch (e) {} if (opsi.saatTutup) opsi.saatTutup(); }
    m.tutup = tutup;
    var t = $('#m-tutup', m); if (t) t.onclick = tutup;
    m.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !opsi.tanpaTutup) tutup(); });
    var fokus = $('input', m) || $('.modal-kaki button', m) || $('button', m); if (fokus) setTimeout(function () { fokus.focus({ preventScroll: true }); $('.modal-isi', m).scrollTop = 0; }, 30);
    return m;
  }

  /* Tangan penunjuk (isyarat) di koordinat panggung atau di tengah elemen */
  function tunjuk(target, lama) {
    if (!tangan) return;
    var xy = Array.isArray(target) ? target : (target && target.isConnected ? Layar.pusat(target) : null);
    if (!xy) return;
    tangan.style.left = xy[0] + 'px'; tangan.style.top = xy[1] + 'px';
    tangan.classList.remove('tampil'); void tangan.offsetWidth; tangan.classList.add('tampil');
    clearTimeout(tanganT);
    tanganT = setTimeout(sembunyiTangan, lama || 2800);
  }
  function sembunyiTangan() { if (tangan) tangan.classList.remove('tampil'); }

  /* Partikel kertas kecil */
  function konfeti(xy, n) {
    if (Pengaturan.kurangi) return;
    var st = $('#stage'), warna = ['#E9854F', '#2E6B5E', '#7B4B94', '#F2B632', '#5FA35A'];
    for (var i = 0; i < (n || 18); i++) {
      var d = document.createElement('i');
      d.className = 'konfeti';
      d.style.left = xy[0] + 'px'; d.style.top = xy[1] + 'px';
      d.style.background = warna[i % warna.length];
      if (i % 3 === 0) d.style.borderRadius = '50%';
      st.appendChild(d);
      var a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 110;
      d.animate([
        { transform: 'translate(-50%,-50%) rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'translate(' + (Math.cos(a) * r) + 'px,' + (Math.sin(a) * r - 40) + 'px) rotate(' + (Math.random() * 540) + 'deg) scale(.6)', opacity: 1, offset: 0.7 },
        { transform: 'translate(' + (Math.cos(a) * r) + 'px,' + (Math.sin(a) * r + 30) + 'px) rotate(' + (Math.random() * 720) + 'deg) scale(.4)', opacity: 0 }
      ], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = (function (el) { return function () { el.remove(); }; })(d);
    }
  }
  function letup(el) {
    if (!el || Pengaturan.kurangi || !el.animate) return;
    el.animate([{ transform: 'scale(.6)' }, { transform: 'scale(1.12)', offset: 0.6 }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
  }
  function goyang(el) {
    if (!el || Pengaturan.kurangi || !el.animate) return;
    el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }], { duration: 380, easing: 'ease-in-out' });
  }
  function hitungNaik(el, dari, ke) {
    if (!el) return;
    if (dari === ke) { el.textContent = ke; return; }
    tween(700, function (t) { el.textContent = Math.round(dari + (ke - dari) * t); }, Ease.outCubic);
    letup(el.parentNode);
  }

  /* Ganti layar dengan transisi 300 ms */
  function ganti(render) {
    if (!app) app = $('#app');
    sembunyiTangan(); Baca.henti();
    $$('.modal').forEach(function (m) { m.remove(); });
    Diam.isyarat = null;
    if (gantiSedang || Pengaturan.kurangi || !app.firstChild) { app.innerHTML = ''; render(app); masuk(); return; }
    gantiSedang = true;
    app.classList.add('keluar');
    setTimeout(function () { gantiSedang = false; app.classList.remove('keluar'); app.innerHTML = ''; render(app); masuk(); }, 140);
  }
  function masuk() { app.classList.remove('masuk'); void app.offsetWidth; app.classList.add('masuk'); Diam.sentuh(); }

  function pasangTangan() {
    tangan = document.createElement('div');
    tangan.id = 'tangan';
    tangan.setAttribute('aria-hidden', 'true');
    tangan.innerHTML = '<svg viewBox="0 0 64 64"><path d="M24 30V12a5 5 0 0110 0v14l12 2.6a6 6 0 014.7 6.8L49 48a10 10 0 01-10 8H31a10 10 0 01-8-4l-9.5-12.5a4.6 4.6 0 017-6z" fill="#FFE2C4" stroke="#3B2A20" stroke-width="3.5" stroke-linejoin="round"/><path d="M34 27v9M42 29v7" stroke="#3B2A20" stroke-width="3" stroke-linecap="round"/></svg>';
    $('#stage').appendChild(tangan);
  }

  return {
    tombol: tombol, tombolIkon: tombolIkon, bintang: bintang, kepala: kepala, gelembung: gelembung, kontrol: kontrol,
    mira: mira, kata: kata, modal: modal, tunjuk: tunjuk, sembunyiTangan: sembunyiTangan,
    konfeti: konfeti, letup: letup, goyang: goyang, hitungNaik: hitungNaik, ganti: ganti, pasangTangan: pasangTangan
  };
})();
