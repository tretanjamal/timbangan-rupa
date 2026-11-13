/* Bank konten: potongan, percobaan, teka-teki, dan pesanan. */

/* Potongan (31). luas = koefisien luas bentuk terhadap kotak ukuran s x s, diukur dari piksel bentuknya
   dengan tools/hitung-luas.js (jalankan ulang bila bentuk/gambar diganti).
   img = kunci gambar di assets.js. corak = potongan bercorak (faktor corak 1,2). */
var POTONGAN = {
  sun: { nama: 'Matahari', kel: 'alam', luas: 0.38 },
  cloud: { nama: 'Awan', kel: 'alam', luas: 0.39 },
  tree: { nama: 'Pohon', kel: 'alam', luas: 0.61, img: 'pohon', corak: 1 },
  leaf: { nama: 'Daun', kel: 'alam', luas: 0.31 },
  flower: { nama: 'Bunga', kel: 'alam', luas: 0.6 },
  bird: { nama: 'Burung', kel: 'alam', luas: 0.29 },
  fish: { nama: 'Ikan', kel: 'alam', luas: 0.31 },
  tri: { nama: 'Gunung', kel: 'alam', luas: 0.47 },
  moon: { nama: 'Bulan', kel: 'alam', luas: 0.19 },
  drop: { nama: 'Tetes', kel: 'alam', luas: 0.43 },
  joglo: { nama: 'Joglo', kel: 'budaya', luas: 0.44, img: 'joglo', corak: 1 },
  home: { nama: 'Rumah', kel: 'budaya', luas: 0.6 },
  gun: { nama: 'Gunungan', kel: 'budaya', luas: 0.4, img: 'gunungan', corak: 1 },
  kawung: { nama: 'Kawung', kel: 'budaya', luas: 0.77, img: 'kawung', corak: 1 },
  tampah: { nama: 'Tampah', kel: 'budaya', luas: 0.74, img: 'tampah', corak: 1 },
  kite: { nama: 'Layang-layang', kel: 'budaya', luas: 0.28 },
  banner: { nama: 'Umbul-umbul', kel: 'budaya', luas: 0.19 },
  sq: { nama: 'Kotak', kel: 'bentuk', luas: 0.64 },
  rec: { nama: 'Papan', kel: 'bentuk', luas: 0.5 },
  dia: { nama: 'Belah ketupat', kel: 'bentuk', luas: 0.41 },
  hex: { nama: 'Segi enam', kel: 'bentuk', luas: 0.66 },
  pen: { nama: 'Segi lima', kel: 'bentuk', luas: 0.6 },
  star: { nama: 'Bintang', kel: 'bentuk', luas: 0.34 },
  heart: { nama: 'Hati', kel: 'bentuk', luas: 0.33 },
  half: { nama: 'Setengah lingkaran', kel: 'bentuk', luas: 0.4 },
  ring: { nama: 'Cincin', kel: 'bentuk', luas: 0.6 },
  oval: { nama: 'Lonjong', kel: 'bentuk', luas: 0.48 },
  trap: { nama: 'Trapesium', kel: 'bentuk', luas: 0.46 },
  plus: { nama: 'Tambah', kel: 'bentuk', luas: 0.52 },
  bolt: { nama: 'Petir', kel: 'bentuk', luas: 0.18 },
  arrow: { nama: 'Panah', kel: 'bentuk', luas: 0.28 }
};

/* L2: empat percobaan. Ukuran, Warna, Jarak: hanya satu hal yang beda (kunci: true).
   Jumlah: sengaja membandingkan 1 besar gelap dengan 3 kecil pucat (brief) untuk membongkar miskonsepsi "lebih banyak = lebih berat".
   tanggap[i] = umpan balik khusus bila murid memilih pengecoh[i]. */
