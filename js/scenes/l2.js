/* Stasiun 2: Percobaan Berat Visual (satu variabel per percobaan). TP2, tag: berat-visual. */
Adegan.l2 = function () {
  var i = 0, simpulPertama = 0, tebakBenar = 0, tb = null;
  var ARAH = [
    '<svg viewBox="0 0 48 32" aria-hidden="true"><path d="M4 24L44 8" stroke="currentColor" stroke-width="5" stroke-linecap="round" transform="rotate(0)"/><path d="M24 17l-6 13h12z" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 48 32" aria-hidden="true"><path d="M4 14H44" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M24 15l-6 13h12z" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 48 32" aria-hidden="true"><path d="M4 8L44 24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M24 17l-6 13h12z" fill="currentColor"/></svg>'
  ];
  UI.ganti(function (app) {
    app.innerHTML = '<div class="layar layar-main">' + UI.kepala(STR.peta.stasiun + ' 2 · ' + STR.l2.judul, '<span id="l2-langkah"></span>') +
      '<div class="kolom-kiri"><div class="kanvas-kartu kertas"><svg id="cv" viewBox="0 0 600 340" role="img" aria-label="Kanvas percobaan"></svg></div><div class="timbangan" id="tb"></div></div>' +
      '<div class="kolom-kanan">' + UI.gelembung() +
      '<div class="panel kertas" id="l2-panel"></div><div class="pilihan" id="l2-pilih"></div></div></div>';
    tb = Timbangan($('#tb'));
    jalan();
  });

  function jalan() {
    var e = PERCOBAAN[i], L = e.kiri.concat(e.kanan), hasil = Potongan.timbang(L), jawab = hasil.ok ? 0 : Math.sign(hasil.M);
    $('#l2-langkah').textContent = (i + 1) + '/4';
    $('#cv').innerHTML = '<rect width="600" height="340" fill="url(#serat)"/><line x1="300" x2="300" y1="10" y2="330" stroke="#CDBFA9" stroke-width="2" stroke-dasharray="8 8"/>' +
      L.map(function (p) { return Potongan.svg(p, null, { polos: true }); }).join('') +
      '<text class="label-kanvas" x="150" y="318" text-anchor="middle">' + e.label[0] + '</text><text class="label-kanvas" x="450" y="318" text-anchor="middle">' + e.label[1] + '</text>';
    tb.atur({ ok: true, M: 0, sudut: 0 }, false);
    $('#l2-panel').innerHTML = '<p class="panel-teks"><b>' + (e.kunci ? isi(STR.l2.beda, { v: e.v }) : e.beda) + '</b></p>' + (e.kunci ? '<p class="kunci-teks"><svg viewBox="-16 -16 32 32" aria-hidden="true">' + IKON.gembok + '</svg>' + STR.l2.terkunci + '</p>' : '');
    $('#l2-pilih').innerHTML = [-1, 0, 1].map(function (g) { return UI.tombol('g' + (g + 1), STR.l2.tebak[g + 1], 'jingga tebak', ARAH[g + 1], 'data-g="' + g + '"'); }).join('');
    UI.kata(isi(STR.l2.tanya, { n: i + 1, v: e.v.toLowerCase() }), 'berpikir');
    Diam.isyarat = function () { UI.tunjuk($('#g1')); };
    if (i === 0 && !Game.S.main[1]) setTimeout(function () { UI.tunjuk($('#g1')); }, 900);

    $('#l2-pilih').onclick = function (ev) {
      var b = ev.target.closest('[data-g]'); if (!b) return;
      var g = +b.dataset.g, benar = g === jawab;
      tb.atur(hasil, true);
      if (benar) { tebakBenar++; Suara.benar(); UI.konfeti(Layar.pusat(b), 12); } else Suara.lembut();
      Game.S.jurnal[i] = { q: e.v, g: STR.l2.tebakKecil[g + 1], r: STR.l2.tebakKecil[jawab + 1], c: e.benar, ok: benar };
      Game.simpan();
      UI.kata(benar ? STR.l2.tebakBenar : e.umpan, benar ? 'bangga' : 'berpikir', benar ? 'hore' : 'bingung');
      setTimeout(kesimpulan, 500);
    };

    function kesimpulan() {
      var coba = 0, kartu = kocok([e.benar].concat(e.pengecoh));
      $('#l2-pilih').innerHTML = kartu.map(function (k, j) { return '<button class="btn kartu-kalimat" data-k="' + j + '">' + k + '</button>'; }).join('');
      Diam.isyarat = function () { UI.tunjuk($('#tb')); };
      $('#l2-pilih').onclick = function (ev) {
        var b = ev.target.closest('[data-k]'); if (!b || b.disabled) return;
        coba++;
        if (kartu[+b.dataset.k] === e.benar) {
          if (coba === 1) simpulPertama++;
          Suara.benar(); UI.konfeti(Layar.pusat(b), 16);
          UI.kata(e.benar, 'bangga', 'hore');
          $('#l2-pilih').onclick = null;
          $('#l2-pilih').innerHTML = '<p class="simpul-ok">' + IKON.cek + '<span>' + e.benar + '</span></p>' + UI.tombol('l2-lanjut', STR.tombol.lanjut, 'hijau besar', IKON.lanjut);
          $('#l2-lanjut').focus();
          Diam.isyarat = function () { UI.tunjuk($('#l2-lanjut')); };
          $('#l2-lanjut').onclick = function () {
            i++;
            if (i > 3) { Game.S.l2 = { tebak: tebakBenar, simpul: simpulPertama }; Game.adaptif(simpulPertama >= 3 ? 0 : 2); Game.selesai(1, simpulPertama >= 4 ? 3 : simpulPertama >= 3 ? 2 : 1); }
            else jalan();
          };
        } else {
          b.disabled = true; Suara.lembut(); UI.goyang(b);
          var pi = e.pengecoh.indexOf(kartu[+b.dataset.k]);
          UI.kata(pi >= 0 ? e.tanggap[pi] : STR.l2.kesimpulanSalah, 'berpikir', 'bingung');
          Game.catat(1, 'simpulSalah');
        }
      };
    }
    if (MODE_UJI) window.__test.l2 = { jawab: function () { return jawab; }, benar: function () { return e.benar; } };
  }
};
