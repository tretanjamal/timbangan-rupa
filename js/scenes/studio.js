/* Studio menata potongan: kanvas + Timbangan Rupa + rak + alat. Dipakai Stasiun 3, 4, dan 5.
   cfg: { judul, langkah, mode: 'asi'|'sim'|'rad'|'bebas', awal: [potongan terkunci], pesan, h1, h2: fn(hasil), h3,
          judulKarya, stasiun, selesai: fn(petunjuk) } */
Adegan.studio = function (cfg) {
  var W = BERAT.lebar, H = BERAT.tinggi, CX = BERAT.pusatX, CY = BERAT.pusatY;
  var mode = cfg.mode, P = (cfg.awal || []).map(function (p) { var q = {}; for (var k in p) q[k] = p[k]; q.lock = 1; return q; });
  var cur = { k: 'sun', t: 2, s: 80 }, sel = null, alat = 'taruh', N = 6, h = 0, hantu = null, kel = 'alam';
  var kembarPrev = false, ringan = false;
  var batas = mode === 'rad' ? 4 : mode === 'sim' ? 10 : 20, tb = null, cv = null, okPrev = null, tunda = 0, onboard = !Game.S.main[cfg.stasiun] && !cfg.ulang;

  UI.ganti(function (app) {
    app.innerHTML = '<div class="layar layar-main">' + UI.kepala(cfg.judul, cfg.langkah) +
      '<div class="kolom-kiri"><div class="kanvas-kartu kertas">' +
      '<svg id="cv" viewBox="0 0 ' + W + ' ' + H + '" tabindex="0" role="application" aria-label="Kanvas. Panah menggeser, Enter menaruh potongan, Spasi memilih potongan berikutnya, Delete menghapus."></svg>' +
      (mode === 'rad' ? '<div class="ulang-pilih" role="group" aria-label="' + STR.studio.ulang + '"><span>' + STR.studio.ulang + '</span>' + [4, 6, 8].map(function (n) { return '<button class="btn kecil ' + (n === N ? 'pilih' : '') + '" data-n="' + n + '" aria-pressed="' + (n === N) + '">' + n + '</button>'; }).join('') + '</div>' : '') +
      '</div><div class="timbangan" id="tb"></div></div>' +
      '<div class="kolom-kanan">' + UI.gelembung() +
      '<div class="rak kertas"><div class="rak-tab" role="tablist">' + ['alam', 'budaya', 'bentuk'].map(function (k) { return '<button class="btn tab" role="tab" data-kel="' + k + '">' + STR.kelompok[k] + '</button>'; }).join('') + '</div><div class="rak-isi" id="rak"></div></div>' +
      '<div class="alat">' +
      UI.tombol('t-besar', STR.tombol.besar, 'krem alat-b', IKON.besar) + UI.tombol('t-kecil', STR.tombol.kecil, 'krem alat-b', IKON.kecil) +
      UI.tombol('t-warna', STR.tombol.warna, 'krem alat-b', IKON.warna) + UI.tombol('t-putar', STR.tombol.putar, 'krem alat-b', IKON.putar) +
      UI.tombol('t-salin', STR.tombol.salin, 'krem alat-b', IKON.salin) + UI.tombol('t-hapus', STR.tombol.hapus, 'krem alat-b', IKON.hapus) + '</div>' +
      '<div class="aksi">' + UI.tombol('t-hint', STR.tombol.petunjuk, 'krem', IKON.lampu) + UI.tombol('t-pajang', STR.tombol.pajang, 'hijau besar', IKON.bingkai) + '</div></div></div>';
    cv = $('#cv');
    tb = Timbangan($('#tb'));
    rak();
    pasang();
    gambar();
    UI.kata(cfg.pesan, 'senang');
    if (onboard) setTimeout(function () { UI.tunjuk($('#rak button[data-k="sun"]') || $('#rak button')); }, 800);
    setTimeout(function () { cv.focus({ preventScroll: true }); }, 350);
  });

  /* ---------- susunan yang dihitung (dengan bayangan cermin / salinan putar) ---------- */
  function susunan() {
    var o = [];
    P.forEach(function (p, i) {
      if (mode === 'sim' && !p.lock) {
        o.push(salin(p, { i: i }));
        o.push(salin(p, { x: W - p.x, fl: -(p.fl || 1), i: i, b: 1 }));
      } else if (mode === 'rad' && !p.lock) {
        for (var j = 0; j < N; j++) {
          var a = j * 2 * Math.PI / N, dx = p.x - CX, dy = p.y - CY;
          o.push(salin(p, { x: CX + dx * Math.cos(a) - dy * Math.sin(a), y: CY + dx * Math.sin(a) + dy * Math.cos(a), a: (p.a || 0) + j * 360 / N, i: i, j: j }));
        }
      } else o.push(salin(p, { i: i }));
    });
    return o;
  }
  function salin(p, ubah) { var q = {}, k; for (k in p) q[k] = p[k]; for (k in ubah) q[k] = ubah[k]; return q; }
  function milikMurid() { return P.filter(function (p) { return !p.lock; }); }

  function periksa() {
    var L = susunan(), b = Potongan.timbang(L, Game.S.adj), n = milikMurid().length, ok = false, m = '';
    if (!n) m = STR.studio.taruh;
    else if (mode === 'asi') {
      var kiri = L.some(function (p) { return p.x < CX - 20; }), kanan = L.some(function (p) { return p.x > CX + 20; });
      if (!b.ok) m = b.M > 0 ? STR.studio.miringKanan : STR.studio.miringKiri;
      else if (!kiri || !kanan) m = STR.studio.duaSisi;
      else if (Potongan.kembar(L)) m = STR.studio.kembar;
      else ok = true;
    } else if (mode === 'rad') {
      if (milikMurid().some(function (p) { return Math.hypot(p.x - CX, p.y - CY) < 30; })) m = STR.studio.radialJauh; else ok = true;
    } else ok = true;
    if (ok && cfg.syarat) { var sy = cfg.syarat(milikMurid()); if (sy) { ok = false; m = sy; } }
    if (m === STR.studio.kembar && kembarPrev !== true) Game.catat(cfg.stasiun, 'susunan kembar');
    kembarPrev = m === STR.studio.kembar;
    return { L: L, b: b, ok: ok, m: m, n: n };
  }

  /* ---------- gambar ---------- */
  function gambar() {
    var c = periksa(), L = c.L, g = '<rect width="' + W + '" height="' + H + '" fill="url(#serat)"/>';
    if (mode === 'rad') g += '<circle cx="' + CX + '" cy="' + CY + '" r="70" fill="none" stroke="#E5D6B8" stroke-width="2" stroke-dasharray="4 8"/><circle cx="' + CX + '" cy="' + CY + '" r="140" fill="none" stroke="#E5D6B8" stroke-width="2" stroke-dasharray="4 8"/><circle cx="' + CX + '" cy="' + CY + '" r="7" fill="#7B4B94" stroke="#fff" stroke-width="3"/>';
    else g += '<line x1="' + CX + '" x2="' + CX + '" y1="8" y2="' + (H - 8) + '" stroke="' + (mode === 'sim' ? '#7B4B94' : '#D8CBB0') + '" stroke-width="' + (mode === 'sim' ? 3 : 2) + '" stroke-dasharray="10 8"/>';
    g += '<g id="sorot"></g>';
    g += L.map(function (p) {
      var kelas = p.b ? 'bayang' : p.j ? 'bayang' : '';
      return Potongan.svg(p, p.i, { ringan: ringan, pilih: p.i === sel && !p.b && !p.j, kelas: kelas + (p.j ? '" data-j="' + p.j : '') + (p.b ? '" data-b="1' : '') });
    }).join('');
    if (hantu) g += '<g class="hantu" transform="translate(' + hantu.x.toFixed(1) + ' ' + hantu.y.toFixed(1) + ')"><g opacity=".45">' + Potongan.isi(salin(hantu, {})) + '</g><circle r="' + hantu.s * 0.6 + '" fill="transparent" stroke="#7B4B94" stroke-width="3" stroke-dasharray="7 6"/></g>';
    cv.innerHTML = g;
    var adaIsi = L.length > 0;
    tb.atur(c.b, adaIsi);
    var pj = $('#t-pajang');
    pj.disabled = !c.ok;
    pj.classList.toggle('siap', c.ok);
    if (c.ok && okPrev === false && (mode === 'sim' || mode === 'rad')) Suara.seimbang();
    okPrev = c.ok;
    return c;
  }
  function segar(pesanKhusus, ekspresi) {
    var c = gambar();
    var teks = pesanKhusus || (c.ok ? (mode === 'bebas' && !c.b.ok ? STR.studio.bebasMiring : STR.studio.seimbang) : c.m);
    UI.kata(teks, ekspresi || (c.ok ? 'bangga' : 'senang'));
    if (MODE_UJI && window.__test.studio) window.__test.studio.hasil = c;
    return c;
  }
  var rafAda = false;
  function segarHalus() { if (rafAda) return; rafAda = true; requestAnimationFrame(function () { rafAda = false; ringan = true; gambar(); ringan = false; }); }

  /* ---------- rak potongan ---------- */
  function rak() {
    $$('.rak-tab .tab').forEach(function (b) { var on = b.dataset.kel === kel; b.classList.toggle('pilih', on); b.setAttribute('aria-selected', on); });
    $('#rak').innerHTML = Object.keys(POTONGAN).filter(function (k) { return POTONGAN[k].kel === kel; }).map(function (k) {
      return '<button class="btn potong' + (alat === 'taruh' && cur.k === k ? ' pilih' : '') + '" data-k="' + k + '" aria-label="' + POTONGAN[k].nama + '" title="' + POTONGAN[k].nama + '">' + Potongan.ikon(k, cur.t) + '</button>';
    }).join('');
  }

  /* ---------- aksi potongan ---------- */
  function taruh(x, y, contoh) {
    if (milikMurid().length >= batas) { UI.kata(STR.studio.penuh, 'berpikir', 'bingung'); Suara.lembut(); return; }
    var p = salin(contoh || cur, { x: clamp(x, 10, W - 10), y: clamp(y, 10, H - 10) });
    delete p.lock;
    P.push(p); sel = P.length - 1; hantu = null;
    Suara.kertas();
    var c = segar();
    var el = $('.pc[data-i="' + sel + '"]', cv); if (el && !Pengaturan.kurangi) el.classList.add('muncul');
    if (onboard && milikMurid().length === 1) { onboard = false; UI.sembunyiTangan(); }
    return c;
  }
  function target() { return sel != null && P[sel] && !P[sel].lock ? P[sel] : null; }
  function perluPilih() {
    UI.kata(STR.studio.pilihDulu, 'berpikir', 'bingung'); Suara.lembut();
    var adaP = $('.pc:not(.lk):not(.bayang)', cv); if (adaP) UI.tunjuk(Layar.pusat(adaP), 1800);
  }
  function ubahUkuran(d) { var t = target() || cur; t.s = clamp(t.s + d, 30, 170); if (t === cur) { rak(); UI.kata(STR.studio.taruh, 'senang'); } segar(); }
  function ubahWarna() { var t = target() || cur; t.t = (t.t + 1) % 3; if (t === cur) rak(); segar(isi(STR.studio.warna, { w: BERAT.tingkat[t.t].nama })); }
  function putar() { var t = target(); if (!t) return perluPilih(); t.r = ((t.r || 0) + 45) % 360; segar(); }
  function gandakan() {
    var t = target(); if (!t) return perluPilih();
    if (milikMurid().length >= batas) { UI.kata(STR.studio.penuh, 'berpikir'); return; }
    var p = salin(t, { x: clamp(t.x + 40, 10, W - 10), y: clamp(t.y + 24, 10, H - 10) });
    P.push(p); sel = P.length - 1; Suara.kertas(); segar();
  }
  function hapus() { var t = target(); if (!t) return perluPilih(); P.splice(sel, 1); sel = null; Suara.gunting(); segar(); }

  /* ---------- petunjuk bertingkat ---------- */
  function petunjuk() {
    h++; Game.S.petunjuk[cfg.stasiun]++;
    var c = periksa();
    if (h === 1) {
      UI.kata(cfg.h1, 'berpikir');
      sorotSisi(c);
    } else if (h === 2) {
      UI.kata(typeof cfg.h2 === 'function' ? cfg.h2(c) : cfg.h2, 'berpikir');
      sorotSisi(c);
      UI.tunjuk($('#t-warna'));
    } else {
      if (mode === 'asi') hantu = Potongan.solusi(c.L, Game.S.adj);
      else if (mode === 'rad') hantu = { k: 'leaf', t: 2, s: 70, x: CX, y: CY - 95 };
      else if (mode === 'sim') hantu = { k: 'tree', t: 1, s: 110, x: CX - 160, y: CY + 20 };
      else hantu = { k: 'sun', t: 1, s: 80, x: CX + 150, y: CY - 70 };
      gambar();
      UI.kata(hantu ? cfg.h3 : cfg.h1, 'senang');
      var hEl = $('.hantu', cv); if (hEl) setTimeout(function () { UI.tunjuk(Layar.pusat(hEl)); }, 200);
    }
  }
  function sorotSisi(c) {
    if (mode !== 'asi' && mode !== 'bebas') return;
    var kanan = c.b.M < 0; // timbangan miring kiri -> imbangi di kanan
    var s = $('#sorot', cv);
    if (s) s.innerHTML = '<rect class="sorot" x="' + (kanan ? CX + 6 : 6) + '" y="6" width="' + (CX - 12) + '" height="' + (H - 12) + '" rx="14" fill="#7B4B94" opacity=".1"/>';
  }

  /* ---------- masukan ---------- */
  function pasang() {
    var seret = null;
    function titik(e) { var b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * W, (e.clientY - b.top) / b.height * H]; }
    /* ubah titik pada salinan (cermin/putar) menjadi titik pada potongan asli */
    function keAsli(xy, el) {
      if (el && el.dataset.b) return [W - xy[0], xy[1]];
      if (el && el.dataset.j) { var a = -(+el.dataset.j) * 2 * Math.PI / N, dx = xy[0] - CX, dy = xy[1] - CY; return [CX + dx * Math.cos(a) - dy * Math.sin(a), CY + dx * Math.sin(a) + dy * Math.cos(a)]; }
      return xy;
    }
    cv.onpointerdown = function (e) {
      var xy = titik(e), g = e.target.closest('.pc'), hn = e.target.closest('.hantu');
      if (hn && hantu) { taruh(hantu.x, hantu.y, hantu); return; }
      if (g && !g.classList.contains('lk')) {
        sel = +g.dataset.i; alat = 'pilih'; rak();
        var asli = keAsli(xy, g);
        seret = { el: g, dx: P[sel].x - asli[0], dy: P[sel].y - asli[1], gerak: false, x0: xy[0], y0: xy[1] };
        cv.setPointerCapture(e.pointerId);
        Suara.kertas(); segar(STR.studio.pindah);
        return;
      }
      if (g && g.classList.contains('lk')) { UI.kata(STR.studio.terkunci, 'berpikir'); UI.goyang(g); Suara.lembut(); return; }
      if (alat === 'pilih' && target()) { target().x = clamp(xy[0], 10, W - 10); target().y = clamp(xy[1], 10, H - 10); Suara.kertas(); segar(); return; }
      taruh(xy[0], xy[1]);
    };
    cv.onpointermove = function (e) {
      if (!seret || sel == null) return;
      var xy = titik(e);
      if (!seret.gerak && Math.hypot(xy[0] - seret.x0, xy[1] - seret.y0) < 5) return;
      seret.gerak = true;
      var a = keAsli(xy, seret.el);
      P[sel].x = clamp(a[0] + seret.dx, 10, W - 10); P[sel].y = clamp(a[1] + seret.dy, 10, H - 10);
      segarHalus();
    };
    cv.onpointerup = cv.onpointercancel = function () { if (seret && seret.gerak) segar(); seret = null; };

    cv.onkeydown = function (e) {
      var k = e.key, t = target();
      if (k.indexOf('Arrow') === 0) {
        e.preventDefault();
        if (!t) { pilihBerikut(); return; }
        var d = e.shiftKey ? 30 : 8;
        if (k === 'ArrowLeft') t.x -= d; if (k === 'ArrowRight') t.x += d; if (k === 'ArrowUp') t.y -= d; if (k === 'ArrowDown') t.y += d;
        t.x = clamp(t.x, 10, W - 10); t.y = clamp(t.y, 10, H - 10); segar();
      } else if (k === 'Enter') { e.preventDefault(); if (hantu) taruh(hantu.x, hantu.y, hantu); else taruh(CX + (mode === 'rad' ? 0 : 120) - 40 + Math.random() * 80, mode === 'rad' ? CY - 90 : CY - 40 + Math.random() * 80); }
      else if (k === ' ') { e.preventDefault(); pilihBerikut(); }
      else if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); hapus(); }
      else if (k === '+' || k === '=') ubahUkuran(15);
      else if (k === '-') ubahUkuran(-15);
      else if (k === 'w' || k === 'W') ubahWarna();
      else if (k === 'r' || k === 'R') putar();
    };
    function pilihBerikut() {
      var idx = P.map(function (p, i) { return p.lock ? -1 : i; }).filter(function (i) { return i >= 0; });
      if (!idx.length) { UI.kata(STR.studio.taruh, 'senang'); return; }
      sel = idx[(idx.indexOf(sel) + 1) % idx.length]; alat = 'pilih'; rak(); segar(STR.studio.pindah);
    }

    $('.rak-tab').onclick = function (e) { var b = e.target.closest('[data-kel]'); if (!b) return; kel = b.dataset.kel; rak(); };
    $('#rak').onclick = function (e) {
      var b = e.target.closest('[data-k]'); if (!b) return;
      cur.k = b.dataset.k; alat = 'taruh'; sel = null; rak(); segar(isi(STR.studio.dipilih, { n: POTONGAN[cur.k].nama }));
      if (onboard) setTimeout(function () { UI.tunjuk(Layar.pusat(cv)); }, 150);
    };
    $('#t-besar').onclick = function () { ubahUkuran(15); };
    $('#t-kecil').onclick = function () { ubahUkuran(-15); };
    $('#t-warna').onclick = ubahWarna;
    $('#t-putar').onclick = putar;
    $('#t-salin').onclick = gandakan;
    $('#t-hapus').onclick = hapus;
    $('#t-hint').onclick = petunjuk;
    var ul = $('.ulang-pilih');
    if (ul) ul.onclick = function (e) {
      var b = e.target.closest('[data-n]'); if (!b) return;
      N = +b.dataset.n;
      $$('[data-n]', ul).forEach(function (x) { var on = +x.dataset.n === N; x.classList.toggle('pilih', on); x.setAttribute('aria-pressed', on); });
      Suara.kertas(); segar();
    };
    $('#t-pajang').onclick = function () {
      var c = periksa(); if (!c.ok) return;
      $('#t-pajang').disabled = true;
      Game.adaptif(h);
      var karya = { judul: cfg.judulKarya, jenis: mode, L: c.L.map(function (p) { return { k: p.k, t: p.t, s: p.s, x: Math.round(p.x), y: Math.round(p.y), a: Math.round(p.a || 0), r: p.r || 0, fl: p.fl || 1 }; }) };
      Game.pajang(karya, function () { cfg.selesai(h, c); });
    };
    Diam.isyarat = function () {
      var c = periksa();
      if (c.ok) UI.tunjuk($('#t-pajang'));
      else if (!c.n) UI.tunjuk(alat === 'taruh' ? Layar.pusat(cv) : $('#rak button'));
      else UI.tunjuk($('#t-hint'));
    };
  }

  if (MODE_UJI) window.__test.studio = {
    taruh: function (p) { return taruh(p.x, p.y, { k: p.k, t: p.t, s: p.s }); },
    solusi: function () { return Potongan.solusi(periksa().L, Game.S.adj); },
    periksa: periksa,
    kosongkan: function () { P = P.filter(function (p) { return p.lock; }); sel = null; segar(); }
  };
};
