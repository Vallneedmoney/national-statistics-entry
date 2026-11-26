// NusaStat router: hash routes, one page per route, rendered into #view.
// Routes: #/ (home), #/topik/<id>, #/provinsi, #/bandingkan[/<a>[/<b>]],
// #/cari[?q=...], #/metode. After each render, window.__shotReady is set so
// screenshots wait for the page to be complete.

import { ROUTES, homeView, topicView, regionsView, mountRegions, compareView, mountCompare, searchView, mountSearch, methodsView, mountMethods } from "./views.js";
import { META } from "./data.js";

const view = document.getElementById("view");
const nav = document.getElementById("main-nav");

nav.innerHTML = ROUTES.map((r) => `<a href="${r.href}" data-route="${r.href}">${r.label}</a>`).join("");

function parseHash() {
  const raw = window.location.hash.slice(1) || "/";
  const [pathPart, queryPart] = raw.split("?");
  const parts = pathPart.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
  const query = new URLSearchParams(queryPart ?? "");
  return { parts, query };
}

function render() {
  const { parts, query } = parseHash();
  let html = "";
  let mount = null;
  const [first, second, third] = parts;
  if (parts.length === 0) {
    html = homeView();
  } else if (first === "topik" && second) {
    html = topicView(second);
  } else if (first === "provinsi") {
    html = regionsView();
    mount = mountRegions;
  } else if (first === "bandingkan") {
    html = compareView(second, third);
    mount = mountCompare;
  } else if (first === "cari") {
    html = searchView(query.get("q") ?? "");
    mount = mountSearch;
  } else if (first === "metode") {
    html = methodsView();
    mount = mountMethods;
  } else {
    html = `<section class="card"><h1>Halaman tidak ditemukan</h1><p><a href="#/">Kembali ke Beranda</a></p></section>`;
  }
  view.innerHTML = html;
  const current = "#/" + parts.join("/");
  nav.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === current || (href === "#/" && parts.length === 0) || (parts.length > 0 && href !== "#/" && current.startsWith(href)));
  });
  if (mount) mount();
  document.title = `${META.siteName} — Statistik ${META.country}`;
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", () => { window.__shotReady = false; render(); });
render();
