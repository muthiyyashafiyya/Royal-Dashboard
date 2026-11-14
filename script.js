// ===== Ambil elemen =====
const navLinks = document.querySelectorAll(".nav-link");
const namaMahasiswa = document.getElementById("nama-mahasiswa");
const namaKelas = document.getElementById("nama-kelas");

// Peta: menu sidebar -> kartu yang ikut menyala
const kartuTarget = {
  progres: ["card-progres"],       // hanya Progres Kelas
  aktifitas: ["card-aktifitas"],   // hanya Aktifitas Selanjutnya
  statistik: ["card-statistik"],
  dokumen: ["card-dokumen"],
};

// Teks bawaan & teks setelah diklik
const TEKS = {
  namaAwal: "Nama Mahasiswa",
  namaKlik: "Muthiyya",
  kelasAwal: "Kelas SI-3X",
  kelasKlik: "Kelas SI-3C",
};

// Nyalakan efek berdebar pada teks (restart animasi tiap klik)
function debarTeks(el) {
  el.classList.remove("berwarna");
  void el.offsetWidth;
  el.classList.add("berwarna");
}

// ===== Hapus semua efek & kembalikan teks awal =====
function resetEfek() {
  document.querySelectorAll(".card.sorot").forEach((el) => el.classList.remove("sorot"));
  // teks nama & kelas TIDAK direset di sini, supaya tetap saat menu lain diklik
  namaMahasiswa.classList.remove("berwarna");
  namaKelas.classList.remove("berwarna");
}

// ===== Nyalakan kartu (restart animasi tiap klik) =====
function sorotKartu(ids) {
  ids.forEach((id) => {
    const kartu = document.getElementById(id);
    if (!kartu) return;
    kartu.classList.remove("sorot");
    void kartu.offsetWidth; // reflow agar animasi berdebar ulang
    kartu.classList.add("sorot");
  });
}

// ===== Event klik menu =====
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.target;

    // 1. menu aktif berubah warna
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // 2. bersihkan efek sebelumnya
    resetEfek();

    // 3. efek sesuai menu
    // semua menu selain Home menampilkan "Muthiyya / Kelas SI-3C"
    if (target !== "home") {
      namaMahasiswa.textContent = TEKS.namaKlik;
      namaKelas.textContent = TEKS.kelasKlik;
    }

    if (target === "home") {
      // hanya Home yang mengembalikan teks ke awal
      namaMahasiswa.textContent = TEKS.namaAwal;
      namaKelas.textContent = TEKS.kelasAwal;
    } else if (target === "mahasiswa") {
      // Muthiyya + Kelas SI-3C, tapi hanya nama yang berdebar
      namaMahasiswa.textContent = TEKS.namaKlik;
      namaKelas.textContent = TEKS.kelasKlik;
      debarTeks(namaMahasiswa);
    } else if (target === "kelas") {
      // Muthiyya + Kelas SI-3C, tapi hanya "Kelas SI-3C" yang berdebar
      namaMahasiswa.textContent = TEKS.namaKlik;
      namaKelas.textContent = TEKS.kelasKlik;
      debarTeks(namaKelas);
    } else if (kartuTarget[target]) {
      sorotKartu(kartuTarget[target]);           // kartu ikut berdebar
    }
  });
});