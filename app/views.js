// Views: every page of NusaStat, rendered from data.js into #view. All controls
// work: sorting, filtering, comparing, searching and the CSV download.

import { META, HEADLINE, SERIES, SECTORS, ISLANDS, PROVINCES, TOPICS, RELEASES, searchIndex, fmtID, shareOf } from "./data.js";
import { lineChart, barChart, columnChart } from "./charts.js";

export const ROUTES = [
  { href: "#/", label: "Beranda" },
  { href: "#/provinsi", label: "Provinsi" },
  { href: "#/bandingkan", label: "Bandingkan" },
  { href: "#/cari", label: "Cari Data" },
  { href: "#/metode", label: "Metode & Sumber" },
];

function kpi(h) {
  return `<a class="kpi" href="#/topik/${h.topic}">
    <span class="kpi-label">${h.label}</span>
    <span class="kpi-value">${h.value}</span>
    <span class="kpi-detail">${h.detail}</span>
    <span class="kpi-source">${h.source}</span>
  </a>`;
}

function indicatorTable(rows) {
  const body = rows.map(([name, value, detail, source]) =>
    `<tr><th scope="row">${name}</th><td class="num">${value}</td><td>${detail}</td><td class="src">${source}</td></tr>`
  ).join("");
  return `<table class="data-table">
    <thead><tr><th>Indikator</th><th>Nilai</th><th>Keterangan</th><th>Sumber</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`;
}

function sourceNote(text) {
  return `<p class="source-note">Sumber: ${text}. Angka dibulatkan; jumlah komponen mungkin tidak sama dengan total.</p>`;
}

export function homeView() {
  const topics = TOPICS.map((t) =>
    `<a class="topic-card" href="#/topik/${t.id}">
      <h3>${t.name}</h3><p>${t.blurb}</p><span class="more">Lihat data →</span>
    </a>`
  ).join("");
  const releases = RELEASES.map((r) =>
    `<li><span class="rel-date">${r.date}</span><span class="rel-title">${r.title}</span><span class="rel-src">${r.source}</span></li>`
  ).join("");
  return `
  <section class="hero">
    <p class="eyebrow">Statistik Nasional · Indonesia</p>
    <h1>Angka resmi Indonesia,<br>dijelaskan dengan jelas.</h1>
    <p class="lede">NusaStat mengumpulkan angka-angka utama Indonesia — penduduk, ekonomi, harga, tenaga kerja, kemiskinan, dan perdagangan — dari rilis resmi BPS dan Bank Indonesia, dengan sumber dan tahun pada setiap angka.</p>
    <p class="hero-meta">Angka tahunan terbaru: 2024 · Diperbarui ${META.updated}</p>
  </section>
  <section class="kpi-grid" aria-label="Angka utama">${HEADLINE.map(kpi).join("")}</section>
  <section class="grid-2">
    <article class="card">
      <h2>Pertumbuhan ekonomi</h2>
      ${columnChart(SERIES.pertumbuhan)}
      ${sourceNote(SERIES.pertumbuhan.source)}
      <p><a href="#/topik/ekonomi">Lihat topik Ekonomi →</a></p>
    </article>
    <article class="card">
      <h2>Penduduk menurut pulau</h2>
      ${barChart(ISLANDS.title, ISLANDS.rows, "jt")}
      ${sourceNote(ISLANDS.source)}
      <p><a href="#/topik/penduduk">Lihat topik Penduduk →</a></p>
    </article>
  </section>
  <section>
    <h2>Jelajahi berdasarkan topik</h2>
    <div class="topic-grid">${topics}</div>
  </section>
  <section class="grid-2">
    <article class="card">
      <h2>Rilis terbaru</h2>
      <ul class="releases">${releases}</ul>
    </article>
    <article class="card">
      <h2>Cari angka</h2>
      <p>Ketik nama indikator — misalnya “kemiskinan”, “ekspor”, atau “Jawa Barat” — dan NusaStat mencarikannya di semua tabel.</p>
      <p><a class="btn" href="#/cari">Buka pencarian</a></p>
      <h2 class="mt">Bandingkan provinsi</h2>
      <p>Pilih dua provinsi dan lihat penduduknya bersebelahan.</p>
      <p><a class="btn" href="#/bandingkan">Bandingkan provinsi</a></p>
    </article>
  </section>`;
}

