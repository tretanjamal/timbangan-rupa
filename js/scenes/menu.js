/* Layar muat, layar judul, panel informasi, dan Peta Galeri. */

Adegan.muat = function () {
  var app = $('#app');
  app.innerHTML = '<div class="layar layar-muat"><div class="mira besar"><img src="' + ASET.img.miraSenang + '" alt=""></div>' +
    '<h1 class="logo kecil">' + STR.judul + '</h1><div class="bar"><i id="bar-isi"></i></div><p>' + STR.muat + '</p></div>';
  var t0 = performance.now();
  Muat.semua(function (f) { var b = $('#bar-isi'); if (b) b.style.width = Math.round(f * 100) + '%'; }).then(function () {
    setTimeout(function () { Game.ke('judul'); }, Math.max(0, 500 - (performance.now() - t0)));
  });
};

/* Dua karya contoh di bingkai dinding layar judul: simetris (kiri) dan radial (kanan) */
function karyaJudul() {
  var P = function (k, t, sz, x, y, a, fl) { return Potongan.svg({ k: k, t: t, s: sz, x: x, y: y, a: a || 0, fl: fl || 1 }, null, { polos: true }); };
  var sim = P('kite', 2, 92, 100, 64) + P('bird', 1, 44, 36, 40) + P('bird', 1, 44, 164, 40, 0, -1) + P('flower', 0, 36, 40, 104) + P('flower', 0, 36, 160, 104);
  var rad = '';
  for (var j = 0; j < 8; j++) { var a = j * Math.PI / 4; rad += P('leaf', j % 2 ? 1 : 2, 34, 100 + 42 * Math.cos(a), 68 + 42 * Math.sin(a), j * 45 + 90); }
  rad += P('sun', 1, 40, 100, 68);
  return '<svg class="karya-dinding kd-kiri" viewBox="0 0 200 136" aria-hidden="true"><rect width="200" height="136" fill="url(#serat)"/>' + sim + '</svg>' +
    '<svg class="karya-dinding kd-kanan" viewBox="0 0 200 136" aria-hidden="true"><rect width="200" height="136" fill="url(#serat)"/>' + rad + '</svg>';
}

Adegan.judul = function () {
  UI.ganti(function (app) {
    var kertas = '';
    for (var i = 0; i < 9; i++) kertas += '<i class="melayang m' + i + '"></i>';
    app.innerHTML = '<div class="layar layar-judul">' + kertas +
      '<div class="judul-kontrol">' + UI.kontrol() + '</div>' +
      '<div class="mira judul-mira"><img src="' + ASET.img.miraBangga + '" alt="Mira si merak"></div>' +
      karyaJudul() +
      '<div class="judul-kartu kertas"><span class="pita-lab">' + STR.jenisMedia + '</span><h1 class="logo">' + STR.judul + '</h1><p>' + STR.subjudul + ' · ' + STR.mapel + '</p></div>' +
      UI.tombol('j-mulai', Game.totalBintang() ? STR.lanjutMain : STR.mulai, 'hijau raksasa', IKON.lanjut) +
      '<nav class="judul-menu">' +
      UI.tombol('j-info', STR.tombol.info, 'ungu', IKON.info) + UI.tombol('j-ref', STR.tombol.ref, 'ungu', IKON.buku) +
      UI.tombol('j-dev', STR.tombol.dev, 'ungu', IKON.orang) + UI.tombol('j-jurnal', STR.tombol.jurnal, 'ungu', IKON.jurnal) +
      '</nav></div>';
    $('#j-mulai').onclick = function () { Suara.siap(); Suara.musikMulai(); Suara.ting(); Game.ke('peta'); };
    $('#j-info').onclick = function () { UI.modal(STR.info); };
    $('#j-ref').onclick = function () { UI.modal(STR.ref); };
    $('#j-dev').onclick = Adegan.pengembang;
    $('#j-jurnal').onclick = Adegan.jurnal;
    Diam.isyarat = function () { UI.tunjuk($('#j-mulai')); };
    setTimeout(function () { var b = $('#j-mulai'); if (b) b.focus({ preventScroll: true }); }, 350);
  });
};

Adegan.pengembang = function () {
  var n = 0;
  var m = UI.modal('<div class="dev-geser">' + UI.tombolIkon('d-kiri', IKON.kembali, STR.tombol.sebelum, 'krem') + '<div class="dev" id="d-isi"></div>' + UI.tombolIkon('d-kanan', IKON.lanjut, STR.tombol.berikut, 'krem') + '</div>');
  function tampil() { $('#d-isi', m).innerHTML = STR.dev[n]; }
  tampil();
  $('#d-kiri', m).onclick = $('#d-kanan', m).onclick = function () { n = 1 - n; tampil(); };
};

