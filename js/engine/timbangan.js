/* Timbangan Rupa: timbangan dua piring dari kayu dan kuningan. Lengan berayun dengan pegas teredam (berbasis delta waktu),
   piring tergantung tetap mendatar dan sedikit berayun, jarum bergerak di papan skala, dan tumpukan beban di tiap piring
   menunjukkan sisi mana yang lebih berat (sebanding dengan pengaruh tiap sisi pada model sederhana). */
function Timbangan(wadah) {
  var W = 752, H = 176, PX = 376, PY = 50, R = 176, TALI = 30, SKALA_TAMPIL = 0.7;
  var f = function (n) { return n.toFixed(1); };

  function piring(id, label) {
    return '<g id="' + id + '">' +
      '<path d="M0 0L-52 ' + TALI + 'M0 0L52 ' + TALI + 'M0 0V' + (TALI - 2) + '" stroke="#6E4325" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle r="6" fill="url(#tbKuningan)" stroke="#8A6514" stroke-width="1.5"/>' +
      '<g class="tb-beban" transform="translate(0 ' + (TALI - 3) + ')"></g>' +
      '<path d="M-66 ' + TALI + 'H66Q60 ' + (TALI + 28) + ' 0 ' + (TALI + 30) + 'Q-60 ' + (TALI + 28) + ' -66 ' + TALI + 'Z" fill="url(#tbPiring)" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<ellipse cy="' + TALI + '" rx="66" ry="5" fill="#C98A3E" stroke="#fff" stroke-width="2"/>' +
      '<text y="' + (TALI + 22) + '" text-anchor="middle" class="tb-label">' + label + '</text></g>';
  }
  /* papan skala di atas poros: jarum ikut lengan dan menunjuk ke sisi yang lebih berat */
  function titikBusur(r, d) { var q = d * Math.PI / 180; return f(PX + r * Math.sin(q)) + ' ' + f(PY - r * Math.cos(q)); }
  function busur(r1, r2, d1, d2, warna) {
    return '<path d="M' + titikBusur(r2, d1) + 'A' + r2 + ' ' + r2 + ' 0 0 1 ' + titikBusur(r2, d2) + 'L' + titikBusur(r1, d2) + 'A' + r1 + ' ' + r1 + ' 0 0 0 ' + titikBusur(r1, d1) + 'Z" fill="' + warna + '"/>';
  }
  var dial = '', mak = BERAT.sudutMaks * SKALA_TAMPIL + 5;
  dial += '<path d="M' + PX + ' ' + PY + 'L' + titikBusur(46, -mak - 3) + 'A46 46 0 0 1 ' + titikBusur(46, mak + 3) + 'Z" fill="#FFF6E3" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>';
  dial += '<g id="tb-zona-kiri">' + busur(30, 41, -mak, -3, '#F3C9A6') + '</g><g id="tb-zona-kanan">' + busur(30, 41, 3, mak, '#F3C9A6') + '</g>';
  dial += '<g id="tb-zona-rata">' + busur(30, 41, -3, 3, '#9ACB8C') + '</g>';
  for (var d = -15; d <= 15; d += 5) dial += '<line x1="' + titikBusur(41, d).replace(' ', '" y1="') + '" x2="' + titikBusur(d ? 36 : 33, d).replace(' ', '" y2="') + '" stroke="#8A5530" stroke-width="' + (d ? 1.4 : 2.4) + '"/>';

  /* motif kawung kecil pada alas */
  function kawung(x, y, r) {
    return '<g transform="translate(' + x + ' ' + y + ')" fill="#F2C46A" stroke="#8A5530" stroke-width="1.2">' +
      [45, 135, 225, 315].map(function (q) { return '<ellipse cx="' + f(r * 0.62 * Math.cos(q * Math.PI / 180)) + '" cy="' + f(r * 0.62 * Math.sin(q * Math.PI / 180)) + '" rx="' + f(r * 0.5) + '" ry="' + f(r * 0.3) + '" transform="rotate(' + q + ' ' + f(r * 0.62 * Math.cos(q * Math.PI / 180)) + ' ' + f(r * 0.62 * Math.sin(q * Math.PI / 180)) + ')"/>'; }).join('') +
      '<circle r="' + f(r * 0.16) + '" fill="#8A5530" stroke="none"/></g>';
  }

  wadah.innerHTML =
    '<svg class="tb-svg" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="tbKayu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E0AE6E"/><stop offset=".5" stop-color="#C4864A"/><stop offset="1" stop-color="#A06634"/></linearGradient>' +
    '<linearGradient id="tbTiang" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A06634"/><stop offset=".45" stop-color="#D9A464"/><stop offset="1" stop-color="#93592C"/></linearGradient>' +
    '<linearGradient id="tbKuningan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset=".55" stop-color="#F2B632"/><stop offset="1" stop-color="#C98A12"/></linearGradient>' +
    '<linearGradient id="tbPiring" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6CF8C"/><stop offset="1" stop-color="#D99A4E"/></linearGradient>' +
    '<linearGradient id="tbMeja" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98E52"/><stop offset=".35" stop-color="#B57940"/><stop offset="1" stop-color="#8E5A2E"/></linearGradient>' +
    '<radialGradient id="tbCahaya"><stop offset="0" stop-color="#FFF3B0" stop-opacity=".95"/><stop offset=".45" stop-color="#F2D75A" stop-opacity=".45"/><stop offset="1" stop-color="#F2D75A" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    /* meja */
    '<rect x="30" y="' + (H - 22) + '" width="' + (W - 60) + '" height="12" rx="4" fill="url(#tbMeja)"/>' +
    '<rect x="30" y="' + (H - 12) + '" width="' + (W - 60) + '" height="10" rx="3" fill="#7A4A24"/>' +
    '<path d="M38 ' + (H - 20) + 'H' + (W - 38) + '" stroke="#E4B67A" stroke-width="2" opacity=".7"/>' +
    '<ellipse cx="' + PX + '" cy="' + (H - 21) + '" rx="120" ry="6" fill="#3B2A20" opacity=".22"/>' +
    '<ellipse id="tb-bayang-kiri" cx="' + (PX - R) + '" cy="' + (H - 21) + '" rx="60" ry="4" fill="#3B2A20" opacity=".14"/>' +
    '<ellipse id="tb-bayang-kanan" cx="' + (PX + R) + '" cy="' + (H - 21) + '" rx="60" ry="4" fill="#3B2A20" opacity=".14"/>' +
    /* cahaya saat seimbang */
    '<circle id="tb-cahaya" cx="' + PX + '" cy="' + PY + '" r="120" fill="url(#tbCahaya)" opacity="0"/>' +
    /* alas bertingkat dan tiang */
    '<path d="M' + (PX - 86) + ' ' + (H - 22) + 'L' + (PX - 70) + ' ' + (H - 44) + 'H' + (PX + 70) + 'L' + (PX + 86) + ' ' + (H - 22) + 'Z" fill="url(#tbKayu)" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>' +
    '<rect x="' + (PX - 50) + '" y="' + (H - 56) + '" width="100" height="14" rx="5" fill="#B57940" stroke="#fff" stroke-width="3"/>' +
    kawung(PX - 40, H - 33, 9) + kawung(PX, H - 33, 9) + kawung(PX + 40, H - 33, 9) +
    '<rect x="' + (PX - 10) + '" y="' + (PY + 6) + '" width="20" height="' + (H - 56 - PY - 6) + '" rx="6" fill="url(#tbTiang)" stroke="#fff" stroke-width="3"/>' +
    '<rect x="' + (PX - 14) + '" y="' + (H - 66) + '" width="28" height="8" rx="3" fill="url(#tbKuningan)" stroke="#fff" stroke-width="2"/>' +
    dial +
    /* lengan */
    '<g id="tb-lengan">' +
    '<path d="M' + (PX - R - 6) + ' ' + (PY - 4) + 'Q' + PX + ' ' + (PY - 11) + ' ' + (PX + R + 6) + ' ' + (PY - 4) + 'V' + (PY + 4) + 'Q' + PX + ' ' + (PY + 12) + ' ' + (PX - R - 6) + ' ' + (PY + 4) + 'Z" fill="url(#tbKayu)" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M' + (PX - R + 20) + ' ' + PY + 'H' + (PX - 26) + 'M' + (PX + 26) + ' ' + PY + 'H' + (PX + R - 20) + '" stroke="#8A5530" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>' +
    '<circle cx="' + (PX - R) + '" cy="' + PY + '" r="7" fill="url(#tbKuningan)" stroke="#fff" stroke-width="2.5"/>' +
    '<circle cx="' + (PX + R) + '" cy="' + PY + '" r="7" fill="url(#tbKuningan)" stroke="#fff" stroke-width="2.5"/>' +
    '<path d="M' + (PX - 3.5) + ' ' + (PY - 8) + 'L' + PX + ' ' + (PY - 40) + 'L' + (PX + 3.5) + ' ' + (PY - 8) + 'Z" fill="#3B2A20"/>' +
    '</g>' +
    '<circle cx="' + PX + '" cy="' + PY + '" r="12" fill="url(#tbKuningan)" stroke="#fff" stroke-width="3.5"/>' +
    '<circle id="tb-permata" cx="' + PX + '" cy="' + PY + '" r="5" fill="#C9622D"/>' +
    piring('tb-kiri', STR.studio.kiri) + piring('tb-kanan', STR.studio.kanan) +
    '<g id="tb-kilau"></g>' +
    '</svg>' +
    '<div class="tb-status" id="tb-status"><b></b><small>' + STR.studio.model.split(' · ')[1] + '</small></div>';

  var lengan = $('#tb-lengan', wadah), kiri = $('#tb-kiri', wadah), kanan = $('#tb-kanan', wadah), status = $('#tb-status', wadah), teks = $('b', status);
  var bayKiri = $('#tb-bayang-kiri', wadah), bayKanan = $('#tb-bayang-kanan', wadah), cahaya = $('#tb-cahaya', wadah), permata = $('#tb-permata', wadah);
  var zKiri = $('#tb-zona-kiri path', wadah), zKanan = $('#tb-zona-kanan path', wadah), zRata = $('#tb-zona-rata path', wadah), kilau = $('#tb-kilau', wadah);
  var a = 0, v = 0, target = 0, jalan = false, tPrev = 0, okPrev = null, deritT = 0, nKiri = -1, nKanan = -1;

  function gambar() {
    var ad = a * SKALA_TAMPIL, r = ad * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    var ayun = clamp(-v * 0.2, -4, 4); // piring sedikit berayun saat lengan bergerak
    lengan.setAttribute('transform', 'rotate(' + ad.toFixed(2) + ' ' + PX + ' ' + PY + ')');
    var kx = PX - R * c, ky = PY - R * s, nx = PX + R * c, ny = PY + R * s;
    kiri.setAttribute('transform', 'translate(' + f(kx) + ' ' + f(ky) + ') rotate(' + ayun.toFixed(1) + ')');
    kanan.setAttribute('transform', 'translate(' + f(nx) + ' ' + f(ny) + ') rotate(' + ayun.toFixed(1) + ')');
    /* bayangan piring di meja: makin dekat makin pekat */
    bayKiri.setAttribute('cx', f(kx)); bayKanan.setAttribute('cx', f(nx));
    bayKiri.setAttribute('opacity', (0.08 + (ky - (PY - 50)) / 100 * 0.16).toFixed(2));
    bayKanan.setAttribute('opacity', (0.08 + (ny - (PY - 50)) / 100 * 0.16).toFixed(2));
  }
  function langkah(now) {
    if (!wadah.isConnected) { jalan = false; return; }
    var dt = Math.min(0.05, (now - tPrev) / 1000); tPrev = now;
    if (Pengaturan.kurangi) { a = target; v = 0; }
    else { var acc = 70 * (target - a) - 9 * v; v += acc * dt; a += v * dt; }
    if (Math.abs(target - a) < 0.02 && Math.abs(v) < 0.02) { a = target; v = 0; jalan = false; }
    gambar();
    if (jalan) requestAnimationFrame(langkah);
  }
  /* tumpukan beban: sisi terberat 6 balok, sisi lain sebanding */
  function beban(g, n, warna) {
    var o = '', baris = [3, 2, 1], k = 0;
    for (var b = 0; b < baris.length && k < n; b++) {
      for (var j = 0; j < baris[b] && k < n; j++, k++) {
        var x = (j - (Math.min(baris[b], n - (k - j)) - 1) / 2) * 24, y = -11 - b * 13;
        o += '<rect x="' + f(x - 11) + '" y="' + y + '" width="22" height="13" rx="3" fill="' + warna + '" stroke="#fff" stroke-width="2"/>';
      }
    }
    g.innerHTML = o;
  }
  function aturBeban(hasil, adaIsi) {
    var A = hasil.A || 0, M = hasil.M || 0, kn = (A + M) / 2, kr = (A - M) / 2, top = Math.max(kn, kr);
    var a1 = adaIsi && kr > 0 ? Math.max(1, Math.round(6 * kr / top)) : 0, a2 = adaIsi && kn > 0 ? Math.max(1, Math.round(6 * kn / top)) : 0;
    if (a1 === nKiri && a2 === nKanan) return;
    nKiri = a1; nKanan = a2;
    beban($('.tb-beban', kiri), a1, a1 >= a2 && a1 ? '#2E6B5E' : '#7FA89E');
    beban($('.tb-beban', kanan), a2, a2 >= a1 && a2 ? '#2E6B5E' : '#7FA89E');
  }
  function kilauan() {
    if (Pengaturan.kurangi || !kilau.animate) return;
    var o = '';
    for (var i = 0; i < 8; i++) {
      var q = i * Math.PI / 4, x = PX + Math.cos(q) * 34, y = PY + Math.sin(q) * 26;
      o += '<path class="tb-bintik" d="M' + f(x) + ' ' + f(y - 7) + 'L' + f(x + 2) + ' ' + f(y - 2) + 'L' + f(x + 7) + ' ' + f(y) + 'L' + f(x + 2) + ' ' + f(y + 2) + 'L' + f(x) + ' ' + f(y + 7) + 'L' + f(x - 2) + ' ' + f(y + 2) + 'L' + f(x - 7) + ' ' + f(y) + 'L' + f(x - 2) + ' ' + f(y - 2) + 'Z" fill="' + (i % 2 ? '#F2B632' : '#fff') + '"/>';
    }
    kilau.innerHTML = o;
    $$('.tb-bintik', kilau).forEach(function (el, i) {
      var q = i * Math.PI / 4;
      el.animate([{ transform: 'translate(0,0) scale(.3)', opacity: 1 }, { transform: 'translate(' + f(Math.cos(q) * 36) + 'px,' + f(Math.sin(q) * 26) + 'px) scale(1)', opacity: 0 }],
        { duration: 700, easing: 'cubic-bezier(.2,.8,.3,1)' });
    });
    cahaya.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0.55 }], { duration: 900, easing: 'ease-out', fill: 'forwards' });
  }
  function warnaZona(ok, adaIsi, M) {
    zRata.setAttribute('fill', ok ? '#5FA35A' : '#9ACB8C');
    zKiri.setAttribute('fill', adaIsi && !ok && M < 0 ? '#E9854F' : '#F3C9A6');
    zKanan.setAttribute('fill', adaIsi && !ok && M > 0 ? '#E9854F' : '#F3C9A6');
    permata.setAttribute('fill', ok ? '#5FA35A' : adaIsi ? '#E9854F' : '#C9622D');
    if (!ok) { cahaya.getAnimations && cahaya.getAnimations().forEach(function (x) { x.cancel(); }); cahaya.setAttribute('opacity', 0); }
  }
  gambar();
  teks.textContent = STR.studio.model.split(' · ')[0];

  return {
    atur: function (hasil, adaIsi) {
      var baru = clamp(hasil.sudut, -BERAT.sudutMaks, BERAT.sudutMaks);
      if (Math.abs(baru - target) > 1.5 && performance.now() - deritT > 400) { Suara.derit(); deritT = performance.now(); }
      if (adaIsi && Math.abs(baru - target) > 0.5 && !Pengaturan.kurangi) v += (baru - target) * 0.6; // hentakan kecil saat beban berubah
      target = baru;
      if (!jalan) { jalan = true; tPrev = performance.now(); requestAnimationFrame(langkah); }
      var ok = !!(hasil.ok && adaIsi);
      aturBeban(hasil, adaIsi);
      warnaZona(ok, adaIsi, hasil.M || 0);
      status.className = 'tb-status ' + (!adaIsi ? '' : ok ? 'rata' : 'miring');
      teks.textContent = !adaIsi ? STR.studio.model.split(' · ')[0] : ok ? STR.studio.statusRata : (hasil.M < 0 ? STR.studio.statusKiri : STR.studio.statusKanan);
      if (ok && okPrev === false) { Suara.seimbang(); UI.letup(status); kilauan(); }
      okPrev = adaIsi ? ok : null;
      return ok;
    },
    sudut: function () { return a; }
  };
}
