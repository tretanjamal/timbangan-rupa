/* Daftar aset terpusat: kunci -> berkas. Bila berkas gagal dimuat, gim memakai bentuk SVG cadangan. */
var ASET = {
  img: {
    miraSenang: 'assets/img/mira-senang.webp',
    miraBerpikir: 'assets/img/mira-berpikir.webp',
    miraBangga: 'assets/img/mira-bangga.webp',
    latar: 'assets/img/latar-galeri.webp',
    pohon: 'assets/img/potongan-pohon.webp',
    joglo: 'assets/img/potongan-joglo.webp',
    gunungan: 'assets/img/gunungan.webp',
    kawung: 'assets/img/motif-kawung.webp',
    tampah: 'assets/img/tampah.webp'
  },
  // rasio lebar/tinggi gambar potongan (untuk menata di kotak ukuran s x s)
  rasio: { pohon: 256 / 246, joglo: 256 / 169, gunungan: 177 / 256, kawung: 1, tampah: 249 / 256 },
  musik: 'assets/audio/musik.mp3'
};
