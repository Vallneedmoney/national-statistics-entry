// NusaStat data: figures for Indonesia's national statistics, compiled from
// official releases. Every figure carries its source and year; provincial
// populations are mid-year estimates rounded to 0.1 million, so their sum may
// differ slightly from the national total. All numbers are data, not code.
// Reference year for annual figures is 2024, the latest year with complete
// published figures; the site itself was last updated 26 November 2026.

export const META = {
  country: "Indonesia",
  siteName: "NusaStat",
  tagline: "Statistik Indonesia, dijelaskan dengan jelas",
  updated: "26 November 2026",
  sources: [
    { short: "BPS", name: "Badan Pusat Statistik", note: "Statistics Indonesia — the national statistics office" },
    { short: "BI", name: "Bank Indonesia", note: "Central bank: balance of payments and reserves" },
    { short: "APJII", name: "Asosiasi Penyelenggara Jasa Internet Indonesia", note: "Internet penetration survey" },
  ],
};

export const HEADLINE = [
  { id: "populasi", label: "Penduduk", value: "281,6 jt", detail: "estimasi pertengahan 2024", source: "BPS, 2024", topic: "penduduk" },
  { id: "pdb", label: "PDB", value: "Rp 22.138 T", detail: "harga berlaku, 2024", source: "BPS, 2024", topic: "ekonomi" },
  { id: "tumbuh", label: "Pertumbuhan ekonomi", value: "5,03%", detail: "tahun 2024", source: "BPS, 2024", topic: "ekonomi" },
  { id: "inflasi", label: "Inflasi", value: "1,57%", detail: "y-on-y, Des 2024", source: "BPS, 2024", topic: "harga" },
  { id: "pengangguran", label: "Pengangguran (TPT)", value: "4,91%", detail: "Agustus 2024", source: "BPS, 2024", topic: "tenaga-kerja" },
  { id: "kemiskinan", label: "Kemiskinan", value: "8,57%", detail: "September 2024", source: "BPS, 2024", topic: "kemiskinan" },
];

export const SERIES = {
  // Economic growth, % y-on-y (BPS)
  pertumbuhan: {
    title: "Pertumbuhan ekonomi (% per tahun)",
    unit: "%",
    source: "BPS, 2019–2024",
    points: [["2019", 5.02], ["2020", -2.07], ["2021", 3.7], ["2022", 5.31], ["2023", 5.05], ["2024", 5.03]],
  },
  // December year-on-year CPI inflation, % (BPS)
  inflasi: {
    title: "Inflasi Desember (y-on-y, %)",
    unit: "%",
    source: "BPS, 2019–2024",
    points: [["2019", 2.72], ["2020", 1.68], ["2021", 1.87], ["2022", 5.51], ["2023", 2.61], ["2024", 1.57]],
  },
  // Poverty rate, September, % (BPS)
  kemiskinan: {
    title: "Tingkat kemiskinan, September (%)",
    unit: "%",
    source: "BPS, 2019–2024",
    points: [["2019", 9.22], ["2020", 10.19], ["2021", 9.71], ["2022", 9.57], ["2023", 9.36], ["2024", 8.57]],
  },
  // Open unemployment rate, August, % (BPS)
  pengangguran: {
    title: "Tingkat pengangguran terbuka, Agustus (%)",
    unit: "%",
    source: "BPS, 2019–2024",
    points: [["2019", 5.28], ["2020", 7.07], ["2021", 6.49], ["2022", 5.86], ["2023", 5.32], ["2024", 4.91]],
  },
  // Exports, US$ billion (BPS)
  ekspor: {
    title: "Nilai ekspor (miliar US$)",
    unit: "US$ M",
    source: "BPS, 2020–2024",
    points: [["2020", 163.2], ["2021", 231.6], ["2022", 291.9], ["2023", 258.8], ["2024", 264.7]],
  },
};

export const SECTORS = {
  title: "Pangsa PDB menurut lapangan usaha, 2024 (%)",
  source: "BPS, 2024 — dibulatkan",
  rows: [
    ["Industri pengolahan", 18.7],
    ["Perdagangan", 12.8],
    ["Pertanian, kehutanan, perikanan", 12.1],
    ["Konstruksi", 9.8],
    ["Pertambangan dan penggalian", 8.4],
    ["Informasi dan komunikasi", 4.4],
    ["Jasa keuangan", 4.2],
    ["Transportasi dan pergudangan", 3.7],
  ],
};

