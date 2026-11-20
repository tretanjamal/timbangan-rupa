/* Semua teks antarmuka ada di sini agar mudah ditinjau dan disunting guru.
   Bahasa sederhana untuk kelas 3-4: kalimat pendek, istilah selalu dengan padanan anak. */
var STR = {
  judul: 'Timbangan Rupa',
  subjudul: 'Lab Keseimbangan Desain',
  mapel: 'Seni Rupa',
  jenisMedia: 'Lab Maya',
  muat: 'Menyiapkan galeri...',
  putar: 'Putar perangkatmu ke posisi mendatar, ya.',
  mulai: 'Mulai',
  lanjutMain: 'Lanjutkan',
  tombol: {
    info: 'Informasi', ref: 'Referensi', dev: 'Pengembang', jurnal: 'Jurnal Galeri',
    tutup: 'Tutup', beranda: 'Beranda', suara: 'Suara', layarPenuh: 'Layar penuh', atur: 'Pengaturan',
    petunjuk: 'Petunjuk', cekSumbu: 'Cek sumbu', selesai: 'Selesai', hapusTerakhir: 'Hapus terakhir',
    warnaKuas: 'Warna kuas', lanjut: 'Lanjut', pajang: 'Pajang', peta: 'Peta Galeri',
    besar: 'Besar', kecil: 'Kecil', warna: 'Warna', putar: 'Putar', salin: 'Salin', hapus: 'Hapus',
    hasil: 'Hasil Belajarku', mainLagi: 'Ulangi lab', cetak: 'Cetak sertifikat', guru: 'Catatan untuk Guru',
    sebelum: 'Sebelumnya', berikut: 'Berikutnya', ya: 'Ya, hapus', batal: 'Batal'
  },
  kelompok: { alam: 'Alam', budaya: 'Budaya', bentuk: 'Bentuk' },
  bintang: 'Bintang',

  // Pengaturan
  atur: {
    judul: 'Pengaturan',
    musik: 'Musik latar', santai: 'Mode Santai (timbangan lebih longgar)',
    bantuan: 'Mode Bantuan (pola titik berat)', kurangi: 'Kurangi animasi', baca: 'Bacakan otomatis kata-kata Mira',
    hapus: 'Hapus semua progres', yakin: 'Hapus semua bintang dan karya di galeri?',
    terhapus: 'Progres sudah dihapus.',
    fsGagal: 'Layar penuh tidak diizinkan di sini. Buka Lab Maya di tab sendiri, atau tekan F11 di komputer.'
  },

  // Peta stasiun
  peta: {
    judul: 'Peta Galeri',
    sapa: 'Mau bereksperimen di stasiun mana? Urutan 1 sampai 5 paling cocok untuk pemula.',
    mulaiSini: 'Mulai di sini',
    stasiun: 'Stasiun'
  },
  stasiun: [
    { nama: 'Cari Sumbu', kata: 'Simetris = setangkup' },
    { nama: 'Percobaan Berat', kata: 'Apa yang membuat berat?' },
    { nama: 'Seimbang Tanpa Kembar', kata: 'Asimetris' },
    { nama: 'Pusat Memancar', kata: 'Radial' },
    { nama: 'Pameran Kelas', kata: 'Pilih dan tanggapi' }
  ],
  selesaiStasiun: 'Stasiun {n} selesai!',
  keterampilan: [
    'Aku bisa menemukan garis sumbu pada benda yang setangkup.',
    'Aku tahu ukuran, warna, jumlah, dan letak membuat bagian karya terasa lebih berat.',
    'Aku bisa membuat karya seimbang tanpa kembar.',
    'Aku bisa membuat hiasan yang memancar dari tengah.',
    'Aku bisa memilih jenis keseimbangan dan memberi tanggapan seperti seniman.'
  ],

  // L1
  l1: {
    judul: 'Cari Sumbu',
    nama: ['kupu-kupu', 'daun', 'gunungan wayang', 'rumah joglo', 'layang-layang', 'rumah'],
    mulai: 'Geser garis ungu ke tengah {n}, lalu tekan Cek.',
    belumTaruh: 'Sentuh gambarnya dulu untuk menaruh garis.',
    koleksi: 'Gambar yang diperiksa',
    ingat: '<b>Simetris</b> artinya setangkup: kalau dilipat di garis cermin, kiri dan kanan sama persis.',
    h1: 'Cari tempat yang sama persis di kiri dan kanan.',
    h2: 'Garis cermin ada di dalam pita ungu.',
    h3: 'Lihat, ini sumbunya! Coba gambar berikutnya, ya.',
    benar: 'Tepat! Kiri dan kanan setangkup. Ini simetris.',
    salah: 'Hampir! Sisi kiri dan kanan belum sama. Geser garisnya ke {arah}.',
    kiri: 'kiri', kanan: 'kanan',
    kuasJudul: 'Kuas Cermin',
    kuasMulai: 'Tempel kuas di sisi KIRI. Bayangannya muncul di kanan!',
    kuasLagi: 'Bagus! Bayangannya ikut muncul. Tambah lagi.',
    kuasCukup: 'Cantik! Tekan Selesai, atau hias lagi.',
    kuasLuar: 'Tempel di bagian kiri gambar, di dalam bentuknya ya.',
    kuasWarna: 'Warna kuas: {w}.'
  },

  // L2
  l2: {
    judul: 'Percobaan Berat Visual',
    tanya: 'Percobaan {n}: {v}. Ke mana timbangan akan miring?',
    tebak: ['Miring kiri', 'Rata', 'Miring kanan'],
    tebakKecil: ['miring kiri', 'rata', 'miring kanan'],
    tebakBenar: 'Tebakanmu benar! Sekarang pilih kesimpulan yang tepat.',
    tebakSalah: 'Lihat timbangannya! Hasilnya {r}. Pilih kesimpulan yang tepat.',
    kesimpulanSalah: 'Hampir! Lihat lagi timbangannya, lalu coba kalimat lain.',
    metode: ['Tebak', 'Uji', 'Amati', 'Simpulkan'],
    beda: 'Yang berbeda hanya: {v}',
    terkunci: 'Hal lain terkunci, sama di kiri dan kanan.'
  },

  // Studio (L3-L5)
  studio: {
    taruh: 'Ketuk kanvas untuk menaruh potongan.',
    dipilih: '{n} dipilih. Ketuk kanvas untuk menaruhnya.',
    pindah: 'Ketuk tempat kosong untuk memindahkan potongan ini, atau seret.',
    pilihDulu: 'Ketuk potongan di kanvas dulu.',
    penuh: 'Kanvasmu sudah penuh.',
    seimbang: 'Seimbang! Tekan Pajang.',
    miringKanan: 'Timbangan miring ke kanan. Imbangi di sisi kiri.',
    miringKiri: 'Timbangan miring ke kiri. Imbangi di sisi kanan.',
    kembar: 'Susunanmu kembar. Coba seimbang tanpa kembar!',
    duaSisi: 'Isi kedua sisi kanvas, kiri dan kanan.',
    radialJauh: 'Geser potongan agak jauh dari titik ungu di tengah.',
    bebasMiring: 'Karyamu sengaja miring? Itu boleh! Tekan Pajang.',
    warna: 'Warna {w}.',
    terkunci: 'Potongan ini terkunci. Tambahkan potongan lain.',
    ulang: 'Ulang',
    statusRata: 'Seimbang!',
    statusKiri: 'Kiri lebih berat',
    statusKanan: 'Kanan lebih berat',
    model: 'Timbangan Rupa · model sederhana',
    kiri: 'KIRI', kanan: 'KANAN',
    hantu: 'Ketuk bayangan putus-putus untuk menaruh potongan di sana.',
    dipajang: 'Dipajang di Galeri!',
    pengunjung: '+{n} pengunjung datang melihat karyamu.'
  },

  // L3
  l3: {
    judul: 'Seimbang Tanpa Kembar',
    pesan: 'Pesanan: buat seimbang, tapi TIDAK kembar!',
    h1: 'Imbangi dengan potongan di sisi seberang. Jarak dari tengah juga berpengaruh.',
    h2kanan: 'Yang berat ada di kanan. Taruh potongan gelap atau besar di kiri, jauh dari tengah.',
    h2kiri: 'Yang berat ada di kiri. Taruh potongan gelap atau besar di kanan, jauh dari tengah.',
    h3: 'Lihat bayangan putus-putus. Satu potongan di sana bisa mengimbangi!'
  },
  // L4
  l4: {
    judul: 'Pusat Memancar',
    pesan: [
      'Hias piring: taruh satu potongan, lalu pilih jumlah ulangan.',
      'Hias tampah anyaman dengan pola yang memancar.',
      'Buat hiasan dinding memancar sesukamu.'
    ],
    h1: 'Taruh potongan agak jauh dari titik ungu. Pilih ulangan 4, 6, atau 8.',
    h1dua: 'Taruh satu potongan dekat titik ungu, lalu satu lagi di lingkaran luar.',
    syaratDua: 'Pesanan ini butuh 2 potongan: satu di lingkaran dalam, satu di lingkaran luar.',
    syaratLingkar: 'Kedua potonganmu di lingkaran yang sama. Geser satu ke lingkaran lain.',
    kenalLangkah: 'Kenali',
    kenalTanya: 'Mana benda yang radial, memancar dari satu titik di tengah?',
    kenalSim: 'Simetris: bercermin di satu GARIS',
    kenalRad: 'Radial: berputar di satu TITIK',
    kenalBenar: 'Betul! Anyaman tampah berulang memutari titik tengahnya.',
    kenalSalah: {
      joglo: 'Joglo setangkup: kiri dan kanan bercermin di satu garis. Radial berputar di satu titik pusat.',
      tree: 'Pohon ini tidak berulang memutari pusat. Cari yang polanya memancar dari tengah.'
    },
    h2: 'Radial: potongan yang sama berulang mengelilingi satu titik pusat.',
    h3: 'Lihat bayangan putus-putus. Ketuk untuk menaruh potongan di sana.'
  },
  // L5
  l5: {
    judul: 'Pameran Kelas',
    pesanan: [
      'Poster acara sekolah yang tenang dan resmi',
      'Hiasan dinding kelas yang ceria dan bergerak',
      'Piring hias untuk pajangan meja'
    ],
    pilih: 'Pesanan: {o}. Keseimbangan apa yang cocok?',
    salahPilih: 'Coba pikir lagi. Tenang dan resmi cocok dengan susunan kembar. Ceria cocok dengan susunan bebas. Piring cocok dengan pusat.',
    salahJenis: {
      'rad-sim': 'Piring punya titik pusat. Radial berputar mengelilingi pusat, bukan bercermin di satu garis.',
      'rad-asi': 'Piring hias biasanya punya pola yang berulang memutari tengah.',
      'sim-asi': 'Tenang dan resmi lebih cocok dengan kiri dan kanan yang sama persis.',
      'sim-rad': 'Poster punya garis tengah, bukan titik pusat. Kiri dan kanan yang sama membuatnya tenang dan resmi.',
      'asi-sim': 'Susunan kembar terasa diam. Untuk kesan ceria dan bergerak, coba yang tidak kembar.',
      'asi-rad': 'Hiasan dinding yang bergerak cocok dengan susunan bebas yang tetap seimbang.'
    },
    susun: 'Susun {o} dengan keseimbangan {m}.',
    tanggapan: 'Beri tanggapan seperti seniman. Pilih kalimat yang tepat untuk karyamu.',
    tanggapanSalah: 'Kalimat itu untuk susunan {x}. Karyamu {m}, karena {a}.',
    contohSalah: { rad: 'Lihat titik tengahnya. Daun yang sama berulang memutari pusat.', sim: 'Lihat garis tengahnya. Pohon kiri dan kanan bercermin, sama persis.' },
    alasan: { sim: 'sisi kiri dan kanan bercermin', asi: 'berat di satu sisi diimbangi ukuran, warna, dan letak', rad: 'potongan berulang mengelilingi satu pusat' },
    kalimat: 'Karyaku seimbang {m} karena {a}.',
    h1asi: 'Satu potongan besar dan gelap dekat tengah, beberapa yang kecil di tepi sisi lain.',
    h1: 'Taruh potongan, lalu lihat Timbangan Rupa.',
    h3: 'Ketuk tempat di kanvas untuk menaruh. Pakai Besar, Kecil, dan Warna untuk mengubah.',
    bebasJudul: 'Pameran Bebas',
    bebas: 'Di Pameran Bebas, kamu boleh memilih: seimbang atau sengaja tidak seimbang.',
    bebasH1: 'Tidak ada jawaban salah. Cobalah sesukamu!',
    bebasH3: 'Seniman kadang sengaja tidak seimbang supaya karya terasa bergerak.',
    bebasTanya: 'Bagaimana kesan karyamu? Pilih kalimat yang cocok.',
    bebasKalimat: ['Karyaku terasa seimbang karena timbangannya rata.', 'Karyaku sengaja tidak seimbang supaya terasa bergerak.'],
    bebasSalah: 'Lihat timbangannya lagi, lalu pilih kalimat yang cocok.',
    contohTanya: 'Lihat karya teman di galeri. Keseimbangan apa yang dipakai?',
    contohBenar: 'Betul! Matamu sudah seperti kurator galeri.'
  },
  jenis: {
    sim: 'simetris (setangkup)',
    asi: 'asimetris (tidak kembar tapi seimbang)',
    rad: 'radial (memancar dari tengah)'
  },
  jenisPendek: { sim: 'Simetris', asi: 'Asimetris', rad: 'Radial' },
  jenisAnak: { sim: 'setangkup', asi: 'tidak kembar tapi seimbang', rad: 'memancar dari tengah' },

  // Umpan balik umum
  benarAcak: ['Hebat!', 'Keren!', 'Tepat sekali!', 'Mantap!'],
  hasil: {
    judul: 'Hasil Belajarku',
    sapa: 'Hebat! Kamu penata pameran sejati!',
    sapaBelum: 'Ayo selesaikan semua stasiun untuk mengisi galeri!',
    totalBintang: 'bintang terkumpul',
    galeri: 'Galeri Karyaku',
    galeriKosong: 'Galeri masih kosong. Pajang karyamu di Stasiun 3 sampai 5.',
    dikuasai: 'Sudah bisa',
    berlatih: 'Ayo berlatih lagi',
    belum: 'Belum dicoba'
  },
  sertifikat: {
    judul: 'Sertifikat Penata Pameran Cilik',
    diberikan: 'Diberikan kepada',
    nama: 'Tulis namamu (tidak disimpan)',
    isi: 'yang telah menyelesaikan Lab Maya Timbangan Rupa: Lab Keseimbangan Desain (Seni Rupa) dan mengumpulkan {b} dari 15 bintang.',
    tempat: 'Robatal, 2026'
  },
  guru: {
    judul: 'Catatan untuk Guru',
    pengantar: 'Ringkasan ini hanya tersimpan di perangkat ini. Tidak ada data pribadi yang dikumpulkan.',
    kolom: ['Stasiun', 'Tujuan (tag)', 'Bintang', 'Petunjuk dipakai', 'Catatan'],
    tag: ['TP1 simetris', 'TP2 berat-visual', 'TP3 asimetris', 'TP4 radial', 'TP5-TP6 menyusun, apresiasi'],
    l2: 'Tebakan awal benar {a} dari 4; kesimpulan benar tanpa coba ulang {b} dari 4.',
    model: 'Timbangan Rupa memakai model sederhana: berat = luas x faktor warna x faktor corak, pengaruh = berat x jarak dari tengah. Keseimbangan dalam seni juga soal rasa; seniman kadang sengaja tidak seimbang untuk kesan bergerak. Diskusikan hal ini setelah bereksperimen.',
    saran: 'Saran tindak lanjut: minta murid mencari benda simetris, asimetris, dan radial di kelas, lalu menjelaskannya dengan kalimat "seimbang ... karena ...".',
    belum: 'belum dikerjakan',
    salah: 'Kesalahan yang muncul: ',
    tanpaSalah: 'Tidak ada kesalahan tercatat',
    bacakan: 'Bacakan'
  },

  // Panel judul
  info: '<h2>Informasi</h2><p><b>Tujuan Pembelajaran:</b> Murid mampu mengenali dan menyusun keseimbangan simetris, asimetris, dan radial dengan memperhatikan ukuran, warna, jumlah, dan letak unsur rupa.</p><p><b>Mapel:</b> Seni Rupa (kelas 3-4)<br><b>Topik:</b> Keseimbangan dalam Desain</p><h3>Panduan Lab</h3><ol><li>Baca pesanan Mira di gelembung.</li><li>Ketuk potongan di rak, lalu ketuk kanvas untuk menaruhnya. Seret untuk memindahkan.</li><li>Amati Timbangan Rupa: miring ke sisi yang terasa lebih berat.</li><li>Bila timbangan rata, tekan Pajang. Tombol Petunjuk selalu siap membantu.</li></ol><h3>Papan ketik</h3><p>Tab untuk berpindah tombol, Enter untuk memilih. Di kanvas: panah menggeser, Enter menaruh potongan, Spasi memilih potongan berikutnya, Delete menghapus, + dan - mengubah ukuran, W mengganti warna, R memutar.</p>',
  ref: '<h2>Referensi</h2><h3>Sumber materi</h3><ul><li>Badan Standar, Kurikulum, dan Asesmen Pendidikan (2025). <i>Keputusan Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran.</i> Kementerian Pendidikan Dasar dan Menengah Republik Indonesia.</li><li>Dr. Rizki Taufik Rahman, S.Sm., M.Pd, dkk. (2025). <i>Panduan Mata Pelajaran Seni Rupa Fase A-F.</i> Badan Standar, Kurikulum, dan Asesmen Pendidikan, Kementerian Pendidikan Dasar dan Menengah Republik Indonesia.</li></ul><h3>Keterangan Penggunaan AI</h3><p>Kode Lab Maya ini dibuat dengan bantuan AI (Claude, Anthropic). Ilustrasi dan musik latar dibuat pengembang dengan bantuan AI generatif. Pengembang menentukan tujuan, alur, dan isi pembelajaran serta menyuntingnya. Pemanfaatan AI mengacu pada: Purwarianti, A., dkk. (2025). <i>Panduan Pemanfaatan Kecerdasan Artifisial untuk Guru PAUD, Pendidikan Dasar, dan Pendidikan Menengah.</i> Jakarta: Pusat Kurikulum dan Pembelajaran &amp; Pusat Standar dan Kebijakan Pendidikan.</p>',
  dev: [
    '<img src="assets/img/jamaluddin.jpg" alt="Foto Jamaluddin"><h2>Jamaluddin</h2><p>UPTD SMPN 2 Robatal<br>jamaluddin551@guru.smp.belajar.id</p><p class="ig"><img src="assets/img/instagram.webp" alt="Instagram"><span>tretanjamal</span></p><p>Tahun Pembuatan: 2026</p><h3>Prestasi dan Pengalaman</h3><ul><li>Narasumber Digitalisasi Pembelajaran Kemendikdasmen</li><li>Guru Pejuang Digital</li><li>Juara 1 Lomba Inovasi Guru SMP Kabupaten Sampang 2026</li><li>Juara 1 Guru Inspiratif SMP Kabupaten Sampang 2026</li><li>Komunitas Belajar Terbaik BLPT Kemendikdasmen 2024</li></ul>',
    '<img src="assets/img/abdul-karim.jpg" alt="Foto Abdul Karim"><h2>Abdul Karim, S.Pd.SD</h2><p>Guru UPTD SDN JELGUNG 1</p>'
  ],
  jurnal: {
    judul: 'Jurnal Galeri',
    kosong: 'Belum ada catatan. Kerjakan Stasiun 2 (Percobaan Berat) dulu, ya.',
    baris: '<b>{q}</b>: tebakanku {g}, hasilnya {r}. {c}'
  },
  pengembang: 'Jamaluddin (UPTD SMPN 2 Robatal) dan Abdul Karim, S.Pd.SD (UPTD SDN JELGUNG 1)'
};

/* Isi templat: isi('Halo {n}', {n: 'Mira'}) -> 'Halo Mira' */
function isi(t, d) { return String(t).replace(/\{(\w+)\}/g, function (_, k) { return d[k] != null ? d[k] : ''; }); }