export function topicView(id) {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return `<section class="card"><h1>Topik tidak ditemukan</h1><p><a href="#/">Kembali ke Beranda</a></p></section>`;
  let chart = "";
  if (t.chart === "islands") chart = barChart(ISLANDS.title, ISLANDS.rows, "jt") + sourceNote(ISLANDS.source);
  else if (SERIES[t.chart]) chart = columnChart(SERIES[t.chart]) + sourceNote(SERIES[t.chart].source);
  const others = TOPICS.filter((x) => x.id !== id).map((x) =>
    `<a href="#/topik/${x.id}">${x.name}</a>`).join(" · ");
  return `
  <section>
    <p class="eyebrow"><a href="#/">Beranda</a> / ${t.name}</p>
    <h1>${t.name}</h1>
    <p class="lede">${t.blurb}</p>
  </section>
  <section class="grid-2">
    <article class="card"><h2>Angka-angka utama</h2>${indicatorTable(t.rows)}</article>
    <article class="card"><h2>Grafik</h2>${chart}<p class="note">${t.note}</p></article>
  </section>
  <section><p class="topic-nav">Topik lain: ${others}</p></section>`;
}

// --- Provinces -------------------------------------------------------------
let sortKey = "pop";
let sortDir = -1;
let islandFilter = "Semua";
let regionsMounted = false;

function sortedProvinces() {
  let list = PROVINCES.filter((p) => islandFilter === "Semua" || p.island === islandFilter);
  list = [...list].sort((a, b) => {
    if (sortKey === "name") return sortDir * a.name.localeCompare(b.name, "id");
    return sortDir * (a[sortKey] - b[sortKey]);
  });
  return list;
}

function provinceRows() {
  return sortedProvinces().map((p) =>
    `<tr>
      <td><a href="#/bandingkan/${encodeURIComponent(p.name)}">${p.name}</a></td>
      <td>${p.island}</td>
      <td class="num">${fmtID(p.pop)}</td>
      <td class="num">${fmtID(shareOf(p.pop))}%</td>
      <td><a class="mini-link" href="#/bandingkan/${encodeURIComponent(p.name)}">Bandingkan →</a></td>
    </tr>`
  ).join("");
}

export function regionsView() {
  regionsMounted = false;
  const islands = ["Semua", ...new Set(PROVINCES.map((p) => p.island))];
  const options = islands.map((i) => `<option${i === islandFilter ? " selected" : ""}>${i}</option>`).join("");
  const arrow = (key) => (sortKey === key ? (sortDir === 1 ? " ▲" : " ▼") : "");
  return `
  <section>
    <p class="eyebrow"><a href="#/">Beranda</a> / Provinsi</p>
    <h1>Provinsi</h1>
    <p class="lede">Penduduk 38 provinsi Indonesia, estimasi pertengahan 2024 (BPS, dibulatkan ke 0,1 juta jiwa). Klik nama provinsi untuk membandingkannya dengan provinsi lain.</p>
  </section>
  <section class="card">
    <div class="toolbar">
      <label>Pulau:
        <select id="island-filter">${options}</select>
      </label>
      <span class="count" id="prov-count">${sortedProvinces().length} provinsi</span>
    </div>
    <div class="table-wrap">
    <table class="data-table" id="prov-table">
      <thead><tr>
        <th><button class="sort-btn" data-sort="name">Provinsi${arrow("name")}</button></th>
        <th>Pulau</th>
        <th><button class="sort-btn" data-sort="pop">Penduduk (juta)${arrow("pop")}</button></th>
        <th>Pangsa</th>
        <th></th>
      </tr></thead>
      <tbody>${provinceRows()}</tbody>
    </table>
    </div>
    ${sourceNote("BPS, estimasi pertengahan 2024. Angka dibulatkan; jumlah provinsi mungkin tidak sama dengan total nasional 281,6 juta jiwa.")}
  </section>`;
}

export function mountRegions() {
  // The table body is re-rendered in place, so attach these listeners once.
  if (regionsMounted) return;
  regionsMounted = true;
  document.querySelectorAll("#prov-table .sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sort;
      if (sortKey === key) sortDir = -sortDir;
      else { sortKey = key; sortDir = key === "name" ? 1 : -1; }
      rerenderRegionsTable();
    });
  });
  document.getElementById("island-filter").addEventListener("change", (e) => {
    islandFilter = e.target.value;
    rerenderRegionsTable();
  });
}

