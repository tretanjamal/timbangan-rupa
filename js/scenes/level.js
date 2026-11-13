/* Stasiun 3 (asimetris), 4 (radial), 5 (Pameran Kelas) dan layar pilihan kartu. */

var IKON_JENIS = {
  sim: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6Q8 30 30 58" fill="#2E6B5E" stroke="#fff" stroke-width="2"/><path d="M32 6Q56 30 34 58" fill="#2E6B5E" stroke="#fff" stroke-width="2"/><path d="M32 2v60" stroke="#7B4B94" stroke-width="3" stroke-dasharray="5 4"/></svg>',
  asi: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="22" cy="30" r="15" fill="#2E6B5E" stroke="#fff" stroke-width="2"/><circle cx="50" cy="20" r="7" fill="#E9854F" stroke="#fff" stroke-width="2"/><circle cx="54" cy="40" r="6" fill="#E9854F" stroke="#fff" stroke-width="2"/><path d="M6 54h52" stroke="#B9773F" stroke-width="4" stroke-linecap="round"/><path d="M32 54l-5 8h10z" fill="#B9773F"/></svg>',
  rad: '<svg viewBox="0 0 64 64" aria-hidden="true">' + [0, 1, 2, 3, 4, 5].map(function (j) { return '<ellipse cx="32" cy="14" rx="7" ry="12" fill="#E9854F" stroke="#fff" stroke-width="2" transform="rotate(' + j * 60 + ' 32 32)"/>'; }).join('') + '<circle cx="32" cy="32" r="8" fill="#7B4B94" stroke="#fff" stroke-width="2"/></svg>'
};

/* Layar pilihan: kiri gambar/kartu, kanan Mira + tombol pilihan */
Adegan.pilih = function (o) {
  var coba = 0;
  UI.ganti(function (app) {
    app.innerHTML = '<div class="layar layar-main">' + UI.kepala(o.judul, o.langkah) +
      '<div class="kolom-kiri"><div class="kanvas-kartu tinggi kertas pusat-isi">' + o.kiri + '</div></div>' +
      '<div class="kolom-kanan">' + UI.gelembung() + '<div class="pilihan" id="pl">' +
      o.opsi.map(function (x, j) { return '<button class="btn kartu-kalimat' + (x.ikon ? ' berikon' : '') + '" data-j="' + j + '">' + (x.ikon || '') + '<span>' + x.teks + '</span></button>'; }).join('') + '</div></div></div>';
    UI.kata(o.pesan, 'berpikir');
    Diam.isyarat = function () { UI.tunjuk($('#pl button:not([disabled])')); };
    $('#pl').onclick = function (e) {
      var b = e.target.closest('[data-j]'); if (!b || b.disabled) return;
      coba++;
      if (o.opsi[+b.dataset.j].id === o.benar) {
        Suara.benar(); UI.konfeti(Layar.pusat(b), 16); UI.kata(o.benarPesan || acak(STR.benarAcak), 'bangga', 'hore');
        $('#pl').onclick = null; b.classList.add('benar');
        setTimeout(function () { o.lanjut(coba === 1); }, 1100);
      } else {
        Game.catat(Game.stasiun, o.kode ? o.kode(o.opsi[+b.dataset.j].id) : 'salah');
        b.disabled = true; Suara.lembut(); UI.goyang(b); UI.kata(typeof o.salahPesan === 'function' ? o.salahPesan(o.opsi[+b.dataset.j].id) : o.salahPesan, 'berpikir', 'bingung');
      }
    };
    setTimeout(function () { var b = $('#pl button'); if (b) b.focus({ preventScroll: true }); }, 350);
  });
};