export const ISLANDS = {
  title: "Penduduk menurut pulau, 2024 (juta jiwa)",
  source: "BPS, estimasi pertengahan 2024 — dibulatkan",
  rows: [
    ["Jawa", 156.5],
    ["Sumatera", 61.8],
    ["Sulawesi", 21.1],
    ["Kalimantan", 17.6],
    ["Bali dan Nusa Tenggara", 15.8],
    ["Maluku dan Papua", 9.7],
  ],
};

// Provinces: population in millions, BPS mid-year 2024 estimate, rounded to 0.1.
export const PROVINCES = [
  { name: "Aceh", island: "Sumatera", pop: 5.5 },
  { name: "Sumatera Utara", island: "Sumatera", pop: 15.6 },
  { name: "Sumatera Barat", island: "Sumatera", pop: 5.8 },
  { name: "Riau", island: "Sumatera", pop: 7.0 },
  { name: "Jambi", island: "Sumatera", pop: 3.7 },
  { name: "Sumatera Selatan", island: "Sumatera", pop: 9.0 },
  { name: "Bengkulu", island: "Sumatera", pop: 2.1 },
  { name: "Lampung", island: "Sumatera", pop: 9.4 },
  { name: "Kepulauan Bangka Belitung", island: "Sumatera", pop: 1.5 },
  { name: "Kepulauan Riau", island: "Sumatera", pop: 2.2 },
  { name: "DKI Jakarta", island: "Jawa", pop: 10.7 },
  { name: "Jawa Barat", island: "Jawa", pop: 49.9 },
  { name: "Jawa Tengah", island: "Jawa", pop: 37.9 },
  { name: "DI Yogyakarta", island: "Jawa", pop: 3.8 },
  { name: "Jawa Timur", island: "Jawa", pop: 41.8 },
  { name: "Banten", island: "Jawa", pop: 12.4 },
  { name: "Bali", island: "Bali dan Nusa Tenggara", pop: 4.4 },
  { name: "Nusa Tenggara Barat", island: "Bali dan Nusa Tenggara", pop: 5.7 },
  { name: "Nusa Tenggara Timur", island: "Bali dan Nusa Tenggara", pop: 5.7 },
  { name: "Kalimantan Barat", island: "Kalimantan", pop: 5.9 },
  { name: "Kalimantan Tengah", island: "Kalimantan", pop: 2.8 },
  { name: "Kalimantan Selatan", island: "Kalimantan", pop: 4.3 },
  { name: "Kalimantan Timur", island: "Kalimantan", pop: 3.9 },
  { name: "Kalimantan Utara", island: "Kalimantan", pop: 0.7 },
  { name: "Sulawesi Utara", island: "Sulawesi", pop: 2.8 },
  { name: "Sulawesi Tengah", island: "Sulawesi", pop: 3.1 },
  { name: "Sulawesi Selatan", island: "Sulawesi", pop: 9.5 },
  { name: "Sulawesi Tenggara", island: "Sulawesi", pop: 2.8 },
  { name: "Gorontalo", island: "Sulawesi", pop: 1.3 },
  { name: "Sulawesi Barat", island: "Sulawesi", pop: 1.6 },
  { name: "Maluku", island: "Maluku dan Papua", pop: 2.0 },
  { name: "Maluku Utara", island: "Maluku dan Papua", pop: 1.4 },
  { name: "Papua Barat", island: "Maluku dan Papua", pop: 1.2 },
  { name: "Papua Barat Daya", island: "Maluku dan Papua", pop: 0.6 },
  { name: "Papua", island: "Maluku dan Papua", pop: 1.1 },
  { name: "Papua Selatan", island: "Maluku dan Papua", pop: 0.5 },
  { name: "Papua Tengah", island: "Maluku dan Papua", pop: 1.4 },
  { name: "Papua Pegunungan", island: "Maluku dan Papua", pop: 1.5 },
];

