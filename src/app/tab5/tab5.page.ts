import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // untuk ngModel

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab5Page {
  appVersion = '1.0.0';
  developer = 'Nama Developer / Tim Perpustakaan';
  contactEmail = 'contact@perpustakaan.com';

  // 🔄 Preferensi tampilan
  darkMode = false;

  // 💬 Kritik & Saran
  feedbackText = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  // 🚀 Saat halaman dimuat
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  // 🌙 Toggle Tema (Gelap/Terang)
  toggleTheme() {
    const selectedTheme = this.darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', selectedTheme);
    this.applyTheme();
  }

  // ✅ Terapkan tema sesuai pilihan
  applyTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  // ❓ Panduan Penggunaan
  async bukaPanduan() {
    const alert = await this.alertCtrl.create({
      header: 'Panduan Penggunaan',
      message: `
        <div style="text-align: left;">
          <ul>
            <li>📚 Cari buku dan lihat detailnya di halaman utama.</li>
            <li>📝 Tambahkan peminjaman melalui menu <strong>Pinjam</strong>.</li>
            <li>📄 Kelola data di <strong>Daftar Peminjam</strong>.</li>
            <li>🧑‍💻 Ganti tema & kirim saran di menu <strong>Tentang Aplikasi</strong>.</li>
          </ul>
        </div>`,
      buttons: ['Tutup']
    });

    await alert.present();
  }

  // 💬 Kirim Kritik & Saran
  async kirimFeedback() {
    const isi = this.feedbackText.trim();
    if (!isi) {
      this.showToast('Mohon isi feedback terlebih dahulu.');
      return;
    }

    console.log('Feedback dikirim:', isi); // Atau kirim ke server
    await this.showToast('Terima kasih atas masukannya!');
    this.feedbackText = ''; // Reset form
  }

  // 🔔 Tampilkan toast
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  // 🚪 Logout
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Yakin ingin keluar dari aplikasi?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Keluar',
          handler: () => {
            localStorage.removeItem('user_login');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