/* ---------- Stasiun 3: Seimbang Tanpa Kembar ---------- */
Adegan.l3 = function () {
  var antre = TEKA.map(function (_, id) { return { id: id }; }), k = 0, pertama = 0;
  function cermin(L) { return L.map(function (p) { var q = {}; for (var x in p) q[x] = p[x]; q.x = BERAT.lebar - p.x; q.fl = -(p.fl || 1); return q; }); }
  /* Generator: templat diacak sisi dan jaraknya, lalu dipastikan solver menemukan solusi asimetris */
  function variasi(T) {
    for (var n = 0; n < 30; n++) {
      var sisi = Math.random() < 0.5 ? -1 : 1, f = 0.85 + Math.random() * 0.3;
      var L = T.map(function (p) { var q = {}; for (var x in p) q[x] = p[x]; var asal = p.x < BERAT.pusatX ? -1 : 1; q.x = clamp(BERAT.pusatX + sisi * asal * Math.abs(p.x - BERAT.pusatX) * f, 70, BERAT.lebar - 70); if (sisi * asal < 0) q.fl = -(p.fl || 1); return q; });
      if (Potongan.solusi(L, Game.S.adj)) return L;
    }
    return cermin(T);
  }
  function main() {
    var q = antre[k], awal = k === 0 && !q.ulang ? TEKA[q.id] : variasi(TEKA[q.id]);
    Adegan.studio({
      stasiun: 2, mode: 'asi', awal: awal, ulang: k > 0,
      judul: STR.peta.stasiun + ' 3 · ' + STR.l3.judul, langkah: (k + 1) + '/' + antre.length,
      pesan: STR.l3.pesan, h1: STR.l3.h1, h3: STR.l3.h3,
      h2: function (c) { return c.b.M > 0 ? STR.l3.h2kanan : STR.l3.h2kiri; },
      judulKarya: STR.jenisPendek.asi + ' ' + (k + 1),
      selesai: function (h) {
        if (h === 0) pertama++;
        if (h >= 2 && !q.ulang) antre.push({ id: q.id, ulang: true }); // soal serupa di akhir level
        k++;
        if (k >= antre.length) Game.selesai(2, bintangDariCoba(pertama, antre.length)); else main();
      }
    });
  }
  main();
};

/* ---------- Stasiun 4: Pusat Memancar ---------- */
Adegan.l4 = function () {
  var k = 0, pertama = 0;
  /* Pengenalan dulu: mana benda yang radial? (miskonsepsi: radial = simetris) */
  function kenal() {
    Adegan.pilih({
      judul: STR.peta.stasiun + ' 4 · ' + STR.l4.judul, langkah: STR.l4.kenalLangkah,
      kiri: '<div class="banding"><figure>' + IKON_JENIS.sim + '<figcaption>' + STR.l4.kenalSim + '</figcaption></figure><figure>' + IKON_JENIS.rad + '<figcaption>' + STR.l4.kenalRad + '</figcaption></figure></div>',
      pesan: STR.l4.kenalTanya, benar: 'tampah', benarPesan: STR.l4.kenalBenar,
      opsi: kocok(['joglo', 'tampah', 'tree']).map(function (k) { return { id: k, teks: POTONGAN[k].nama, ikon: Potongan.ikon(k, 1) }; }),
      salahPesan: function (id) { return STR.l4.kenalSalah[id]; }, kode: function (id) { return 'radial dikira ' + POTONGAN[id].nama.toLowerCase(); },
      lanjut: function () { main(); }
    });
  }
  function main() {
    Adegan.studio({
      stasiun: 3, mode: 'rad', ulang: k > 0,
      judul: STR.peta.stasiun + ' 4 · ' + STR.l4.judul, langkah: (k + 1) + '/3',
      pesan: STR.l4.pesan[k], h1: k === 1 ? STR.l4.h1dua : STR.l4.h1, h2: STR.l4.h2, h3: STR.l4.h3,
      syarat: k === 1 ? function (milik) {
        if (milik.length < 2) return STR.l4.syaratDua;
        var r = milik.map(function (p) { return Math.hypot(p.x - BERAT.pusatX, p.y - BERAT.pusatY); });
        return Math.max.apply(null, r) - Math.min.apply(null, r) < 40 ? STR.l4.syaratLingkar : '';
      } : null,
      judulKarya: STR.jenisPendek.rad + ' ' + (k + 1),
      selesai: function (h) { if (h === 0) pertama++; k++; if (k >= 3) Game.selesai(3, bintangDariCoba(pertama, 3)); else main(); }
    });
  }
  kenal();
};