export const TOPICS = [
  {
    id: "penduduk",
    name: "Penduduk",
    blurb: "Berapa banyak penduduk Indonesia, di mana mereka tinggal, dan bagaimana komposisinya.",
    rows: [
      ["Jumlah penduduk", "281,6 juta jiwa", "Estimasi pertengahan 2024", "BPS, 2024"],
      ["Laju pertumbuhan penduduk", "0,8% per tahun", "2023–2024", "BPS, 2024"],
      ["Usia median", "31,0 tahun", "Setengah penduduk lebih muda dari ini", "BPS, 2024"],
      ["Rasio jenis kelamin", "101 laki-laki per 100 perempuan", "2024", "BPS, 2024"],
      ["Penduduk 0–14 tahun", "24,4% dari penduduk", "2024", "BPS, 2024"],
      ["Penduduk 15–64 tahun", "68,9% dari penduduk", "Usia kerja", "BPS, 2024"],
      ["Penduduk 65 tahun ke atas", "6,7% dari penduduk", "2024", "BPS, 2024"],
      ["Penduduk perkotaan", "58,6% dari penduduk", "Tinggal di daerah perkotaan", "BPS, 2024"],
      ["Provinsi terbanyak penduduknya", "Jawa Barat — 49,9 juta jiwa", "2024", "BPS, 2024"],
      ["Provinsi paling sedikit penduduknya", "Kalimantan Utara — 0,7 juta jiwa", "2024", "BPS, 2024"],
    ],
    chart: "islands",
    note: "Indonesia adalah negara berpenduduk terbanyak keempat di dunia. Lebih dari separuh penduduk tinggal di Pulau Jawa, yang luasnya kurang dari 7% wilayah daratan.",
  },
  {
    id: "ekonomi",
    name: "Ekonomi",
    blurb: "Besarnya perekonomian, seberapa cepat ia tumbuh, dan sektor apa yang menggerakkannya.",
    rows: [
      ["PDB (harga berlaku)", "Rp 22.138 triliun", "2024", "BPS, 2024"],
      ["Pertumbuhan ekonomi", "5,03% per tahun", "2024", "BPS, 2024"],
      ["PDB per kapita", "Rp 78,6 juta", "Sekitar US$ 4.925", "BPS, 2024"],
      ["Sektor terbesar", "Industri pengolahan — 18,7% dari PDB", "2024", "BPS, 2024"],
      ["Pertanian", "12,1% dari PDB", "2024", "BPS, 2024"],
      ["Perdagangan", "12,8% dari PDB", "2024", "BPS, 2024"],
      ["Konstruksi", "9,8% dari PDB", "2024", "BPS, 2024"],
      ["Pertambangan", "8,4% dari PDB", "2024", "BPS, 2024"],
    ],
    chart: "pertumbuhan",
    note: "Perekonomian Indonesia tumbuh di atas 5% selama tiga tahun berturut-turut (2022–2024), pulih dari kontraksi 2,07% pada 2020.",
  },
  {
    id: "harga",
    name: "Harga",
    blurb: "Inflasi: seberapa cepat harga naik, dan apa yang mendorongnya.",
    rows: [
      ["Inflasi (y-on-y, Desember)", "1,57%", "Desember 2024", "BPS, 2024"],
      ["Inflasi tertinggi 6 tahun terakhir", "5,51%", "Desember 2022", "BPS, 2024"],
      ["Inflasi terendah 6 tahun terakhir", "1,57%", "Desember 2024", "BPS, 2024"],
      ["Sasaran inflasi Bank Indonesia", "2,5% ± 1 poin", "2024", "BI, 2024"],
      ["Komponen yang diawasi", "Bahan makanan, harga diatur pemerintah, inti", "—", "BPS, 2024"],
    ],
    chart: "inflasi",
    note: "Inflasi 2024 sebesar 1,57% adalah yang terendah dalam enam tahun, berada di bawah batas bawah sasaran Bank Indonesia.",
  },
  {
    id: "tenaga-kerja",
    name: "Tenaga Kerja",
    blurb: "Siapa yang bekerja, di mana mereka bekerja, dan berapa banyak yang menganggur.",
    rows: [
      ["Angkatan kerja", "149,4 juta orang", "Agustus 2024", "BPS, 2024"],
      ["Tingkat partisipasi (TPAK)", "70,63%", "Agustus 2024", "BPS, 2024"],
      ["Tingkat pengangguran terbuka", "4,91%", "Agustus 2024", "BPS, 2024"],
      ["Pekerja di pertanian", "27,9% dari pekerja", "Agustus 2024", "BPS, 2024"],
      ["Pekerja di perdagangan", "18,9% dari pekerja", "Agustus 2024", "BPS, 2024"],
      ["Pekerja di industri pengolahan", "13,7% dari pekerja", "Agustus 2024", "BPS, 2024"],
      ["Pekerja di konstruksi", "6,5% dari pekerja", "Agustus 2024", "BPS, 2024"],
      ["Pekerja informal", "Sekitar 59% dari pekerja", "Agustus 2024", "BPS, 2024"],
    ],
    chart: "pengangguran",
    note: "Pengangguran turun dari puncak 7,07% pada Agustus 2020 menjadi 4,91% pada Agustus 2024 — yang terendah sejak sebelum pandemi.",
  },
  {
    id: "kemiskinan",
    name: "Kemiskinan & Kesejahteraan",
    blurb: "Berapa banyak penduduk yang hidup di bawah garis kemiskinan, dan bagaimana kesejahteraan membaik.",
    rows: [
      ["Tingkat kemiskinan", "8,57%", "24,06 juta jiwa, September 2024", "BPS, 2024"],
      ["Garis kemiskinan", "Rp 595 ribu per kapita per bulan", "September 2024", "BPS, 2024"],
      ["Rasio Gini", "0,379", "Ketimpangan pengeluaran, Maret 2024", "BPS, 2024"],
      ["Indeks Pembangunan Manusia", "75,02", "Kategori tinggi, 2024", "BPS, 2024"],
      ["Umur harapan hidup", "74,1 tahun", "2024", "BPS, 2024"],
      ["Rata-rata lama sekolah", "9,0 tahun", "Penduduk usia 25+, 2024", "BPS, 2024"],
      ["Pengguna internet", "221,6 juta orang", "2024", "APJII, 2024"],
    ],
    chart: "kemiskinan",
    note: "Kemiskinan turun ke 8,57% pada September 2024 — titik terendah yang pernah tercatat — sementara IPM menembus 75 untuk pertama kalinya.",
  },
  {
    id: "perdagangan",
    name: "Perdagangan",
    blurb: "Apa yang dijual Indonesia ke dunia, apa yang dibelinya, dan neraca di antaranya.",
    rows: [
      ["Nilai ekspor", "US$ 264,7 miliar", "2024", "BPS, 2024"],
      ["Nilai impor", "US$ 233,7 miliar", "2024", "BPS, 2024"],
      ["Surplus perdagangan", "US$ 31,0 miliar", "2024", "BPS, 2024"],
      ["Komoditas ekspor utama", "Batu bara, minyak sawit, besi dan baja", "2024", "BPS, 2024"],
      ["Tujuan ekspor terbesar", "Tiongkok, Amerika Serikat, Jepang", "2024", "BPS, 2024"],
      ["Defisit transaksi berjalan", "0,6% dari PDB", "2024", "BI, 2024"],
      ["Cadangan devisa", "US$ 155,7 miliar", "Akhir 2024", "BI, 2024"],
    ],
    chart: "ekspor",
    note: "Indonesia mencatat surplus perdagangan selama lima tahun berturut-turut, ditopang batu bara dan minyak sawit, meski nilai ekspor 2024 masih di bawah puncak 2022.",
  },
];

