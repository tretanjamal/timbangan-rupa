/* Parameter model berat visual (model sederhana, bukan kebenaran mutlak dalam seni).
   Penjelasan untuk guru: docs/MODEL-RUPA.md
   berat potongan = luas x faktor warna x faktor corak
   momen          = berat x jarak mendatar dari sumbu tengah (positif ke kanan), seperti jungkat-jungkit
   rata           = |jumlah momen| <= toleransi x jumlah |momen| */
var BERAT = {
  lebar: 600, tinggi: 340, pusatX: 300, pusatY: 170,
  // Tiga tingkat warna. Latar kanvas terang, jadi warna gelap/mencolok terasa paling berat.
  tingkat: [
    { nama: 'pucat', warna: '#F4DCA6', tepi: '#D9B676', faktor: 0.6 },
    { nama: 'sedang', warna: '#E9854F', tepi: '#C9622D', faktor: 1.0 },
    { nama: 'gelap', warna: '#2E6B5E', tepi: '#1E4A41', faktor: 1.5 }
  ],
  faktorCorak: { polos: 1.0, bercorak: 1.2 },
  sudutMaks: 18,          // derajat
  pengaliSudut: 40,       // sudut = (momen bersih / jumlah momen mutlak) x pengali, dibatasi sudutMaks
  toleransi: 0.04,        // 4% (mode biasa)
  toleransiSantai: 0.06,  // 6% (Mode Santai)
  langkahAdaptif: 0.01,   // 3 benar beruntun: -1 poin persen; banyak petunjuk: +1 poin persen
  toleransiKembar: 18,    // px logis (3% lebar kanvas) untuk pemeriksa susunan kembar
  batasKembar: 0.85       // susunan dianggap kembar bila >= 85% beratnya berpasangan cermin
};