Adegan.jurnal = function () {
  var J = Game.S.jurnal.filter(Boolean);
  UI.modal('<h2>' + STR.jurnal.judul + '</h2>' + (J.length ? '<ul class="jurnal">' + J.map(function (x) {
    return '<li class="' + (x.ok ? 'ok' : '') + '">' + isi(STR.jurnal.baris, x) + '</li>';
  }).join('') + '</ul>' : '<p>' + STR.jurnal.kosong + '</p>'));
};

/* Ilustrasi kecil untuk kartu stasiun */
function ilustrasiStasiun(i) {
  var P = function (k, t, s, x, y, extra) { return Potongan.svg({ k: k, t: t, s: s, x: x, y: y, a: extra || 0 }, null, { polos: true }); };
  var isiG = [
    P('kite', 1, 96, 90, 62) + '<line x1="90" y1="6" x2="90" y2="122" stroke="#7B4B94" stroke-width="4" stroke-dasharray="8 6"/>',
    '<rect x="30" y="76" width="120" height="10" rx="5" fill="#C9965A" transform="rotate(-10 90 81)"/><path d="M90 84l16 34H74z" fill="#B9773F"/>' + P('sun', 1, 34, 45, 70) + P('sun', 2, 54, 128, 46),
    P('tree', 1, 80, 62, 66) + P('star', 2, 30, 132, 40) + P('bird', 1, 34, 150, 92) + '<line x1="90" y1="8" x2="90" y2="122" stroke="#CDBFA9" stroke-width="2" stroke-dasharray="5 5"/>',
    (function () { var o = ''; for (var j = 0; j < 6; j++) { var a = j * Math.PI / 3; o += P('leaf', 2, 40, 90 + 34 * Math.cos(a), 64 + 34 * Math.sin(a), j * 60 + 90); } return o + P('flower', 1, 34, 90, 64); })(),
    '<rect x="44" y="12" width="92" height="74" rx="4" fill="#C9965A" stroke="#fff" stroke-width="3"/><rect x="54" y="22" width="72" height="54" fill="#FFFDF7"/>' + P('sun', 1, 26, 74, 42) + P('tri', 2, 34, 104, 60) + '<path d="M60 86l-12 36M120 86l12 36M90 86v30" stroke="#8A5530" stroke-width="5" stroke-linecap="round"/>'
  ][i];
  return '<svg viewBox="0 0 180 128" aria-hidden="true">' + isiG + '</svg>';
}

Adegan.peta = function () {
  UI.ganti(function (app) {
    var S = Game.S, saran = S.st.findIndex(function (b) { return !b; });
    app.innerHTML = '<div class="layar layar-main">' + UI.kepala(STR.peta.judul) +
      '<div class="peta-sapa">' + UI.gelembung() + '</div>' +
      '<div class="peta-kartu">' + STR.stasiun.map(function (st, i) {
        return '<button class="kartu-stasiun' + (i === saran ? ' saran' : '') + (S.st[i] ? ' tuntas' : '') + '" data-i="' + i + '">' +
          (i === saran ? '<span class="pita">' + STR.peta.mulaiSini + '</span>' : '') +
          '<span class="ks-gambar">' + ilustrasiStasiun(i) + '</span>' +
          '<span class="ks-no">' + STR.peta.stasiun + ' ' + (i + 1) + '</span>' +
          '<span class="ks-nama">' + st.nama + '</span><span class="ks-kata">' + st.kata + '</span>' + UI.bintang(S.st[i]) + '</button>';
      }).join('') + '</div>' +
      '<div class="peta-bawah">' + UI.tombol('p-jurnal', STR.tombol.jurnal, 'ungu', IKON.jurnal) + UI.tombol('p-hasil', STR.tombol.hasil, 'jingga', IKON.bintang) + '</div></div>';
    UI.kata(STR.peta.sapa, 'senang');
    $('.peta-kartu').onclick = function (e) { var b = e.target.closest('[data-i]'); if (b) { Suara.ting(); Game.ke(+b.dataset.i); } };
    $('#p-jurnal').onclick = Adegan.jurnal;
    $('#p-hasil').onclick = function () { Game.ke('hasil'); };
    var target = $('.kartu-stasiun.saran') || $('#p-hasil');
    Diam.isyarat = function () { UI.tunjuk(target); };
    if (saran === 0) setTimeout(function () { UI.tunjuk(target); }, 900);
    setTimeout(function () { if (target) target.focus({ preventScroll: true }); }, 350);
  });
};