export const RELEASES = [
  { date: "5 Nov 2024", title: "Pertumbuhan Ekonomi Indonesia Triwulan III-2024", source: "BPS" },
  { date: "1 Nov 2024", title: "Indeks Harga Konsumen Oktober 2024", source: "BPS" },
  { date: "5 Nov 2024", title: "Keadaan Ketenagakerjaan Indonesia Agustus 2024", source: "BPS" },
  { date: "15 Okt 2024", title: "Profil Kemiskinan di Indonesia September 2024", source: "BPS" },
  { date: "15 Nov 2024", title: "Indeks Pembangunan Manusia 2024 mencapai 75,02", source: "BPS" },
  { date: "15 Okt 2024", title: "Perkembangan Ekspor dan Impor Indonesia September 2024", source: "BPS" },
];

// Search index: every findable indicator, built from the tables above.
export function searchIndex() {
  const items = [];
  for (const t of TOPICS) {
    for (const [name, value, detail, source] of t.rows) {
      items.push({ name, value, detail, source, topic: t.name, topicId: t.id });
    }
  }
  for (const p of PROVINCES) {
    items.push({
      name: `Penduduk ${p.name}`,
      value: `${fmtID(p.pop)} juta jiwa`,
      detail: `Provinsi di Pulau ${p.island}`,
      source: "BPS, 2024",
      topic: "Provinsi",
      topicId: "provinsi",
    });
  }
  return items;
}

export function fmtID(n) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function shareOf(pop) {
  return (pop / 281.6) * 100;
}
