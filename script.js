// === SISTEM ANTI-INSPECT ELEMENT DASAR ===
document.addEventListener('contextmenu', event => event.preventDefault()); 

document.onkeydown = function(e) {
    if (e.key === "F12" || e.keyCode === 123) { return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) { return false; }
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) { return false; }
};
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. KONFIGURASI & KONSTANTA
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1499607345662263426/ub8BLgxS1Vos7CLPxNebpMvYfDPvyud0OxieBmdoQc_3BRdxfCgAskEq1L0dzhBGQdM_";

    const firebaseConfig = {
        apiKey: "AIzaSyDDi89EVfP29hWW2a5X7AOPTOxDOtA_fMo",
        authDomain: "lisensi-indopride.firebaseapp.com",
        databaseURL: "https://lisensi-indopride-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "lisensi-indopride",
        storageBucket: "lisensi-indopride.firebasestorage.app",
        messagingSenderId: "45944864976",
        appId: "1:45944864976:web:84cd905faac0f4a5a81ed5"
    };

    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const database = firebase.database();
    const auth = firebase.auth();

    // 2. DATA PERSONIL & IDENTITY SYSTEM (Semua email menggunakan huruf kecil)
    const officerDatabase = {
        "francis@icarus.com": { callsign: "MAVERICK 01", nama: "Sir Francis Drake", status: "PIMPINAN ORDO ICARUS" },
        "nathan@icarus.com": { callsign: "ORION 01", nama: "Nathan G Kamek", status: "PIMPINAN ORDO ICARUS" },
        "leonard@icarus.com": { callsign: "ORION 02", nama: "Leonard Willy", status: "PIMPINAN ORDO ICARUS" },
        "grecia@icarus.com": { callsign: "ORION 03", nama: "Grecia F Nakagawa", status: "PIMPINAN ORDO ICARUS" },
        "natanael@icarus.com": { callsign: "VP - 01", nama: "Natanael Pardede", status: "ANGGOTA ORDO ICARUS" },
        "senna@icarus.com": { callsign: "VP - 02", nama: "Senna Aduivat", status: "ANGGOTA ORDO ICARUS" },
        "glenn@icarus.com": { callsign: "VP - 03", nama: "Glenn Jacob", status: "ANGGOTA ORDO ICARUS" },
        "santiago@icarus.com": { callsign: "VP - 04", nama: "Santiago Reeves", status: "ANGGOTA ORDO ICARUS" },
        "kael@icarus.com": { callsign: "VP - 05", nama: "Kael Kaizer", status: "ANGGOTA ORDO ICARUS" },
        "christopher@icarus.com": { callsign: "VP - 06", nama: "Christopher F Lee", status: "ANGGOTA ORDO ICARUS" },
        "chrystalea@icarus.com": { callsign: "VP - 07", nama: "Chrystalea F Lee", status: "ANGGOTA ORDO ICARUS" },
        "diva@icarus.com": { callsign: "VP - 08", nama: "Diva Artha", status: "ANGGOTA ORDO ICARUS" },
        "bayu@icarus.com": { callsign: "VP - 09", nama: "Bayu S Sidharta", status: "ANGGOTA ORDO ICARUS" },
        "abyan@icarus.com": { callsign: "VP - 10", nama: "Abyan Kurniawan", status: "ANGGOTA ORDO ICARUS" },
        "moody@icarus.com": { callsign: "VP - 11", nama: "Moody O Conner", status: "ANGGOTA ORDO ICARUS" },
        "voidx@icarus.com": { callsign: "VP - 12", nama: "L Voidx", status: "ANGGOTA ORDO ICARUS" },
        "tobi@icarus.com": { callsign: "VP - 13", nama: "Tobi Barber", status: "ANGGOTA ORDO ICARUS" },
        "karlo@icarus.com": { callsign: "VP - 14", nama: "Karlo A Lee", status: "ANGGOTA ORDO ICARUS" },
        "michael@icarus.com": { callsign: "VP - 15", nama: "Michael Larosso", status: "ANGGOTA ORDO ICARUS" },
        "natsu@icarus.com": { callsign: "VP - 16", nama: "Natsu Ky Sukemprot", status: "ANGGOTA ORDO ICARUS" },
        "mavis@pegasus.com": { callsign: "GA - 01", nama: "Mavis Aprilia", status: "PIMPINAN UNIT PEGASUS" },
        "arfay@pegasus.com": { callsign: "PG - 01", nama: "Arfay Abinawa", status: "PIMPINAN UNIT PEGASUS" },
        "avent@pegasus.com": { callsign: "PG - 02", nama: "Avent Antares", status: "PIMPINAN UNIT PEGASUS" },
        "kazumna@pegasus.com": { callsign: "PG - 03", nama: "Kazumna", status: "PIMPINAN UNIT PEGASUS" },
        "mereleon@pegasus.com": { callsign: "PG - 04", nama: "Mereleon Silva", status: "PIMPINAN UNIT PEGASUS" },
        "nevan@pegasus.com": { callsign: "PG - 05", nama: "Nevan C Percival", status: "PIMPINAN UNIT PEGASUS" },
        "alexandro@pegasus.com": { callsign: "PG - 06", nama: "Alexandro D Lombardi", status: "PIMPINAN UNIT PEGASUS" },
        "gopal@pegasus.com": { callsign: "PG - 07", nama: "Gopal S Maynard", status: "ANGGOTA UNIT PEGASUS" },
        "hexy@pegasus.com": { callsign: "PG - 08", nama: "Hexy Xander", status: "ANGGOTA UNIT PEGASUS" },
        "rafale@pegasus.com": { callsign: "PG - 09", nama: "Rafale Osmund", status: "ANGGOTA UNIT PEGASUS" },
        "baby@pegasus.com": { callsign: "PG - 10", nama: "Baby Joo", status: "ANGGOTA UNIT PEGASUS" },
        "alvaerico@pegasus.com": { callsign: "PG - 11", nama: "Alverico M. Allarick", status: "ANGGOTA UNIT PEGASUS" },
        "adelino@pegasus.com": { callsign: "PG - 12", nama: "Adelio B Tjendana", status: "ANGGOTA UNIT PEGASUS" },
        "bailey@pegasus.com": { callsign: "PG - 13", nama: "Bailey C. Hayashi", status: "ANGGOTA UNIT PEGASUS" },
        "lenzy@pegasus.com": { callsign: "PG - 14", nama: "Lenzy W Rayel", status: "ANGGOTA UNIT PEGASUS" },
        "arion@pegasus.com": { callsign: "PG - 15", nama: "Arion Andara", status: "ANGGOTA UNIT PEGASUS" },
        "nemo@pegasus.com": { callsign: "PG - 16", nama: "Nemo Alviano", status: "ANGGOTA UNIT PEGASUS" },
        "dobleh@pegasus.com": { callsign: "PG - 17", nama: "Dobleh Kobleh", status: "ANGGOTA UNIT PEGASUS" }
    };

    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    const loginError = document.getElementById('loginError');

    function applyOfficerIdentity(email) {
        const officer = officerDatabase[email.toLowerCase()];
        if (officer) {
            document.getElementById('inputOfficer').value = officer.callsign;
            document.getElementById('displayOfficer').innerText = officer.callsign;
            document.getElementById('autoSignature').innerText = officer.nama; 
            document.getElementById('displayUnit').innerText = officer.status; // Jabatan langsung ke display
            localStorage.setItem('saved_inputOfficer', officer.callsign);
        }
    }

    // 3. LOGIKA AUTH & LOGIN
    document.getElementById('btnLogin').onclick = () => {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        document.getElementById('btnLogin').innerText = "MEMERIKSA...";

        auth.signInWithEmailAndPassword(email, pass)
            .then(() => {
                applyOfficerIdentity(email);
                loginScreen.style.display = "none";
                mainApp.style.display = "flex";
            })
            .catch(() => {
                document.getElementById('btnLogin').innerText = "MASUK";
                loginError.innerText = "Akses Ditolak: Periksa email/password!";
                loginError.style.display = "block";
            });
    };

    auth.onAuthStateChanged((user) => {
        if (user) {
            applyOfficerIdentity(user.email);
            loginScreen.style.display = "none";
            mainApp.style.display = "flex";
        } else {
            loginScreen.style.display = "flex";
            mainApp.style.display = "none";
        }
    });

    document.getElementById('btnLogout').onclick = () => {
        auth.signOut().then(() => location.reload());
    };

    // 4. SISTEM REGISTRASI & DATABASE
    let currentLastRegNum = 1000; 
    const inputReg = document.getElementById('inputRegistrasi');
    const displayReg = document.getElementById('displayRegistrasi');
    const inputMode = document.getElementById('inputMode');
    const btnCariData = document.getElementById('btnCariData');

    database.ref('last_pl_number').on('value', (snapshot) => {
        currentLastRegNum = snapshot.exists() ? snapshot.val() : 1000;
        if (inputMode.value === "BARU") {
            const nextReg = `PL-${currentLastRegNum + 1}`;
            inputReg.value = nextReg;
            displayReg.innerText = nextReg;
        }
    });

    inputMode.addEventListener('change', () => {
        if (inputMode.value === "BARU") {
            const nextReg = `PL-${currentLastRegNum + 1}`;
            inputReg.value = nextReg;
            displayReg.innerText = nextReg;
            if(btnCariData) btnCariData.style.display = "none";
        } else {
            inputReg.value = "";
            displayReg.innerText = "-";
            if(btnCariData) btnCariData.style.display = "block";
        }
    });

    if(btnCariData) {
        btnCariData.onclick = () => {
            const searchReg = inputReg.value.trim().toUpperCase();
            database.ref('licenses/' + searchReg).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    document.getElementById('inputNama').value = data.nama || "";
                    document.getElementById('inputGender').value = data.gender || "";
                    document.getElementById('inputPekerjaan').value = data.pekerjaan || "";
                    document.getElementById('inputDob').value = data.dob || "";
                    document.getElementById('inputImo').value = data.imo || "";
                    document.getElementById('inputJabatan').value = data.jabatan || "";
                    document.getElementById('inputNoKapal').value = data.noKapal || "";
                    document.getElementById('inputNoTelp').value = data.noTelp || "";

                    const triggers = ['inputNama', 'inputGender', 'inputPekerjaan', 'inputDob', 'inputImo', 'inputJabatan', 'inputNoKapal', 'inputNoTelp'];
                    triggers.forEach(id => document.getElementById(id).dispatchEvent(new Event('input')));
                    alert("Data ditemukan!");
                } else { alert("Data tidak ada."); }
            });
        };
    }

    // 5. INPUT BINDING & UI LOGIC
    function bindInput(inputId, displayId, prefix = "") {
        const input = document.getElementById(inputId);
        const display = document.getElementById(displayId);
        if (input && display) {
            const updateUI = () => {
                display.innerText = prefix + (input.value.toUpperCase() || "-");
            };
            input.addEventListener('input', updateUI);
            input.addEventListener('change', updateUI); 
            if(input.value) { updateUI(); }
        }
    }

    bindInput('inputRegistrasi', 'displayRegistrasi', '');
    bindInput('inputNama', 'displayNama', ': ');
    bindInput('inputGender', 'displayGender', ': ');
    bindInput('inputPekerjaan', 'displayPekerjaan', ': ');
    bindInput('inputJabatan', 'displayJabatan', ': ');
    bindInput('inputImo', 'displayImo', ': ');
    bindInput('inputNoKapal', 'displayNoKapal', ': ');
    bindInput('inputOfficer', 'displayOfficer', '');

    const inputPekerjaanDynamic = document.getElementById('inputPekerjaan');
    const displayPillsTitle = document.getElementById('displayPillsTitle');
    inputPekerjaanDynamic.addEventListener('input', () => {
        const val = inputPekerjaanDynamic.value.toUpperCase();
        const listPerairan = ["MEDIC", "KABINET", "POLISI", "CIVILIAN", "SHERIFF", "PEMKOT"];
        const isPerairan = listPerairan.some(k => val.includes(k));
        if (isPerairan) {
            displayPillsTitle.innerText = "LISENSI PERAIRAN SIPIL";
            displayPillsTitle.style.background = "linear-gradient(to right, #f7851a, #faa923)";
            displayPillsTitle.style.color = "#0f172a";
        } else {
            displayPillsTitle.innerText = "LISENSI PELAUT SIPIL";
            displayPillsTitle.style.background = "white";
            displayPillsTitle.style.color = "#0f172a";
        }
    });

    const inputExp = document.getElementById('inputExpired');
    const displayExpText = document.getElementById('displayExpiredText'); 
    function setExpiration(months) {
        let d = new Date(); d.setMonth(d.getMonth() + months);
        const mNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
        let str = `${String(d.getDate()).padStart(2, '0')} ${mNames[d.getMonth()]} ${d.getFullYear()}`;
        inputExp.value = str; displayExpText.innerHTML = str.toUpperCase();
    }
    document.getElementById('btnPlus2').onclick = () => setExpiration(2);
    document.getElementById('btnPlus3').onclick = () => setExpiration(3);

    let today = new Date();
    const mNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    document.getElementById('displayIssueDate').innerText = `${String(today.getDate()).padStart(2, '0')} ${mNames[today.getMonth()]} ${today.getFullYear()}`;

    // 6. CROPPER LOGIC
    let cropper;
    const modal = document.getElementById('cropperModal');
    const imgCrop = document.getElementById('imageToCrop');
    const inFoto = document.getElementById('inputFoto');
    const dispFoto = document.getElementById('displayFoto');

    inFoto.onchange = (e) => {
        if (!e.target.files.length) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            imgCrop.src = ev.target.result;
            modal.style.display = 'flex';
            if (cropper) cropper.destroy();
            cropper = new Cropper(imgCrop, { aspectRatio: 170 / 220, viewMode: 1 });
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    document.getElementById('btnApplyCrop').onclick = () => {
        const canvas = cropper.getCroppedCanvas({ width: 340, height: 440 });
        dispFoto.src = canvas.toDataURL('image/jpeg', 1.0); 
        modal.style.display = 'none';
        cropper.destroy();
    };

    document.getElementById('btnCancelCrop').onclick = () => {
        modal.style.display = 'none';
        if (cropper) cropper.destroy();
    };

    // 7. GENERATE & SEND SYSTEM 
    document.getElementById('btnDownload').onclick = function() {
        
        // VALIDASI KEAMANAN DATA KOSONG
        const inputImoVal = document.getElementById('inputImo').value.trim();
        const inputNoKapalVal = document.getElementById('inputNoKapal').value.trim();
        const inputExpiredVal = document.getElementById('inputExpired').value.trim(); 

        if (inputImoVal === "") {
            alert("PERINGATAN: Kolom 'IMO RATING' belum diisi! Silakan isi terlebih dahulu sebelum generate.");
            document.getElementById('inputImo').focus(); return; 
        }
        if (inputNoKapalVal === "") {
            alert("PERINGATAN: Kolom 'NOMOR KAPAL' belum diisi! Silakan isi terlebih dahulu sebelum generate.");
            document.getElementById('inputNoKapal').focus(); return; 
        }
        if (inputExpiredVal === "") {
            alert("PERINGATAN: Kolom 'BERLAKU HINGGA' belum diisi! Silakan isi tanggal atau klik tombol +2/+3 BULAN terlebih dahulu.");
            document.getElementById('inputExpired').focus(); return; 
        }

        const btn = this;
        const kartu = document.getElementById('kartuLicensi');
        
        // KUNCI DATA SAAT INI
        const currentRegNum = document.getElementById('displayRegistrasi').innerText;
        const currentNama = document.getElementById('inputNama').value.toUpperCase();
        const currentOfficer = document.getElementById('inputOfficer').value;
        const currentExp = document.getElementById('inputExpired').value;
        const currentIssueDate = document.getElementById('displayIssueDate').innerText;
        const noTelp = document.getElementById('inputNoTelp').value;
        const tglLahir = document.getElementById('inputDob').value;
        const modePengajuanVal = document.getElementById('inputMode').value;
        const afiliasi = document.getElementById('displayUnit').innerText; // Diambil otomatis dari display

        // LOGIKA JUDUL & WARNA DISCORD DINAMIS
        let judulDiscord = "🚢 LISENSI TERBIT - " + currentRegNum;
        let warnaDiscord = 3066993; // Biru
        if (modePengajuanVal === "PERPANJANG") {
            judulDiscord = "🚢 LISENSI PERPANJANGAN TERBIT - " + currentRegNum;
            warnaDiscord = 15105570; // Oranye
        }

        btn.innerText = "SINKRONISASI FONT..."; 
        btn.disabled = true;
        document.getElementById('statusMsg').style.display = "block";

        document.fonts.ready.then(() => {
            btn.innerText = "RENDERING GAMBAR...";
            
            setTimeout(() => {
                htmlToImage.toPng(kartu, { 
                    pixelRatio: 2, 
                    backgroundColor: '#000000',
                    cacheBust: true,
                    skipFonts: false, // Memastikan font Great Vibes ikut terekam
                    style: { 'transform-origin': 'top left' }
                })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `LISENSI_${currentRegNum}.png`;
                    link.href = dataUrl; 
                    link.click();

                    return fetch(dataUrl).then(res => res.blob()).then(blob => {
                        const formData = new FormData();
                        formData.append("payload_json", JSON.stringify({
                            embeds: [{
                                title: judulDiscord, 
                                color: warnaDiscord, 
                                fields: [
                                    { name: "👤 Nama Lengkap", value: currentNama, inline: true },
                                    { name: "📞 No. Telepon", value: noTelp || "-", inline: true },
                                    { name: "🎂 Tanggal Lahir", value: tglLahir || "-", inline: true },
                                    { name: "🏢 Afiliasi", value: afiliasi, inline: false },
                                    { name: "📅 Diterbitkan", value: currentIssueDate, inline: true },
                                    { name: "⏳ Berlaku Hingga", value: currentExp, inline: true },
                                    { name: "👮 Petugas Pelaksana", value: currentOfficer, inline: true }
                                ],
                                footer: { text: "Icarus x Pegasus License System" },
                                timestamp: new Date().toISOString()
                            }]
                        }));
                        formData.append("file", blob, `${currentRegNum}.png`);
                        return fetch(DISCORD_WEBHOOK_URL, { method: "POST", body: formData });
                    });
                })
                .then(() => {
                    // Menyimpan semua log (Termasuk ID petugas) ke Firebase
                    database.ref('licenses/' + currentRegNum).set({
                        nama: currentNama,
                        gender: document.getElementById('inputGender').value,
                        pekerjaan: document.getElementById('inputPekerjaan').value,
                        dob: tglLahir,
                        imo: inputImoVal, 
                        jabatan: document.getElementById('inputJabatan').value,
                        noKapal: inputNoKapalVal, 
                        noTelp: noTelp,
                        afiliasi: afiliasi,
                        expired: currentExp,
                        issueDate: currentIssueDate,
                        petugas: currentOfficer 
                    });

                    if (currentRegNum.startsWith("PL-")) {
                        const num = parseInt(currentRegNum.replace("PL-", ""));
                        if (num > currentLastRegNum) database.ref('last_pl_number').set(num);
                    }

                    alert(`Berhasil! Lisensi ${currentRegNum} telah diterbitkan.`); 
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    alert("Terjadi kesalahan rendering. Harap coba lagi.");
                    btn.innerText = "GENERATE & KIRIM";
                    btn.disabled = false;
                });
            }, 800); 
        });
    };
});