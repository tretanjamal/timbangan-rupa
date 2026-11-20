/* Stasiun 1: Cari Sumbu (garis cermin) lalu Kuas Cermin. TP1, tag: simetris. */
(function () {
  var W = 600, H = 480, CYF = 240;

  /* Gambar setangkup, berpusat di x = c */
  function gambar(i, c) {
    var g = '<g transform="translate(' + c + ' ' + CYF + ')">';
    if (i === 0) { // kupu-kupu
      var sayap = function (s) {
        return '<ellipse cx="' + s * 62 + '" cy="-40" rx="62" ry="84" transform="rotate(' + s * 22 + ' ' + s * 62 + ' -40)" fill="#E9854F"/>' +
          '<ellipse cx="' + s * 52 + '" cy="62" rx="42" ry="54" fill="#F4DCA6"/><circle cx="' + s * 66 + '" cy="-52" r="18" fill="#7B4B94"/><circle cx="' + s * 50 + '" cy="66" r="12" fill="#2E6B5E"/>';
      };
      g += '<g filter="url(#fv)" stroke="#fff" stroke-width="4">' + sayap(-1) + sayap(1) + '<rect x="-10" y="-84" width="20" height="176" rx="10" fill="#3B2A20"/></g><path d="M-4 -84q-14-30-30-34M4 -84q14-30 30-34" stroke="#3B2A20" stroke-width="4" fill="none" stroke-linecap="round"/>';
    } else if (i === 1) { // daun
      g += '<g filter="url(#fv)" stroke="#fff" stroke-width="4"><path d="M0 -170Q140 -20 0 170Q-140 -20 0 -170Z" fill="#5FA35A"/></g><path d="M0 -150V190M0 -60l-44-40M0 -60l44-40M0 20l-56-46M0 20l56-46M0 100l-46-36M0 100l46-36" stroke="#2E6B5E" stroke-width="5" fill="none" stroke-linecap="round"/>';
    } else if (i === 2) { // gunungan wayang (gambar)
      g += Muat.ada('gunungan') ? '<image href="' + ASET.img.gunungan + '" x="-133" y="-192" width="266" height="384" filter="url(#fi1)"/>' : Potongan.isi({ k: 'gun', t: 1, s: 380 });
    } else if (i === 3) { // joglo (gambar)
      g += Muat.ada('joglo') ? '<image href="' + ASET.img.joglo + '" x="-210" y="-139" width="420" height="277" filter="url(#fi1)"/>' : Potongan.isi({ k: 'home', t: 1, s: 360 });
    } else if (i === 4) { // layang-layang
      g += '<g filter="url(#fv)" stroke="#fff" stroke-width="4"><polygon points="0,-180 120,-50 0,150 -120,-50" fill="#7B4B94"/><polygon points="0,-180 120,-50 0,-50 -120,-50" fill="#E9854F"/><circle cy="-50" r="26" fill="#F2B632"/></g><path d="M0 150q30 20 0 40q-30 20 0 40" stroke="#3B2A20" stroke-width="4" fill="none"/>';
    } else { // rumah
      g += '<g filter="url(#fv)" stroke="#fff" stroke-width="4"><rect x="-140" y="-30" width="280" height="190" fill="#F4DCA6"/><polygon points="-175,-25 0,-170 175,-25" fill="#2E6B5E"/><rect x="-36" y="60" width="72" height="100" fill="#E9854F"/><rect x="-118" y="10" width="56" height="50" fill="#7B4B94"/><rect x="62" y="10" width="56" height="50" fill="#7B4B94"/></g>';
    }
    return g + '</g>';
  }
  /* kartu ilmu: separuh daun dilipat ke garis cermin dan menutup separuh lainnya dengan tepat */
  var DEMO_LIPAT = '<svg class="demo-lipat" viewBox="-60 -72 120 144" aria-hidden="true"><path d="M0 -62Q-58 0 0 62Z" fill="#2E6B5E" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>' +
    '<path class="sayap" d="M0 -62Q58 0 0 62Z" fill="#5FA35A" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M0 -70V70" stroke="#7B4B94" stroke-width="3.5" stroke-dasharray="7 5" stroke-linecap="round"/></svg>';
  var LEBAR = [170, 150, 140, 215, 130, 180]; // setengah lebar gambar, untuk batas acak pusat

  Adegan.l1 = function () {
    var urut = 0, ax = null, c = 300, h = 0, h3 = 0, totalH = 0, sibuk = false;
    UI.ganti(function (app) {
      app.innerHTML = '<div class="layar layar-main">' + UI.kepala(STR.peta.stasiun + ' 1 · ' + STR.l1.judul, '<span id="l1-langkah"></span>') +
        '<div class="kolom-kiri"><div class="kanvas-kartu tinggi kertas"><svg id="cv" viewBox="0 0 ' + W + ' ' + H + '" tabindex="0" role="application" aria-label="Kanvas garis cermin. Panah kiri dan kanan menggeser garis, Enter untuk cek."></svg></div></div>' +
        '<div class="kolom-kanan">' + UI.gelembung() +
        '<div class="panel kertas"><div class="l1-label">' + STR.l1.koleksi + '</div><div class="ubin-langkah" id="l1-titik"></div><div class="contoh-sumbu kartu-ilmu">' + DEMO_LIPAT + '<p class="panel-teks">' + STR.l1.ingat + '</p></div></div>' +
        '<div class="aksi">' + UI.tombol('l1-hint', STR.tombol.petunjuk, 'krem', IKON.lampu) + UI.tombol('l1-cek', STR.tombol.cekSumbu, 'hijau besar', IKON.cek) + '</div></div></div>';
      var cv = $('#cv');

      function titik() {
        $('#l1-langkah').textContent = (urut + 1) + '/6';
        $('#l1-titik').innerHTML = [0, 1, 2, 3, 4, 5].map(function (j) {
          var st = j < urut ? 'ok' : j === urut ? 'kini' : '';
          return '<span class="ubin ' + st + '" aria-label="' + STR.l1.nama[j] + (st === 'ok' ? ' (selesai)' : '') + '"><svg viewBox="-30 20 460 440" aria-hidden="true">' + gambar(j, 200) + '</svg>' + (st === 'ok' ? '<b>' + IKON.cek + '</b>' : '') + '</span>';
        }).join('');
      }
      function baru() {
        var L = LEBAR[urut];
        c = Math.round(L + 20 + Math.random() * (W - 2 * L - 40));
        ax = null; h = 0; sibuk = false;
        cv.innerHTML = '<rect width="' + W + '" height="' + H + '" fill="url(#serat)"/><g id="fig">' + gambar(urut, c) + '</g><g id="pita"></g><g id="ax"></g><g id="lipat"></g>';
        titik();
        UI.kata(isi(STR.l1.mulai, { n: STR.l1.nama[urut] }), 'senang');
        garis(c + (c > W / 2 ? -1 : 1) * (110 + Math.round(Math.random() * 60))); // garis tampak sejak awal, belum tepat
        $('#l1-cek').disabled = false;
        Diam.isyarat = function () { UI.tunjuk(ax == null ? Layar.pusat(cv) : $('#l1-hint')); };
        if (urut === 0 && !Game.S.main[0]) setTimeout(function () { UI.tunjuk(Layar.pusat(cv)); }, 700);
      }
      function garis(x) {
        ax = clamp(x, 10, W - 10);
        $('#ax').innerHTML = '<line x1="' + ax + '" x2="' + ax + '" y1="8" y2="' + (H - 8) + '" stroke="#7B4B94" stroke-width="5" stroke-dasharray="14 9" stroke-linecap="round"/>' +
          '<g transform="translate(' + ax + ' ' + (H - 34) + ')"><circle r="22" fill="#7B4B94" stroke="#fff" stroke-width="4"/><path d="M-11 0h22M-11 0l6-6M-11 0l6 6M11 0l-6-6M11 0l-6 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>';
        $('#l1-cek').disabled = false;
      }
      function xDari(e) { var b = cv.getBoundingClientRect(); return (e.clientX - b.left) / b.width * W; }
      var seret = false;
      cv.onpointerdown = function (e) { if (sibuk) return; seret = true; cv.setPointerCapture(e.pointerId); garis(xDari(e)); Suara.kertas(); };
      cv.onpointermove = function (e) { if (seret && !sibuk) garis(xDari(e)); };
      cv.onpointerup = cv.onpointercancel = function () { seret = false; };
      cv.onkeydown = function (e) {
        if (sibuk) return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); garis((ax == null ? W / 2 : ax) + (e.key === 'ArrowLeft' ? -1 : 1) * (e.shiftKey ? 20 : 4)); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cek(); }
      };

      function lipat() { // tunjukkan sisi kiri dicerminkan ke kanan
        $('#lipat').innerHTML = '<clipPath id="kiri-klip"><rect x="0" y="0" width="' + c + '" height="' + H + '"/></clipPath>' +
          '<g class="lipat" clip-path="url(#kiri-klip)" transform="translate(' + 2 * c + ' 0) scale(-1 1)">' + gambar(urut, c) + '</g>';
      }
      function cek() {
        if (sibuk) return;
        if (ax == null) { UI.kata(STR.l1.belumTaruh, 'berpikir', 'bingung'); return; }
        if (Math.abs(ax - c) <= 14) {
          sibuk = true; garis(c); lipat();
          Suara.benar(); UI.konfeti(Layar.pusat(cv), 16);
          UI.kata(STR.l1.benar, 'bangga', 'hore');
          setTimeout(function () { urut++; if (urut > 5) Adegan.kuas(0, h3); else baru(); }, 1500);
        } else {
          Suara.lembut(); UI.goyang($('.kanvas-kartu'));
          Game.catat(0, 'sumbu meleset');
          UI.kata(isi(STR.l1.salah, { arah: ax < c ? STR.l1.kanan : STR.l1.kiri }), 'berpikir', 'bingung');
        }
      }
      $('#l1-cek').onclick = cek;
      $('#l1-hint').onclick = function () {
        if (sibuk) return;
        h++; totalH++;
        Game.S.petunjuk[0]++;
        if (h === 1) UI.kata(STR.l1.h1, 'berpikir');
        else if (h === 2) { UI.kata(STR.l1.h2, 'berpikir'); $('#pita').innerHTML = '<rect class="pita" x="' + (c - 45) + '" y="0" width="90" height="' + H + '" fill="#7B4B94" opacity=".16"/>'; }
        else { // tunjukkan caranya, lalu soal serupa (gambar berikutnya)
          h3++; sibuk = true; garis(c); lipat();
          UI.kata(STR.l1.h3, 'senang');
          setTimeout(function () { urut++; if (urut > 5) Adegan.kuas(0, h3); else baru(); }, 2000);
        }
      };
      baru();
      setTimeout(function () { cv.focus({ preventScroll: true }); }, 350);
      if (MODE_UJI) window.__test.l1 = { sumbu: function () { return c; }, garis: function () { return ax; }, urut: function () { return urut; } };
    });
  };

  /* Kuas Cermin: tempel di kiri, bayangan muncul di kanan */
  Adegan.kuas = function (r, h3) {
    var M = [], ci = 2;
    var BENTUK = [
      { // kupu-kupu
        dasar: '<g opacity=".28" stroke="#fff" stroke-width="4" fill="#E9854F"><ellipse cx="190" cy="230" rx="100" ry="140" transform="rotate(-18 190 230)"/><ellipse cx="410" cy="230" rx="100" ry="140" transform="rotate(18 410 230)"/></g><rect x="290" y="110" width="20" height="250" rx="10" fill="#3B2A20"/>',
        dalam: function (x, y) { var a = 18 * Math.PI / 180, dx = x - 190, dy = y - 230, u = dx * Math.cos(a) - dy * Math.sin(a), v = dx * Math.sin(a) + dy * Math.cos(a); return x < 288 && (u / 100) * (u / 100) + (v / 140) * (v / 140) < 1; }
      },
      { // gunungan
        dasar: '<g opacity=".28" stroke="#fff" stroke-width="4" fill="#2E6B5E"><path d="M300 40C250 120 120 250 110 330Q110 420 300 420Q490 420 490 330C480 250 350 120 300 40Z"/></g><rect x="290" y="420" width="20" height="44" rx="6" fill="#8A5530"/>',
        dalam: function (x, y) { if (x >= 298 || y < 60 || y > 410) return false; var t = (y - 40) / 300, kiri = 300 - clamp(t, 0, 1) * 190; return x > kiri + 6; }
      }
    ][r];
    UI.ganti(function (app) {
      app.innerHTML = '<div class="layar layar-main">' + UI.kepala(STR.peta.stasiun + ' 1 · ' + STR.l1.kuasJudul, (r + 1) + '/2') +
        '<div class="kolom-kiri"><div class="kanvas-kartu tinggi kertas"><svg id="cv" viewBox="0 0 ' + W + ' ' + H + '" tabindex="0" role="application" aria-label="Kanvas kuas cermin. Enter menempel di titik acak sisi kiri."></svg></div></div>' +
        '<div class="kolom-kanan">' + UI.gelembung() +
        '<div class="panel kertas"><p class="panel-teks">' + STR.l1.kuasMulai + '</p><div class="kuas-pilih" id="kuas-warna"></div></div>' +
        '<div class="aksi">' + UI.tombol('k-undo', STR.tombol.hapusTerakhir, 'krem', IKON.kembali) + UI.tombol('k-ok', STR.tombol.selesai, 'hijau besar', IKON.cek) + '</div></div></div>';
      var cv = $('#cv');
      function warnaKuas() {
        $('#kuas-warna').innerHTML = BERAT.tingkat.map(function (T, j) { return '<button class="btn warna-kuas' + (j === ci ? ' pilih' : '') + '" data-j="' + j + '" aria-label="' + STR.tombol.warnaKuas + ' ' + T.nama + '" aria-pressed="' + (j === ci) + '"><i style="background:' + T.warna + '"></i><span>' + T.nama + '</span></button>'; }).join('');
      }
      function gambarUlang(baruSaja) {
        cv.innerHTML = '<rect width="' + W + '" height="' + H + '" fill="url(#serat)"/>' + BENTUK.dasar +
          '<line x1="300" x2="300" y1="0" y2="' + H + '" stroke="#7B4B94" stroke-width="4" stroke-dasharray="12 8"/>' +
          M.map(function (m, j) {
            var T = BERAT.tingkat[m.c];
            return '<g filter="url(#fv)" fill="' + T.warna + '" stroke="#fff" stroke-width="3"><circle cx="' + m.x.toFixed(1) + '" cy="' + m.y.toFixed(1) + '" r="17"/>' +
              '<circle class="' + (j === M.length - 1 && baruSaja ? 'bayang-baru' : '') + '" cx="' + (W - m.x).toFixed(1) + '" cy="' + m.y.toFixed(1) + '" r="17"/></g>';
          }).join('');
        $('#k-ok').disabled = M.length < 4;
      }
      function tempel(x, y) {
        if (!BENTUK.dalam(x, y)) { UI.kata(STR.l1.kuasLuar, 'berpikir', 'bingung'); Suara.lembut(); return false; }
        var akhir = M[M.length - 1];
        if (akhir && Math.hypot(akhir.x - x, akhir.y - y) < 22) return false;
        M.push({ x: x, y: y, c: ci }); Suara.kertas(); gambarUlang(true);
        UI.kata(M.length < 4 ? STR.l1.kuasLagi : STR.l1.kuasCukup, M.length < 4 ? 'senang' : 'bangga', M.length === 4 ? 'hore' : null);
        return true;
      }
      function titikDari(e) { var b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * W, (e.clientY - b.top) / b.height * H]; }
      var tekan = false;
      cv.onpointerdown = function (e) { tekan = true; cv.setPointerCapture(e.pointerId); var p = titikDari(e); tempel(p[0], p[1]); };
      cv.onpointermove = function (e) { if (!tekan) return; var p = titikDari(e), a = M[M.length - 1]; if (BENTUK.dalam(p[0], p[1]) && (!a || Math.hypot(a.x - p[0], a.y - p[1]) > 34)) tempel(p[0], p[1]); };
      cv.onpointerup = cv.onpointercancel = function () { tekan = false; };
      cv.onkeydown = function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        for (var n = 0; n < 200; n++) { var x = 60 + Math.random() * 230, y = 60 + Math.random() * 360; if (BENTUK.dalam(x, y) && tempel(x, y)) break; }
      };
      $('#kuas-warna').onclick = function (e) { var b = e.target.closest('[data-j]'); if (!b) return; ci = +b.dataset.j; warnaKuas(); UI.kata(isi(STR.l1.kuasWarna, { w: BERAT.tingkat[ci].nama }), 'senang'); };
      $('#k-undo').onclick = function () { M.pop(); gambarUlang(); };
      $('#k-ok').onclick = function () {
        if (M.length < 4) return;
        Suara.benar();
        if (r === 0) Adegan.kuas(1, h3); else Game.selesai(0, h3 === 0 ? 3 : h3 === 1 ? 2 : 1);
      };
      warnaKuas(); gambarUlang();
      UI.kata(STR.l1.kuasMulai, 'senang');
      Diam.isyarat = function () { UI.tunjuk(M.length < 4 ? Layar.titik(cv.getBoundingClientRect().left + cv.getBoundingClientRect().width * 0.33, cv.getBoundingClientRect().top + cv.getBoundingClientRect().height * 0.5) : $('#k-ok')); };
      if (MODE_UJI) window.__test.kuas = { tempel: tempel };
    });
  };
})();
