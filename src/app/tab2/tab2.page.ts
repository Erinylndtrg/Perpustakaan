import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab2Page {
  nama: string = '';
  email: string = '';
  telepon: string = '';
  kategori: string = '';
  judul: string = '';
  gambar: any;

  tanggalPinjam: string = '';
  tanggalKembali: string = '';
  showDateModal: boolean = false;
  activeDateType: string = '';

  kategoriList: string[] = [
    'Novel',
    'Komik',
    'Ensiklopedia',
    'Majalah',
    'Buku Anak',
    'Biografi',
    'Kamus',
    'Pelajaran',
    'Teknologi',
    'Sejarah',
    'Filsafat'
  ];

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController // ✅ Tambahkan NavController
  ) {}

  bukaDatePicker(type: string) {
    this.activeDateType = type;
    const today = new Date().toISOString();

    if (type === 'pinjam' && !this.tanggalPinjam) {
      this.tanggalPinjam = today;
    } else if (type === 'kembali' && !this.tanggalKembali) {
      this.tanggalKembali = today;
    }

    this.showDateModal = true;
  }

  tanggalDipilih(event: any) {
    const selectedDate = event.detail.value;
    if (this.activeDateType === 'pinjam') {
      this.tanggalPinjam = selectedDate;
    } else if (this.activeDateType === 'kembali') {
      this.tanggalKembali = selectedDate;
    }
    this.showDateModal = false;
  }

  uploadGambar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.gambar = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async simpanData() {
    if (
      !this.nama || !this.email || !this.telepon || !this.kategori ||
      !this.judul || !this.tanggalPinjam || !this.tanggalKembali
    ) {
      this.showToast('Harap lengkapi semua form.', 'danger');
      return;
    }

    const url = 'https://erinperpus.aplikasi.blog/action.php';
    const body = {
      aksi: 'add_peminjaman',
      nama: this.nama,
      email: this.email,
      telepon: this.telepon,
      kategori: this.kategori,
      judul: this.judul,
      tanggalPinjam: this.tanggalPinjam,
      tanggalKembali: this.tanggalKembali,
      gambar: this.gambar
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (result.success) {
        this.showToast(`📚 Buku "${this.judul}" berhasil disimpan!`, 'success');
        this.resetForm();

        // ✅ Navigasi otomatis ke tab3 (daftar peminjaman)
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs/tab3');
        }, 800);

      } else {
        this.showToast(`Gagal simpan: ${result.msg}`, 'danger');
      }

    } catch (error) {
      this.showToast('Terjadi error koneksi ke server.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }

  resetForm() {
    this.nama = '';
    this.email = '';
    this.telepon = '';
    this.kategori = '';
    this.judul = '';
    this.tanggalPinjam = '';
    this.tanggalKembali = '';
    this.gambar = null;
  }

  // ✅ Tombol kembali ke dashboard/tab1
  kembaliKeDashboard() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