function rerenderRegionsTable() {
  const table = document.getElementById("prov-table");
  if (!table) return;
  table.querySelector("tbody").innerHTML = provinceRows();
  document.getElementById("prov-count").textContent = `${sortedProvinces().length} provinsi`;
  document.querySelectorAll("#prov-table .sort-btn").forEach((btn) => {
    const key = btn.dataset.sort;
    btn.textContent = (key === "name" ? "Provinsi" : "Penduduk (juta)") +
      (sortKey === key ? (sortDir === 1 ? " ▲" : " ▼") : "");
  });
  mountRegions();
}

// --- Compare ---------------------------------------------------------------
function provinceOptions(selected) {
  return PROVINCES.map((p) => `<option${p.name === selected ? " selected" : ""}>${p.name}</option>`).join("");
}

function compareBars(a, b) {
  const max = Math.max(a.pop, b.pop);
  const row = (p, color) => {
    const pct = ((p.pop / max) * 100).toFixed(1);
    return `<div class="cmp-row">
      <div class="cmp-head"><strong>${p.name}</strong><span>${fmtID(p.pop)} juta jiwa · ${fmtID(shareOf(p.pop))}% dari Indonesia</span></div>
      <div class="cmp-bar"><div style="width:${pct}%;background:${color}"></div></div>
      <div class="cmp-meta">Pulau ${p.island}</div>
    </div>`;
  };
  const bigger = a.pop >= b.pop ? a : b;
  const ratio = (Math.max(a.pop, b.pop) / Math.min(a.pop, b.pop)).toFixed(1);
  return `<div class="card">
    ${row(a, "#0f766e")}${row(b, "#c2571b")}
    <p class="note">${bigger.name} penduduknya ${ratio} kali ${a.pop >= b.pop ? b.name : a.name}.</p>
  </div>`;
}

export function compareView(aName, bName) {
  const a = PROVINCES.find((p) => p.name === aName) ?? PROVINCES.find((p) => p.name === "Jawa Barat");
  const b = PROVINCES.find((p) => p.name === bName) ?? PROVINCES.find((p) => p.name === "DKI Jakarta");
  return `
  <section>
    <p class="eyebrow"><a href="#/">Beranda</a> / Bandingkan</p>
    <h1>Bandingkan provinsi</h1>
    <p class="lede">Pilih dua provinsi dan lihat jumlah penduduknya bersebelahan.</p>
  </section>
  <section class="card">
    <div class="toolbar">
      <label>Provinsi pertama:
        <select id="cmp-a">${provinceOptions(a.name)}</select>
      </label>
      <label>Provinsi kedua:
        <select id="cmp-b">${provinceOptions(b.name)}</select>
      </label>
    </div>
    <div id="cmp-result">${compareBars(a, b)}</div>
    ${sourceNote("BPS, estimasi pertengahan 2024, dibulatkan ke 0,1 juta jiwa.")}
  </section>`;
}

export function mountCompare() {
  const update = () => {
    const a = PROVINCES.find((p) => p.name === document.getElementById("cmp-a").value);
    const b = PROVINCES.find((p) => p.name === document.getElementById("cmp-b").value);
    document.getElementById("cmp-result").innerHTML = compareBars(a, b);
  };
  document.getElementById("cmp-a").addEventListener("change", update);
  document.getElementById("cmp-b").addEventListener("change", update);
}

// --- Search ----------------------------------------------------------------
const INDEX = searchIndex();

export function searchView(q) {
  const query = (q ?? "").trim().toLowerCase();
  const hits = query
    ? INDEX.filter((it) => `${it.name} ${it.value} ${it.topic}`.toLowerCase().includes(query))
    : [];
  const list = query
    ? (hits.length
      ? `<p class="count">${hits.length} hasil untuk “${q}”</p>` + indicatorTable(hits.map((h) => [h.name, h.value, `${h.detail} · ${h.topic}`, h.source]))
      : `<p class="note">Tidak ada hasil untuk “${q}”. Coba kata lain, misalnya “kemiskinan”, “ekspor”, atau nama provinsi.</p>`)
    : `<p class="note">Coba: “kemiskinan”, “ekspor”, “Jawa Barat”, “inflasi”, “pengangguran”.</p>`;
  return `
  <section>
    <p class="eyebrow"><a href="#/">Beranda</a> / Cari Data</p>
    <h1>Cari data</h1>
    <p class="lede">Mencari di semua tabel indikator dan semua provinsi.</p>
  </section>
  <section class="card">
    <label class="search-label">Kata kunci
      <input id="search-input" type="search" placeholder="Misalnya: kemiskinan, ekspor, Jawa Barat" value="${q ?? ""}" autocomplete="off">
    </label>
    <div id="search-results">${list}</div>
  </section>`;
}

