/* Potongan kertas (SVG) dan model berat visual. Satu sistem gambar untuk semua layar. */
var Potongan = (function () {
  function poli(n, r, putar) {
    var p = [];
    for (var i = 0; i < n; i++) { var a = i * 2 * Math.PI / n - Math.PI / 2 + (putar || 0); p.push((r * Math.cos(a)).toFixed(1) + ',' + (r * Math.sin(a)).toFixed(1)); }
    return p.join(' ');
  }
  function bintang(h) {
    var p = [];
    for (var i = 0; i < 10; i++) { var r = i % 2 ? h * 0.45 : h, a = i * Math.PI / 5 - Math.PI / 2; p.push((r * Math.cos(a)).toFixed(1) + ',' + (r * Math.sin(a)).toFixed(1)); }
    return p.join(' ');
  }

  /* Bentuk vektor dalam kotak s x s berpusat di 0,0 */
  function bentuk(k, s) {
    var h = s / 2;
    switch (k) {
      case 'sun': return '<circle r="' + h * 0.62 + '"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return '<polygon points="' + (-h * 0.1) + ',' + (-h * 0.7) + ' 0,' + (-h) + ' ' + (h * 0.1) + ',' + (-h * 0.7) + '" transform="rotate(' + i * 45 + ')"/>'; }).join('');
      case 'cloud': return '<circle cx="' + -h * 0.42 + '" cy="' + h * 0.1 + '" r="' + h * 0.4 + '"/><circle cx="' + h * 0.08 + '" cy="' + -h * 0.18 + '" r="' + h * 0.52 + '"/><circle cx="' + h * 0.55 + '" cy="' + h * 0.14 + '" r="' + h * 0.36 + '"/><rect x="' + -h * 0.42 + '" y="' + h * 0.08 + '" width="' + h * 0.98 + '" height="' + h * 0.42 + '" rx="' + h * 0.1 + '"/>';
      case 'leaf': return '<path d="M0 ' + -h + 'Q' + h * 0.9 + ' 0 0 ' + h + 'Q' + -h * 0.9 + ' 0 0 ' + -h + 'Z"/><path d="M0 ' + -h * 0.8 + 'V' + h * 0.85 + '" fill="none" stroke-width="2.5" opacity=".55"/>';
      case 'flower': return [0, 1, 2, 3, 4].map(function (i) { var a = i * 1.2566 - Math.PI / 2; return '<circle cx="' + (h * 0.55 * Math.cos(a)).toFixed(1) + '" cy="' + (h * 0.55 * Math.sin(a)).toFixed(1) + '" r="' + h * 0.4 + '"/>'; }).join('') + '<circle r="' + h * 0.3 + '" fill="#F2B632"/>';
      case 'bird': return '<ellipse rx="' + h * 0.62 + '" ry="' + h * 0.42 + '"/><circle cx="' + h * 0.52 + '" cy="' + -h * 0.32 + '" r="' + h * 0.27 + '"/><polygon points="' + h * 0.75 + ',' + -h * 0.36 + ' ' + h + ',' + -h * 0.26 + ' ' + h * 0.75 + ',' + -h * 0.18 + '" fill="#F2B632"/><polygon points="' + -h * 0.5 + ',0 ' + -h + ',' + -h * 0.25 + ' ' + -h + ',' + h * 0.3 + '"/>';
      case 'fish': return '<ellipse cx="' + -h * 0.15 + '" rx="' + h * 0.7 + '" ry="' + h * 0.45 + '"/><polygon points="' + h * 0.42 + ',0 ' + h + ',' + -h * 0.42 + ' ' + h + ',' + h * 0.42 + '"/><circle cx="' + -h * 0.5 + '" cy="' + -h * 0.1 + '" r="' + h * 0.08 + '" fill="#fff" stroke="none"/>';
      case 'tri': return '<polygon points="0,' + -h + ' ' + h + ',' + h * 0.85 + ' ' + -h + ',' + h * 0.85 + '"/><polygon points="0,' + -h + ' ' + h * 0.3 + ',' + -h * 0.45 + ' ' + h * 0.1 + ',' + -h * 0.5 + ' 0,' + -h * 0.35 + ' ' + -h * 0.12 + ',' + -h * 0.5 + ' ' + -h * 0.3 + ',' + -h * 0.45 + '" fill="#fff" opacity=".85"/>';
      case 'moon': return '<path d="M0 ' + -h + 'A' + h + ' ' + h + ' 0 1 0 0 ' + h + 'A' + h * 1.15 + ' ' + h * 1.15 + ' 0 0 1 0 ' + -h + 'Z"/>';
      case 'drop': return '<path d="M0 ' + -h + 'C' + h * 0.9 + ' 0 ' + h * 0.8 + ' ' + h * 0.9 + ' 0 ' + h * 0.9 + 'C' + -h * 0.8 + ' ' + h * 0.9 + ' ' + -h * 0.9 + ' 0 0 ' + -h + 'Z"/>';
      case 'home': return '<rect x="' + -h * 0.7 + '" y="' + -h * 0.1 + '" width="' + h * 1.4 + '" height="' + h * 1.05 + '"/><polygon points="' + -h + ',' + -h * 0.05 + ' 0,' + -h + ' ' + h + ',' + -h * 0.05 + '"/><rect x="' + -h * 0.18 + '" y="' + h * 0.35 + '" width="' + h * 0.36 + '" height="' + h * 0.6 + '" fill="#fff" opacity=".7" stroke="none"/>';
      case 'kite': return '<polygon points="0,' + -h + ' ' + h * 0.62 + ',' + -h * 0.2 + ' 0,' + h * 0.75 + ' ' + -h * 0.62 + ',' + -h * 0.2 + '"/><path d="M0 ' + h * 0.75 + 'q' + h * 0.15 + ' ' + h * 0.1 + ' 0 ' + h * 0.25 + '" fill="none" stroke-width="3"/><path d="M0 ' + -h + 'V' + h * 0.75 + 'M' + -h * 0.62 + ' ' + -h * 0.2 + 'H' + h * 0.62 + '" fill="none" stroke-width="2" opacity=".6"/>';
      case 'banner': return '<rect x="' + -h * 0.06 + '" y="' + -h + '" width="' + h * 0.12 + '" height="' + s + '"/><polygon points="' + h * 0.06 + ',' + -h * 0.92 + ' ' + h * 0.9 + ',' + -h * 0.75 + ' ' + h * 0.55 + ',' + -h * 0.2 + ' ' + h * 0.06 + ',' + h * 0.05 + '"/>';
      case 'sq': return '<rect x="' + -h * 0.8 + '" y="' + -h * 0.8 + '" width="' + h * 1.6 + '" height="' + h * 1.6 + '" rx="5"/>';
      case 'rec': return '<rect x="' + -s * 0.25 + '" y="' + -h + '" width="' + s * 0.5 + '" height="' + s + '" rx="5"/>';
      case 'dia': return '<polygon points="0,' + -h + ' ' + h * 0.8 + ',0 0,' + h + ' ' + -h * 0.8 + ',0"/>';
      case 'hex': return '<polygon points="' + poli(6, h) + '"/>';
      case 'pen': return '<polygon points="' + poli(5, h) + '"/>';
      case 'star': return '<polygon points="' + bintang(h) + '"/>';
      case 'heart': return '<path d="M0 ' + h * 0.8 + 'C' + -h * 1.3 + ' ' + -h * 0.1 + ' ' + -h * 0.5 + ' ' + -h * 0.9 + ' 0 ' + -h * 0.3 + 'C' + h * 0.5 + ' ' + -h * 0.9 + ' ' + h * 1.3 + ' ' + -h * 0.1 + ' 0 ' + h * 0.8 + 'Z"/>';
      case 'half': return '<path d="M' + -h + ' ' + h * 0.4 + 'A' + h + ' ' + h + ' 0 0 1 ' + h + ' ' + h * 0.4 + 'Z"/>';
      case 'ring': return '<path fill-rule="evenodd" d="M' + -h + ' 0a' + h + ' ' + h + ' 0 1 0 ' + s + ' 0a' + h + ' ' + h + ' 0 1 0 ' + -s + ' 0ZM' + -h * 0.5 + ' 0a' + h * 0.5 + ' ' + h * 0.5 + ' 0 1 0 ' + h + ' 0a' + h * 0.5 + ' ' + h * 0.5 + ' 0 1 0 ' + -h + ' 0Z"/>';
      case 'oval': return '<ellipse rx="' + h + '" ry="' + h * 0.6 + '"/>';
      case 'trap': return '<polygon points="' + -h * 0.5 + ',' + -h * 0.6 + ' ' + h * 0.5 + ',' + -h * 0.6 + ' ' + h + ',' + h * 0.6 + ' ' + -h + ',' + h * 0.6 + '"/>';
      case 'plus': return '<path d="M' + -s * 0.15 + ' ' + -h + 'h' + s * 0.3 + 'v' + h * 0.7 + 'h' + h * 0.7 + 'v' + s * 0.3 + 'h' + -h * 0.7 + 'v' + h * 0.7 + 'h' + -s * 0.3 + 'v' + -h * 0.7 + 'h' + -h * 0.7 + 'v' + -s * 0.3 + 'h' + h * 0.7 + 'z"/>';
      case 'bolt': return '<polygon points="' + h * 0.2 + ',' + -h + ' ' + -h * 0.6 + ',' + h * 0.15 + ' ' + -h * 0.05 + ',' + h * 0.15 + ' ' + -h * 0.2 + ',' + h + ' ' + h * 0.6 + ',' + -h * 0.2 + ' ' + h * 0.05 + ',' + -h * 0.2 + '"/>';
      case 'arrow': return '<polygon points="' + -h + ',' + -h * 0.25 + ' 0,' + -h * 0.25 + ' 0,' + -h * 0.6 + ' ' + h + ',0 0,' + h * 0.6 + ' 0,' + h * 0.25 + ' ' + -h + ',' + h * 0.25 + '"/>';
    }
    return '<circle r="' + h + '"/>';
  }

  /* Filter kertas: tepi sedikit tidak rata + bayangan tipis. Gambar raster diberi 3 tingkat warna lewat filter. */
  var DEFS = '<defs>' +
    '<filter id="fv" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3" result="d"/><feDropShadow in="d" dx="1.5" dy="3" stdDeviation="1.6" flood-color="#3B2A20" flood-opacity=".3"/></filter>' +
    '<filter id="fi0" x="-15%" y="-15%" width="130%" height="130%"><feComponentTransfer><feFuncR type="linear" slope=".42" intercept=".58"/><feFuncG type="linear" slope=".42" intercept=".56"/><feFuncB type="linear" slope=".42" intercept=".5"/></feComponentTransfer><feDropShadow dx="1.5" dy="3" stdDeviation="1.6" flood-color="#3B2A20" flood-opacity=".3"/></filter>' +
    '<filter id="fi1" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="1.5" dy="3" stdDeviation="1.6" flood-color="#3B2A20" flood-opacity=".3"/></filter>' +
    '<filter id="fi2" x="-15%" y="-15%" width="130%" height="130%"><feColorMatrix type="saturate" values="1.35"/><feComponentTransfer><feFuncR type="linear" slope=".58"/><feFuncG type="linear" slope=".6"/><feFuncB type="linear" slope=".62"/></feComponentTransfer><feDropShadow dx="1.5" dy="3" stdDeviation="1.6" flood-color="#3B2A20" flood-opacity=".35"/></filter>' +
    '<pattern id="serat" width="90" height="90" patternUnits="userSpaceOnUse"><rect width="90" height="90" fill="#FFFDF7"/><path d="M8 20q20-6 34 2M50 62q16-5 30 3M12 74q10-3 18 1M60 14q12-4 22 2" stroke="#EADFC8" stroke-width="1.2" fill="none" opacity=".7"/></pattern>' +
    '</defs>';

  /* Isi potongan tanpa transform: gambar raster atau bentuk vektor */
  function isiPotongan(p, ringan) {
    var d = POTONGAN[p.k] || {}, s = p.s;
    if (d.img && Muat.ada(d.img)) {
      var r = ASET.rasio[d.img] || 1, w = r >= 1 ? s : s * r, hh = r >= 1 ? s / r : s;
      return '<image href="' + ASET.img[d.img] + '" x="' + (-w / 2).toFixed(1) + '" y="' + (-hh / 2).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + hh.toFixed(1) + '" filter="url(#fi' + p.t + ')"/>';
    }
    var T = BERAT.tingkat[p.t];
    return '<g filter="url(#' + (ringan ? 'fi1' : 'fv') + ')" fill="' + T.warna + '" stroke="#fff" stroke-width="3" stroke-linejoin="round">' + bentuk(p.k, s) + '</g>';
  }

  /* Satu potongan lengkap untuk kanvas */
  function svg(p, i, opsi) {
    opsi = opsi || {};
    var rot = (p.a || 0) + (p.r || 0) * (p.fl || 1), s = p.s;
    var cls = 'pc' + (p.lock ? ' lk' : '') + (opsi.kelas ? ' ' + opsi.kelas : '');
    var out = '<g class="' + cls + '"' + (i != null ? ' data-i="' + i + '"' : '') + ' transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')">';
    out += '<g class="pc-isi"><g transform="rotate(' + rot.toFixed(1) + ') scale(' + (p.fl || 1) + ' 1)">' + isiPotongan(p, opsi.ringan) + '</g></g>';
    if (!opsi.polos) out += '<rect class="hit" x="' + (-s / 2) + '" y="' + (-s / 2) + '" width="' + s + '" height="' + s + '" fill="transparent"/>';
    if (Pengaturan.bantuan && !opsi.polos) {
      out += '<g fill="#fff" stroke="#3B2A20" stroke-width="1.5">';
      for (var j = 0; j <= p.t; j++) out += '<circle cx="' + (-s * 0.42 + j * 12) + '" cy="' + (-s * 0.42) + '" r="5"/>';
      out += '</g>';
    }
    if (p.lock && !opsi.polos) out += '<g transform="translate(' + (s * 0.36) + ' ' + (-s * 0.4) + ')">' + IKON.gembok + '</g>';
    if (opsi.pilih) out += '<circle class="cincin" r="' + (s * 0.62) + '" fill="none" stroke="#7B4B94" stroke-width="3" stroke-dasharray="8 6"/>';
    return out + '</g>';
  }

  /* Ikon kecil potongan untuk rak */
  function ikon(k, t) {
    return '<svg viewBox="-34 -34 68 68" aria-hidden="true">' + isiPotongan({ k: k, t: t, s: 56 }) + '</svg>';
  }

  /* ===== Model berat visual ===== */
  function berat(p) {
    var d = POTONGAN[p.k] || { luas: 0.5 };
    return d.luas * p.s * p.s * BERAT.tingkat[p.t].faktor * (d.corak ? BERAT.faktorCorak.bercorak : BERAT.faktorCorak.polos);
  }
  function timbang(L, tolTambah) {
    var M = 0, A = 0;
    L.forEach(function (p) { var m = berat(p) * (p.x - BERAT.pusatX); M += m; A += Math.abs(m); });
    var tol = (Pengaturan.santai ? BERAT.toleransiSantai : BERAT.toleransi) + (tolTambah || 0);
    var ok = A === 0 || Math.abs(M) <= tol * A;
    var sudut = ok ? 0 : clamp(M / A * BERAT.pengaliSudut, -BERAT.sudutMaks, BERAT.sudutMaks);
    return { ok: ok, M: M, A: A, sudut: sudut, tol: tol };
  }
  /* Susunan kembar: setiap potongan punya pasangan bercermin (jenis, warna, ukuran, letak) */
  /* Susunan dianggap kembar bila >= 85% berat (di luar sumbu) punya pasangan bercermin.
     Jadi menambah satu titik kecil pada susunan cermin tidak membuatnya "asimetris". */
  function kembar(L) {
    var e = BERAT.toleransiKembar, total = 0, pasang = 0;
    if (L.length < 2) return false;
    L.forEach(function (p) {
      if (Math.abs(p.x - BERAT.pusatX) <= e) return; // tepat di sumbu: netral
      var w = berat(p); total += w;
      if (L.some(function (q) { return q !== p && q.k === p.k && q.t === p.t && Math.abs(q.x - (BERAT.lebar - p.x)) <= e && Math.abs(q.y - p.y) <= e && Math.abs(q.s - p.s) <= e; })) pasang += w;
    });
    return total === 0 ? true : pasang / total >= BERAT.batasKembar;
  }
  /* Cari satu potongan bantuan yang membuat timbangan rata (untuk petunjuk ke-3) */
  function solusi(L, tolTambah) {
    var M = timbang(L).M, sisi = M > 0 ? -1 : 1, calon = [['sun', 2], ['sq', 2], ['star', 2], ['sun', 1]];
    for (var c = 0; c < calon.length; c++) {
      for (var s = 70; s <= 150; s += 10) {
        var p = { k: calon[c][0], t: calon[c][1], s: s, y: 170 };
        var dx = -M / berat(p);
        if (Math.abs(dx) >= 90 && Math.abs(dx) <= BERAT.pusatX - s / 2 - 6 && Math.sign(dx) === sisi) {
          p.x = BERAT.pusatX + dx;
          // pilih tinggi yang tidak menumpuk potongan lain (tinggi tidak memengaruhi momen)
          var ys = [170, 90, 250, 60, 280].filter(function (y) { return !L.some(function (q) { return Math.abs(q.x - p.x) < (q.s + s) * 0.45 && Math.abs(q.y - y) < (q.s + s) * 0.45; }); });
          if (!ys.length) continue;
          p.y = ys[0];
          var uji = L.concat([p]);
          if (timbang(uji, tolTambah).ok && !kembar(uji)) return p;
        }
      }
    }
    return null;
  }

  return { DEFS: DEFS, bentuk: bentuk, isi: isiPotongan, svg: svg, ikon: ikon, berat: berat, timbang: timbang, kembar: kembar, solusi: solusi };
})();