var PERCOBAAN = [
  { v: 'Ukuran', kunci: true, label: ['kecil', 'besar'], umpan: 'Lihat! Matahari yang besar membuat timbangan turun ke kanan.',
    kiri: [{ k: 'sun', t: 1, s: 60, x: 150, y: 170 }], kanan: [{ k: 'sun', t: 1, s: 120, x: 450, y: 170 }],
    benar: 'Ukuran yang besar terasa lebih berat.',
    pengecoh: ['Ukuran tidak berpengaruh pada berat.', 'Yang kecil selalu terasa lebih berat.'],
    tanggap: ['Kalau ukuran tidak berpengaruh, timbangan akan rata. Lihat, timbangannya miring!', 'Lihat piringnya: sisi yang kecil justru naik ke atas.'] },
  { v: 'Warna', kunci: true, label: ['pucat', 'gelap'], umpan: 'Ukurannya sama, tapi warnanya beda. Timbangan turun ke warna yang gelap!',
    kiri: [{ k: 'sun', t: 0, s: 95, x: 150, y: 170 }], kanan: [{ k: 'sun', t: 2, s: 95, x: 450, y: 170 }],
    benar: 'Warna gelap terasa lebih berat daripada warna pucat.',
    pengecoh: ['Warna tidak berpengaruh pada berat.', 'Warna pucat terasa lebih berat.'],
    tanggap: ['Bentuk dan ukurannya sama persis, tapi timbangan tetap miring. Jadi warna berpengaruh!', 'Lihat piringnya: sisi yang pucat justru naik ke atas.'] },
  { v: 'Jumlah', kunci: false, beda: 'Yang dibandingkan: 1 bentuk besar gelap dengan 3 bentuk kecil pucat.', label: ['1 besar gelap', '3 kecil pucat'],
    umpan: 'Tiga bintang pucat kalah dari satu matahari besar yang gelap.',
    kiri: [{ k: 'sun', t: 2, s: 130, x: 150, y: 170 }],
    kanan: [{ k: 'star', t: 0, s: 55, x: 400, y: 170 }, { k: 'star', t: 0, s: 55, x: 460, y: 170 }, { k: 'star', t: 0, s: 55, x: 520, y: 170 }],
    benar: 'Lebih banyak belum tentu lebih berat. Satu bentuk besar dan gelap bisa menang.',
    pengecoh: ['Yang jumlahnya lebih banyak selalu lebih berat.', 'Jumlah tidak berpengaruh pada berat.'],
    tanggap: ['Sisi kanan punya 3 bintang, tapi timbangan turun ke kiri. Banyak belum tentu berat!', 'Jumlah bisa berpengaruh, tapi ukuran dan warna juga. Di sini yang besar dan gelap menang.'] },
  { v: 'Jarak dari tengah', kunci: true, label: ['dekat tengah', 'jauh di tepi'],
    umpan: 'Sama besar, sama warna. Yang jauh dari tengah menekan lebih kuat, seperti duduk di ujung jungkat-jungkit!',
    kiri: [{ k: 'sun', t: 1, s: 80, x: 240, y: 170 }], kanan: [{ k: 'sun', t: 1, s: 80, x: 530, y: 170 }],
    benar: 'Potongan yang jauh dari tengah terasa lebih berat, seperti di ujung jungkat-jungkit.',
    pengecoh: ['Letak tidak berpengaruh pada berat.', 'Potongan di dekat tengah selalu lebih berat.'],
    tanggap: ['Kedua matahari sama persis, hanya letaknya beda. Timbangan miring, jadi letak berpengaruh!', 'Lihat piringnya: sisi yang dekat tengah justru naik ke atas.'] }
];

/* L3: teka-teki asimetris. Potongan berat sudah terkunci di satu sisi. (diuji solver: test/logic) */
var TEKA = [
  [{ k: 'tree', t: 1, s: 150, x: 130, y: 175 }],
  [{ k: 'home', t: 2, s: 130, x: 450, y: 195 }],
  [{ k: 'tri', t: 2, s: 150, x: 110, y: 190 }, { k: 'sun', t: 1, s: 60, x: 190, y: 90 }],
  [{ k: 'gun', t: 1, s: 150, x: 470, y: 175 }],
  [{ k: 'joglo', t: 1, s: 150, x: 160, y: 205 }, { k: 'tampah', t: 0, s: 80, x: 240, y: 95 }]
];

/* L5: pesanan [indeks teks, jenis benar] */
var PESANAN = [['sim'], ['asi'], ['rad']];

/* L5: dua karya contoh di galeri untuk ditanggapi */
var CONTOH = [
  { jenis: 'rad', L: (function () { var o = []; for (var j = 0; j < 6; j++) { var a = j * Math.PI / 3; o.push({ k: 'leaf', t: 2, s: 70, x: 300 + 95 * Math.cos(a), y: 170 + 95 * Math.sin(a), a: j * 60 + 90 }); } o.push({ k: 'flower', t: 1, s: 80, x: 300, y: 170 }); return o; })() },
  { jenis: 'sim', L: [{ k: 'joglo', t: 1, s: 150, x: 300, y: 200 }, { k: 'tree', t: 2, s: 110, x: 120, y: 190 }, { k: 'tree', t: 2, s: 110, x: 480, y: 190, fl: -1 }, { k: 'sun', t: 0, s: 60, x: 300, y: 60 }] }
];

/* L1: bentuk kuas cermin (kiri diisi murid, kanan bayangannya) */
var KUAS = ['kupu', 'gunungan'];
