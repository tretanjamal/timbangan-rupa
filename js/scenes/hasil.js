/* Layar Hasil Belajarku: keterampilan (bahasa anak), galeri karya, Catatan untuk Guru, sertifikat. */
Adegan.hasil = function () {
  var S = Game.S, total = Game.totalBintang(), semua = S.main.every(Boolean);
  var IKON_ST = [IKON_JENIS.sim, '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 30L56 22" stroke="#B9773F" stroke-width="6" stroke-linecap="round"/><path d="M32 28l-8 26h16z" fill="#B9773F"/><circle cx="16" cy="20" r="8" fill="#E9854F"/><circle cx="48" cy="10" r="10" fill="#2E6B5E"/></svg>', IKON_JENIS.asi, IKON_JENIS.rad,
    '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="6" width="44" height="36" rx="3" fill="#C9965A"/><rect x="16" y="12" width="32" height="24" fill="#FFFDF7"/><circle cx="26" cy="22" r="5" fill="#E9854F"/><path d="M30 34l8-12 8 12z" fill="#2E6B5E"/><path d="M20 42l-6 18M44 42l6 18" stroke="#8A5530" stroke-width="4" stroke-linecap="round"/></svg>'];
  UI.ganti(function (app) {
    var galeri = S.galeri.slice(-4).reverse();
    app.innerHTML = '<div class="layar layar-main">' + UI.kepala(STR.hasil.judul) +
      '<div class="kolom-kiri"><div class="hasil-kartu kertas">' +
      '<div class="hasil-atas"><div class="mira" id="mira"><img src="' + ASET.img.miraBangga + '" alt="Mira"></div>' +
      '<div><p class="hasil-sapa">' + (semua ? STR.hasil.sapa : STR.hasil.sapaBelum) + '</p>' +
      '<p class="hasil-total">' + IKON.bintang + '<b id="h-total">0</b><span>/ 15 ' + STR.hasil.totalBintang + '</span></p></div></div>' +
      '<ul class="kemampuan-daftar">' + STR.keterampilan.map(function (k, i) {
        var st = S.st[i], label = !S.main[i] ? STR.hasil.belum : st >= 2 ? STR.hasil.dikuasai : STR.hasil.berlatih;
        return '<li class="' + (!S.main[i] ? 'belum' : st >= 2 ? 'bisa' : 'latih') + '" data-i="' + i + '"><span class="km-ikon">' + IKON_ST[i] + '</span><span class="km-teks">' + k + '</span><span class="km-status"><em>' + label + '</em>' + UI.bintang(st, 'kecil') + '</span></li>';
      }).join('') + '</ul></div></div>' +
      '<div class="kolom-kanan"><div class="galeri-dinding kertas"><h2>' + STR.hasil.galeri + '</h2>' +
      (galeri.length ? '<div class="galeri-grid">' + galeri.map(function (g) { return Game.bingkai(g); }).join('') + '</div>' : '<p class="kosong">' + STR.hasil.galeriKosong + '</p>') + '</div>' +
      '<div class="hasil-tombol">' + UI.tombol('h-guru', STR.tombol.guru, 'ungu', IKON.guru) + UI.tombol('h-cetak', STR.tombol.cetak, 'jingga', IKON.cetak) +
      UI.tombol('h-peta', STR.tombol.peta, 'krem', IKON.peta) + UI.tombol('h-ulang', STR.tombol.mainLagi, 'krem', IKON.ulang) + '</div></div></div>';

    UI.hitungNaik($('#h-total'), 0, total);
    $$('.kemampuan-daftar li').forEach(function (li, i) {
      li.style.opacity = 0;
      setTimeout(function () { li.style.opacity = 1; UI.letup(li); if (S.st[i] >= 2) Suara.bintang(i); }, 300 + i * 260);
    });
    if (semua) { setTimeout(function () { Suara.meriah(); UI.konfeti([380, 200], 30); }, 300 + 5 * 260); UI.mira('bangga', 'hore'); }
    $('#h-guru').onclick = catatanGuru;
    $('#h-cetak').onclick = sertifikat;
    $('#h-peta').onclick = function () { Game.ke('peta'); };
    $('#h-ulang').onclick = function () {
      var m = UI.modal('<h2>' + STR.tombol.mainLagi + '</h2><p>' + STR.atur.yakin + '</p>', { kelas: 'sempit', kaki: UI.tombol('u-ya', STR.tombol.ya, 'jingga', IKON.ulang) });
      $('#u-ya', m).onclick = function () { Simpan.hapus(); location.reload(); };
    };
    Diam.isyarat = function () { UI.tunjuk($('#h-cetak')); };
  });

  function catatanGuru() {
    var baris = STR.stasiun.map(function (st, i) {
      var c = S.cat[i] || {}, daftar = Object.keys(c).map(function (k) { return k + ' (' + c[k] + 'x)'; });
      var cat = !S.main[i] ? STR.guru.belum : (i === 1 ? isi(STR.guru.l2, { a: S.l2.tebak, b: S.l2.simpul }) + ' ' : '') + (daftar.length ? STR.guru.salah + daftar.join(', ') + '.' : STR.guru.tanpaSalah + '.');
      return '<tr><td>' + (i + 1) + '. ' + st.nama + '</td><td>' + STR.guru.tag[i] + '</td><td>' + (S.main[i] ? S.st[i] + '/3' : '-') + '</td><td>' + (S.main[i] ? S.petunjuk[i] : '-') + '</td><td>' + cat + '</td></tr>';
    }).join('');
    UI.modal('<h2>' + STR.guru.judul + '</h2><p class="kecil">' + STR.guru.pengantar + '</p><table class="tabel-guru"><thead><tr>' + STR.guru.kolom.map(function (k) { return '<th>' + k + '</th>'; }).join('') + '</tr></thead><tbody>' + baris + '</tbody></table>' +
      '<p class="kecil">' + STR.guru.model + '</p><p class="kecil">' + STR.guru.saran + '</p>', { kelas: 'lebar' });
  }

  function sertifikat() {
    var m = UI.modal('<div class="sertifikat" id="sert"><h2>' + STR.sertifikat.judul + '</h2><p>' + STR.sertifikat.diberikan + '</p>' +
      '<input id="s-nama" maxlength="40" autocomplete="off" placeholder="' + STR.sertifikat.nama + '" aria-label="' + STR.sertifikat.nama + '">' +
      '<p>' + isi(STR.sertifikat.isi, { b: total }) + '</p><p class="sert-bintang">' + S.st.map(function (s, i) { return '<span>' + (i + 1) + ' ' + UI.bintang(s, 'kecil') + '</span>'; }).join('') + '</p>' +
      '<p class="kecil">' + STR.sertifikat.tempat + '<br>' + STR.pengembang + '</p></div>', { kelas: 'lebar', kaki: UI.tombol('s-cetak', STR.tombol.cetak, 'hijau', IKON.cetak) });
    $('#s-cetak', m).onclick = function () {
      var c = $('#cetak');
      c.innerHTML = $('#sert', m).outerHTML;
      var nama = $('#s-nama', m).value.trim();
      $('input', c).outerHTML = '<p class="sert-nama">' + (nama ? nama.replace(/[<>&"]/g, '') : '.............................................') + '</p>';
      window.print();
    };
  }
};