export function mountSearch() {
  const input = document.getElementById("search-input");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const box = document.getElementById("search-results");
    if (!q) { box.innerHTML = `<p class="note">Coba: “kemiskinan”, “ekspor”, “Jawa Barat”, “inflasi”, “pengangguran”.</p>`; return; }
    const hits = INDEX.filter((it) => `${it.name} ${it.value} ${it.topic}`.toLowerCase().includes(q));
    box.innerHTML = hits.length
      ? `<p class="count">${hits.length} hasil untuk “${input.value.trim()}”</p>` +
        indicatorTable(hits.map((h) => [h.name, h.value, `${h.detail} · ${h.topic}`, h.source]))
      : `<p class="note">Tidak ada hasil untuk “${input.value.trim()}”.</p>`;
  });
  input.focus();
}

// --- Methods ---------------------------------------------------------------
export function methodsView() {
  const sources = META.sources.map((s) =>
    `<tr><th scope="row">${s.short}</th><td>${s.name}</td><td>${s.note}</td></tr>`).join("");
  return `
  <section>
    <p class="eyebrow"><a href="#/">Beranda</a> / Metode &amp; Sumber</p>
    <h1>Metode &amp; sumber</h1>
    <p class="lede">Dari mana angka-angka di situs ini berasal, dan bagaimana membacanya.</p>
  </section>
  <section class="grid-2">
    <article class="card">
      <h2>Sumber data</h2>
      <table class="data-table"><thead><tr><th>Singkatan</th><th>Lembaga</th><th>Catatan</th></tr></thead><tbody>${sources}</tbody></table>
      <p class="note">Setiap angka di situs ini mencantumkan sumber dan tahunnya di tabel tempat angka itu tampil.</p>
    </article>
    <article class="card">
      <h2>Cara membaca angka</h2>
      <ul class="bullets">
        <li><strong>Tahun acuan</strong> angka tahunan adalah 2024, tahun terakhir dengan angka lengkap yang diterbitkan.</li>
        <li><strong>Pembulatan:</strong> angka dibulatkan ke satu desimal; jumlah komponen mungkin tidak sama dengan total.</li>
        <li><strong>Estimasi penduduk provinsi</strong> adalah estimasi pertengahan tahun BPS, dibulatkan ke 0,1 juta jiwa.</li>
        <li><strong>y-on-y</strong> berarti dibanding periode yang sama tahun sebelumnya; <strong>m-to-m</strong> dibanding bulan sebelumnya.</li>
        <li><strong>TPT</strong> adalah Tingkat Pengangguran Terbuka; <strong>TPAK</strong> adalah Tingkat Partisipasi Angkatan Kerja.</li>
      </ul>
    </article>
  </section>
  <section class="card">
    <h2>Unduh dataset</h2>
    <p>Seluruh angka di situs ini — semua indikator dan penduduk 38 provinsi — tersedia sebagai satu berkas CSV.</p>
    <p><button class="btn" id="csv-btn" type="button">Unduh semua data (CSV)</button> <span id="csv-note" class="note"></span></p>
  </section>`;
}

export function mountMethods() {
  document.getElementById("csv-btn").addEventListener("click", () => {
    const rows = [["indikator", "nilai", "keterangan", "sumber", "topik"]];
    for (const it of INDEX) rows.push([it.name, it.value, it.detail, it.source, it.topic]);
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = "nusastat-data.csv"; a.click();
    URL.revokeObjectURL(url);
    document.getElementById("csv-note").textContent = `Diunduh: ${INDEX.length} baris data.`;
  });
}

// --- Sectors (used on the economy topic's second chart) --------------------
export function sectorsChart() {
  return barChart(SECTORS.title, SECTORS.rows, "%") + sourceNote(SECTORS.source);
}
