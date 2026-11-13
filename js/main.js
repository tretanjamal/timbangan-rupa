/* Keadaan gim, simpan, alur antarstasiun, kontrol global, dan kait uji (?test=1). */

var Game = (function () {
  function baru() {
    return { st: [0, 0, 0, 0, 0], petunjuk: [0, 0, 0, 0, 0], main: [0, 0, 0, 0, 0], jurnal: [], galeri: [], cat: [{}, {}, {}, {}, {}], l2: { tebak: 0, simpul: 0 }, adj: 0, beruntun: 0, gagalBeruntun: 0, pengunjung: 0 };
  }
  var S = baru();

  function simpan() {
    Simpan.tulis({ v: 5, S: S, atur: { musik: Pengaturan.musik, santai: Pengaturan.santai, bantuan: Pengaturan.bantuan, kurangi: Pengaturan.kurangi, baca: Pengaturan.baca } });
  }
  function muat() {
    var d = Simpan.baca();
    if (!d) return;
    if (d.S) {
      var b = baru();
      Object.keys(b).forEach(function (k) { if (d.S[k] != null) b[k] = d.S[k]; });
      ['st', 'petunjuk', 'main'].forEach(function (k) { b[k] = (Array.isArray(b[k]) ? b[k] : []).slice(0, 5).map(function (x) { return +x || 0; }); while (b[k].length < 5) b[k].push(0); });
      if (!Array.isArray(b.galeri)) b.galeri = [];
      if (!Array.isArray(b.jurnal)) b.jurnal = [];
      if (!Array.isArray(b.cat) || b.cat.length !== 5) b.cat = [{}, {}, {}, {}, {}];
      S = b;
    }
    if (d.atur) Object.keys(Pengaturan).forEach(function (k) { if (d.atur[k] != null) Pengaturan[k] = +d.atur[k] ? 1 : 0; });
    terapkanAtur();
  }
  function terapkanAtur() { document.body.classList.toggle('ra', !!Pengaturan.kurangi); }

  /* catat kesalahan per jenis miskonsepsi untuk Catatan Guru (terpisah dari jumlah petunjuk) */
  function catat(i, kode) { if (i == null) return; S.cat[i][kode] = (S.cat[i][kode] || 0) + 1; }

  function totalBintang() { return S.st.reduce(function (a, b) { return a + b; }, 0); }

  function adaptif(petunjuk) {
    if (petunjuk === 0) { S.beruntun++; S.gagalBeruntun = 0; if (S.beruntun >= 3) { S.adj = Math.max(-0.02, S.adj - BERAT.langkahAdaptif); S.beruntun = 0; } }
    else if (petunjuk >= 2) { S.gagalBeruntun++; S.beruntun = 0; if (S.gagalBeruntun >= 2) { S.adj = Math.min(0.03, S.adj + BERAT.langkahAdaptif); S.gagalBeruntun = 0; } }
    else S.beruntun = 0;
  }

  /* Kartu stasiun selesai: bintang muncul satu per satu dengan nada bertingkat */
  function selesai(i, bintang) {
    var lama = totalBintang();
    S.st[i] = Math.max(S.st[i], bintang);
    S.main[i] = 1;
    simpan();
    UI.hitungNaik($('#jml-bintang'), lama, totalBintang());
    var akhir = i >= 4;
    var m = UI.modal(
      '<div class="kartu-selesai"><img class="kartu-mira" src="' + ASET.img.miraBangga + '" alt="">' +
      '<h2>' + isi(STR.selesaiStasiun, { n: i + 1 }) + '</h2>' +
      '<div class="bintang-besar">' + [0, 1, 2].map(function (j) { return '<span class="bb" data-j="' + j + '">' + (j < bintang ? IKON.bintang : IKON.bintangKosong) + '</span>'; }).join('') + '</div>' +
      '<p class="kemampuan">' + IKON.cek + '<span>' + STR.keterampilan[i] + '</span></p></div>',
      { tanpaTutup: true, kelas: 'sempit' });
    var kaki = document.createElement('div');
    kaki.className = 'modal-kaki';
    kaki.innerHTML = UI.tombol('s-peta', STR.tombol.peta, 'krem', IKON.peta) +
      (akhir ? UI.tombol('s-lanjut', STR.tombol.hasil, 'hijau besar', IKON.lanjut) : UI.tombol('s-lanjut', STR.tombol.lanjut + ': ' + STR.peta.stasiun + ' ' + (i + 2), 'hijau besar', IKON.lanjut));
    $('.modal-isi', m).appendChild(kaki);
    $$('.bb', m).forEach(function (el, j) {
      el.style.opacity = 0;
      setTimeout(function () { el.style.opacity = 1; UI.letup(el); if (j < bintang) Suara.bintang(j); }, 350 + j * 380);
    });
    setTimeout(function () { UI.konfeti(Layar.pusat($('.bintang-besar', m)), 26); }, 350 + 3 * 380);
    $('#s-peta', m).onclick = function () { m.remove(); ke('peta'); };
    $('#s-lanjut', m).onclick = function () { m.remove(); ke(akhir ? 'hasil' : i + 1); };
    setTimeout(function () { var b = $('#s-lanjut', m); if (b) b.focus(); }, 60);
  }

  /* Pajang karya di galeri */
  function pajang(karya, lanjut) {
    S.galeri.push(karya);
    if (S.galeri.length > 24) S.galeri.shift();
    var tambah = 2 + Math.floor(Math.random() * 4);
    S.pengunjung += tambah;
    simpan();
    Suara.gunting(); setTimeout(Suara.benar, 120);
    var m = UI.modal(
      '<div class="kartu-pajang"><h2>' + STR.studio.dipajang + '</h2>' + bingkai(karya, 'besar') +
      '<p>' + isi(STR.studio.pengunjung, { n: tambah }) + '</p></div>', { tanpaTutup: true, kelas: 'sempit' });
    var kaki = document.createElement('div'); kaki.className = 'modal-kaki';
    kaki.innerHTML = UI.tombol('p-lanjut', STR.tombol.lanjut, 'hijau besar', IKON.lanjut);
    $('.modal-isi', m).appendChild(kaki);
    setTimeout(function () { UI.konfeti(Layar.pusat($('.bingkai', m)), 24); }, 200);
    $('#p-lanjut', m).onclick = function () { m.remove(); lanjut(); };
  }
  /* Karya dalam bingkai galeri (dipakai di layar pajang dan Hasil Belajarku) */
  function bingkai(karya, ukuran) {
    return '<figure class="bingkai ' + (ukuran || '') + '"><svg viewBox="0 0 600 340" role="img" aria-label="' + (karya.judul || '') + '">' +
      '<rect width="600" height="340" fill="url(#serat)"/>' + karya.L.map(function (p) { return Potongan.svg(p, null, { polos: true }); }).join('') + '</svg>' +
      (karya.judul ? '<figcaption>' + karya.judul + '</figcaption>' : '') + '</figure>';
  }

  function ke(tujuan) {
    if (typeof tujuan === 'number') { var nama = ['l1', 'l2', 'l3', 'l4', 'l5'][tujuan]; Game.stasiun = tujuan; return Adegan[nama](); }
    Game.stasiun = null;
    Adegan[tujuan]();
  }

  function aturan() {
    function baris(id, teks, nilai) {
      return '<label class="saklar"><span>' + teks + '</span><input type="checkbox" id="' + id + '"' + (nilai ? ' checked' : '') + '><i aria-hidden="true"></i></label>';
    }
    var m = UI.modal('<h2>' + STR.atur.judul + '</h2><div class="daftar-saklar">' +
      baris('a-musik', STR.atur.musik, Pengaturan.musik) + baris('a-santai', STR.atur.santai, Pengaturan.santai) +
      baris('a-bantuan', STR.atur.bantuan, Pengaturan.bantuan) + baris('a-kurangi', STR.atur.kurangi, Pengaturan.kurangi) + (Baca.ada() ? baris('a-baca', STR.atur.baca, Pengaturan.baca) : '') +
      '</div><p class="tengah">' + UI.tombol('a-hapus', STR.atur.hapus, 'krem kecil', IKON.hapus) + '</p>', { kelas: 'sempit', saatTutup: function () { if (Game.segarkan) Game.segarkan(); } });
    function ikat(id, k, f) { $('#' + id, m).onchange = function (e) { Pengaturan[k] = e.target.checked ? 1 : 0; terapkanAtur(); simpan(); if (f) f(); }; }
    ikat('a-musik', 'musik', Suara.musikAtur); ikat('a-santai', 'santai'); ikat('a-bantuan', 'bantuan'); ikat('a-kurangi', 'kurangi'); if ($('#a-baca', m)) ikat('a-baca', 'baca');
    $('#a-hapus', m).onclick = function () {
      var k = UI.modal('<h2>' + STR.atur.hapus + '</h2><p>' + STR.atur.yakin + '</p>', { kelas: 'sempit', kaki: UI.tombol('a-ya', STR.tombol.ya, 'jingga', IKON.hapus) });
      $('#a-ya', k).onclick = function () { S = baru(); simpan(); k.remove(); m.remove(); ke('judul'); };
    };
  }

  function layarPenuh() {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () { UI.modal('<h2>' + STR.tombol.layarPenuh + '</h2><p>' + STR.atur.fsGagal + '</p>', { kelas: 'sempit' }); });
      else UI.modal('<h2>' + STR.tombol.layarPenuh + '</h2><p>' + STR.atur.fsGagal + '</p>', { kelas: 'sempit' });
    } catch (e) { UI.modal('<p>' + STR.atur.fsGagal + '</p>', { kelas: 'sempit' }); }
  }

  /* Kontrol global lewat delegasi: bunyi klik untuk semua tombol, beranda, suara, layar penuh, pengaturan */
  document.addEventListener('pointerdown', function (e) { var b = e.target.closest('button'); if (b && !b.disabled) Suara.klik(); }, true);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.id === 'k-beranda') ke('judul');
    else if (b.id === 'k-suara') { var n = Suara.alih(); $$('#k-suara').forEach(function (x) { x.innerHTML = n ? IKON.suaraNyala : IKON.suaraMati; }); }
    else if (b.id === 'k-penuh') layarPenuh();
    else if (b.id === 'k-atur') aturan();
    else if (b.id === 'k-baca') { var g = $('#gelembung p'); if (g) Baca.ucap(g.textContent); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && document.activeElement && document.activeElement.tagName === 'BUTTON') Suara.klik(); });

  return {
    get S() { return S; }, simpan: simpan, muat: muat, catat: catat, totalBintang: totalBintang, adaptif: adaptif,
    selesai: selesai, pajang: pajang, bingkai: bingkai, ke: ke, stasiun: null, segarkan: null
  };
})();

/* Bintang dari jumlah petunjuk: tanpa petunjuk ke-3 = 3 bintang */
function bintangDari(petunjuk) { return petunjuk === 0 ? 3 : petunjuk < 3 ? 2 : 1; }
function bintangDariCoba(pertama, total) { return pertama >= total ? 3 : pertama >= Math.ceil(total / 2) ? 2 : 1; }

(function boot() {
  addEventListener('resize', Layar.pas);
  addEventListener('orientationchange', Layar.pas);
  document.addEventListener('fullscreenchange', Layar.pas);
  Layar.pas();
  UI.pasangTangan();
  $('#putar p').textContent = STR.putar;
  $('#defs').innerHTML = Potongan.DEFS;
  Game.muat();
  if (MODE_UJI) window.__test = { Game: Game, Potongan: Potongan, ke: Game.ke, Pengaturan: Pengaturan };
  Adegan.muat();
})();
