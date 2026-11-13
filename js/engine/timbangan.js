/* Timbangan Rupa: jungkat-jungkit kayu dengan jarum, bergerak dengan pegas teredam (berbasis delta waktu). */
function Timbangan(wadah) {
  var W = 752, H = 176, PX = 376, PY = 62, R = 200;
  wadah.innerHTML =
    '<svg class="tb-svg" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
    '<path d="M' + (PX - 50) + ' ' + (PY - 2) + 'A50 50 0 0 1 ' + (PX + 50) + ' ' + (PY - 2) + '" fill="none" stroke="#EAD9B5" stroke-width="12" stroke-linecap="round"/>' +
    '<path d="M' + (PX - 10) + ' ' + (PY - 51) + 'A50 50 0 0 1 ' + (PX + 10) + ' ' + (PY - 51) + '" fill="none" stroke="#5FA35A" stroke-width="12"/>' +
    '<path d="M' + PX + ' ' + (PY + 4) + 'L' + (PX + 50) + ' ' + (H - 16) + 'H' + (PX - 50) + 'Z" fill="#B9773F" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>' +
    '<rect x="' + (PX - 100) + '" y="' + (H - 18) + '" width="200" height="14" rx="7" fill="#8A5530" stroke="#fff" stroke-width="3"/>' +
    '<g id="tb-lengan"><rect x="' + (PX - R - 10) + '" y="' + (PY - 9) + '" width="' + (2 * R + 20) + '" height="18" rx="9" fill="#C9965A" stroke="#fff" stroke-width="4"/>' +
    '<path d="M' + (PX - R + 24) + ' ' + PY + 'H' + (PX + R - 24) + '" stroke="#A9743F" stroke-width="2" stroke-dasharray="3 9"/>' +
    '<polygon points="' + (PX - 5) + ',' + (PY - 6) + ' ' + PX + ',' + (PY - 54) + ' ' + (PX + 5) + ',' + (PY - 6) + '" fill="#3B2A20"/></g>' +
    '<circle cx="' + PX + '" cy="' + PY + '" r="11" fill="#F2B632" stroke="#fff" stroke-width="4"/>' +
    piring('tb-kiri', STR.studio.kiri) + piring('tb-kanan', STR.studio.kanan) +
    '</svg>' +
    '<div class="tb-status" id="tb-status"><b></b><small>' + STR.studio.model.split(' · ')[1] + '</small></div>';

  function piring(id, label) {
    return '<g id="' + id + '"><path d="M0 0L-44 20M0 0L44 20" stroke="#8A5530" stroke-width="2.5"/>' +
      '<path d="M-60 20H60Q55 44 0 45Q-55 44 -60 20Z" fill="#E9B872" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>' +
      '<text y="39" text-anchor="middle" class="tb-label">' + label + '</text></g>';
  }

  var lengan = $('#tb-lengan', wadah), kiri = $('#tb-kiri', wadah), kanan = $('#tb-kanan', wadah), status = $('#tb-status', wadah), teks = $('b', status);
  var a = 0, v = 0, target = 0, jalan = false, tPrev = 0, okPrev = null, deritT = 0;

  function gambar() {
    var r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r), u = R - 4;
    lengan.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' ' + PX + ' ' + PY + ')');
    kiri.setAttribute('transform', 'translate(' + (PX - u * c).toFixed(1) + ' ' + (PY - u * s).toFixed(1) + ')');
    kanan.setAttribute('transform', 'translate(' + (PX + u * c).toFixed(1) + ' ' + (PY + u * s).toFixed(1) + ')');
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
  gambar();
  teks.textContent = STR.studio.model.split(' · ')[0];

  return {
    atur: function (hasil, adaIsi) {
      var baru = clamp(hasil.sudut, -BERAT.sudutMaks, BERAT.sudutMaks);
      if (Math.abs(baru - target) > 1.5 && performance.now() - deritT > 400) { Suara.derit(); deritT = performance.now(); }
      target = baru;
      if (!jalan) { jalan = true; tPrev = performance.now(); requestAnimationFrame(langkah); }
      var ok = !!(hasil.ok && adaIsi);
      status.className = 'tb-status ' + (!adaIsi ? '' : ok ? 'rata' : 'miring');
      teks.textContent = !adaIsi ? STR.studio.model.split(' · ')[0] : ok ? STR.studio.statusRata : (hasil.M < 0 ? STR.studio.statusKiri : STR.studio.statusKanan);
      if (ok && okPrev === false) { Suara.seimbang(); UI.letup(status); }
      okPrev = adaIsi ? ok : null;
      return ok;
    },
    sudut: function () { return a; }
  };
}
