const appData = {
    kereta: [
        { name: "Eksekutif", harga: 500000 },
        { name: "Bisnis", harga: 300000 },
        { name: "Ekonomi", harga: 150000 }
    ],
    penumpang: [],
    transaksi: [],
    jadwal: [
        { kereta: "Argo Bromo", jam: "08:00", stasiun: "Jakarta - Surabaya", tanggal: "2024-12-31" },
        { kereta: "Taksaka", jam: "09:30", stasiun: "Jakarta - Yogyakarta", tanggal: "2024-12-30" },
        { kereta: "Sancaka", jam: "15:00", stasiun: "Surabaya - Jakarta", tanggal: "2024-12-30" },
        { kereta: "Parahyangan", jam: "10:30", stasiun: "Bandung - Jakarta", tanggal: "2024-12-29" },
        { kereta: "Gaya Baru Malam Selatan", jam: "22:00", stasiun: "Jakarta - Malang", tanggal: "2024-12-29" },
        { kereta: "Majapahit", jam: "07:00", stasiun: "Surabaya - Jakarta", tanggal: "2024-12-28" },
    ]
};

// Fungsi untuk menampilkan halaman yang sesuai
function loadPage(page) {
    const mainContent = document.getElementById("mainContent");
    switch (page) {
        case "dashboard":
            renderBeranda(mainContent);
            break;
        case "booking":
            renderBookingForm(mainContent);
            break;
        case "transaksi":
            renderRiwayatTransaksi(mainContent);
            break;
        case "laporan":
            renderLaporan(mainContent);
            break;
        case "jadwal":
            renderJadwal(mainContent);
            break;
        default:
            mainContent.innerHTML = `<h2>Halaman tidak ditemukan.</h2>`;
    }
}

// Menampilkan halaman Beranda
function renderBeranda(container) {
    container.innerHTML = `
        <h2>Selamat Datang di TiketKereta.com</h2>
        <p>Pilih menu di atas untuk memulai pemesanan tiket atau melihat jadwal kereta.</p>
    `;
}