/* ---------- Stasiun 5: Pameran Kelas ---------- */
Adegan.l5 = function () {
  var o = 0, pertama = 0, total = 0;
  var judul = function () { return STR.peta.stasiun + ' 5 · ' + STR.l5.judul; };
  function catat(ok) { total++; if (ok) pertama++; }
  function kartuPesanan(teks, ikon) {
    return '<div class="kartu-pesanan"><div class="pin"></div><span class="kp-label">' + STR.l5.judul + '</span>' + (ikon || '') + '<p>' + teks + '</p></div>';
  }
  function pilihJenis() {
    var pesanan = STR.l5.pesanan[o];
    Adegan.pilih({
      judul: judul(), langkah: (o + 1) + '/3', kiri: kartuPesanan(pesanan),
      pesan: isi(STR.l5.pilih, { o: pesanan.toLowerCase() }), benar: PESANAN[o][0],
      salahPesan: function (id) { return STR.l5.salahJenis[PESANAN[o][0] + '-' + id] || STR.l5.salahPilih; },
      kode: function (id) { return STR.jenisPendek[PESANAN[o][0]].toLowerCase() + ' dikira ' + STR.jenisPendek[id].toLowerCase(); },
      opsi: ['sim', 'asi', 'rad'].map(function (m) { return { id: m, teks: STR.jenis[m], ikon: IKON_JENIS[m] }; }),
      lanjut: function (ok) { catat(ok); susun(PESANAN[o][0]); }
    });
  }
  function susun(m) {
    var pesanan = STR.l5.pesanan[o];
    Adegan.studio({
      stasiun: 4, mode: m, ulang: true,
      judul: judul(), langkah: (o + 1) + '/3',
      pesan: isi(STR.l5.susun, { o: pesanan.toLowerCase(), m: STR.jenis[m] }),
      h1: m === 'asi' ? STR.l5.h1asi : STR.l5.h1, h2: m === 'asi' ? function (c) { return c.b.M > 0 ? STR.l3.h2kanan : STR.l3.h2kiri; } : STR.l5.h1, h3: m === 'asi' ? STR.l3.h3 : STR.l5.h3,
      judulKarya: pesanan,
      selesai: function (h) { catat(h === 0); tanggapan(m); }
    });
  }
  function tanggapan(m) {
    Adegan.pilih({
      judul: judul(), langkah: (o + 1) + '/3', kiri: Game.bingkai(Game.S.galeri[Game.S.galeri.length - 1], 'besar'),
      pesan: STR.l5.tanggapan, benar: m,
      salahPesan: function (id) { return isi(STR.l5.tanggapanSalah, { x: STR.jenisPendek[id].toLowerCase(), m: STR.jenisPendek[m].toLowerCase(), a: STR.l5.alasan[m] }); },
      kode: function () { return 'tanggapan tidak cocok'; },
      opsi: kocok(['sim', 'asi', 'rad']).map(function (x) { return { id: x, teks: isi(STR.l5.kalimat, { m: STR.jenisPendek[x].toLowerCase() + ' (' + STR.jenisAnak[x] + ')', a: STR.l5.alasan[x] }) }; }),
      lanjut: function (ok) { catat(ok); o++; if (o > 2) bebas(); else pilihJenis(); }
    });
  }
  function bebas() {
    Adegan.studio({
      stasiun: 4, mode: 'bebas', ulang: true,
      judul: judul(), langkah: STR.l5.bebasJudul,
      pesan: STR.l5.bebas, h1: STR.l5.bebasH1, h2: STR.l5.bebasH1, h3: STR.l5.bebasH3,
      judulKarya: STR.l5.bebasJudul,
      selesai: function (h, c) {
        var seimbang = c.b.ok ? 1 : 0;
        Adegan.pilih({
          judul: judul(), langkah: STR.l5.bebasJudul, kiri: Game.bingkai(Game.S.galeri[Game.S.galeri.length - 1], 'besar'),
          pesan: STR.l5.bebasTanya, benar: seimbang, salahPesan: STR.l5.bebasSalah,
          opsi: [{ id: 1, teks: STR.l5.bebasKalimat[0] }, { id: 0, teks: STR.l5.bebasKalimat[1] }],
          lanjut: function (ok) { catat(ok); contoh(0); }
        });
      }
    });
  }
  function contoh(n) {
    var C = CONTOH[n];
    Adegan.pilih({
      judul: judul(), langkah: (n + 1) + '/2', kiri: Game.bingkai({ judul: '', L: C.L }, 'besar'),
      pesan: STR.l5.contohTanya, benar: C.jenis, salahPesan: STR.l5.contohSalah[C.jenis], kode: function (id) { return 'contoh ' + STR.jenisPendek[C.jenis].toLowerCase() + ' dikira ' + STR.jenisPendek[id].toLowerCase(); },
      benarPesan: STR.l5.contohBenar,
      opsi: ['sim', 'asi', 'rad'].map(function (m) { return { id: m, teks: STR.jenis[m], ikon: IKON_JENIS[m] }; }),
      lanjut: function (ok) { catat(ok); if (n === 0) contoh(1); else Game.selesai(4, bintangDariCoba(pertama, total)); }
    });
  }
  pilihJenis();
};