// Menampilkan form pemesanan tiket
function renderBookingForm(container) {
    container.innerHTML = `
        <h2>Pemesanan Tiket</h2>
        <form id="bookingForm">
            <div class="form-group">
                <label for="jadwal">Pilih Jadwal Kereta:</label>
                <select id="jadwal" onchange="updateDetails()" required>
                    ${appData.jadwal.map(jadwal => `
                        <option value="${jadwal.kereta}" data-jam="${jadwal.jam}" data-stasiun="${jadwal.stasiun}" data-tanggal="${jadwal.tanggal}">
                            ${jadwal.kereta} - ${jadwal.stasiun} (${jadwal.tanggal}, ${jadwal.jam})
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="kereta">Pilih Jenis Kereta:</label>
                <select id="kereta" onchange="updateDetails()" required>
                    ${appData.kereta.map(kereta => `
                        <option value="${kereta.name}" data-harga="${kereta.harga}">
                            ${kereta.name}
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="nama">Nama Penumpang:</label>
                <input type="text" id="nama" required>
            </div>
            <div class="form-group">
                <label for="umur">Umur:</label>
                <input type="number" id="umur" required>
            </div>
            <div class="form-group">
                <label for="jumlahTiket">Jumlah Tiket:</label>
                <input type="number" id="jumlahTiket" required>
            </div>
            <div class="form-group">
                <label for="tanggal">Tanggal Pemesanan:</label>
                <input type="date" id="tanggal" required>
            </div>
            <div class="form-group">
                <label for="hargaTiket">Harga Tiket:</label>
                <input type="text" id="hargaTiket" readonly required>
            </div>
            <button class="primary" type="button" onclick="submitBooking()">Pesan Tiket</button>
        </form>
    `;
    updateDetails();
}

// Fungsi untuk memperbarui harga dan tanggal tiket berdasarkan pilihan
function updateDetails() {
    const jadwalSelect = document.getElementById("jadwal");
    const keretaSelect = document.getElementById("kereta");
    const hargaTiketField = document.getElementById("hargaTiket");
    const tanggalField = document.getElementById("tanggal");
    const selectedJadwal = jadwalSelect.selectedOptions[0];
    const selectedKereta = keretaSelect.selectedOptions[0];

    if (selectedJadwal) {
        const jam = selectedJadwal.getAttribute("data-jam");
        const stasiun = selectedJadwal.getAttribute("data-stasiun");
        const tanggal = selectedJadwal.getAttribute("data-tanggal");
        tanggalField.value = tanggal; // Menampilkan tanggal jadwal yang dipilih
    }

    if (selectedKereta) {
        const harga = selectedKereta.getAttribute("data-harga");
        if (harga && !isNaN(harga)) {
            hargaTiketField.value = `Rp ${parseInt(harga).toLocaleString()}`;
        } else {
            hargaTiketField.value = "Harga tidak valid";
        }
    }
}

// Fungsi untuk memesan tiket
function submitBooking() {
    const kereta = document.getElementById("kereta").value;
    const jadwal = document.getElementById("jadwal").value;
    const nama = document.getElementById("nama").value;
    const umur = document.getElementById("umur").value;
    const jumlahTiket = parseInt(document.getElementById("jumlahTiket").value, 10);
    const tanggal = document.getElementById("tanggal").value;

    if (kereta && jadwal && nama && umur && jumlahTiket > 0 && tanggal) {
        appData.transaksi.push({ kereta, jadwal, nama, umur, jumlahTiket, tanggal });
        alert("Tiket berhasil dipesan!");
        loadPage("transaksi");
    } else {
        alert("Mohon lengkapi semua data.");
    }
}

// Fungsi untuk menampilkan riwayat transaksi
function renderRiwayatTransaksi(container) {
    const transaksiList = appData.transaksi.map(
        (t, index) => `
            <li>
                Transaksi ${index + 1}: ${t.nama} (${t.jumlahTiket} tiket) - ${t.kereta} pada ${t.tanggal}
            </li>
        `
    ).join("");
    container.innerHTML = `
        <h2>Riwayat Transaksi</h2>
        <ul>${transaksiList || "Belum ada transaksi."}</ul>
    `;
}

// Menampilkan laporan
function renderLaporan(container) {
    const totalTransaksi = appData.transaksi.length;
    const totalTiket = appData.transaksi.reduce((sum, t) => sum + t.jumlahTiket, 0);
    
    const laporanKereta = appData.kereta.map(kereta => {
        const keretaTransaksi = appData.transaksi.filter(t => t.kereta === kereta.name);
        const totalKereta = keretaTransaksi.reduce((sum, t) => sum + t.jumlahTiket, 0);
        const totalPendapatan = totalKereta * kereta.harga;
        return {
            kereta: kereta.name,
            tiketTerjual: totalKereta,
            pendapatan: totalPendapatan,
        };
    });

    container.innerHTML = `
        <h2>Laporan</h2>
        <p><strong>Total Transaksi:</strong> ${totalTransaksi}</p>
        <p><strong>Total Tiket Terjual:</strong> ${totalTiket}</p>
        <h3>Rincian per Kereta:</h3>
        <table>
            <thead>
                <tr>
                    <th>Kereta</th>
                    <th>Tiket Terjual</th>
                    <th>Pendapatan (Rp)</th>
                </tr>
            </thead>
            <tbody>
                ${laporanKereta.map(data => `
                    <tr>
                        <td>${data.kereta}</td>
                        <td>${data.tiketTerjual}</td>
                        <td>${data.pendapatan.toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Menampilkan jadwal kereta
function renderJadwal(container) {
    container.innerHTML = `
        <h2>Jadwal Kereta</h2>
        <table>
            <thead>
                <tr>
                    <th>Kereta</th>
                    <th>Stasiun</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                </tr>
            </thead>
            <tbody>
                ${appData.jadwal.map(jadwal => `
                    <tr>
                        <td>${jadwal.kereta}</td>
                        <td>${jadwal.stasiun}</td>
                        <td>${jadwal.tanggal}</td>
                        <td>${jadwal.jam}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
