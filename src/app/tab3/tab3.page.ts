import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class Tab3Page implements OnInit {
  peminjamanList: any[] = [];
  apiUrl: string = 'https://erinperpus.aplikasi.blog/action.php';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPeminjaman();
  }

  // Memuat data dari server
  async loadPeminjaman() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aksi: 'get_peminjaman' })
      });

      const result = await response.json();

      if (result.success) {
        this.peminjamanList = result.result.map((item: any) => ({
          id: item.id,
          nama: item.nama,
          email: item.email,
          telepon: item.telepon,
          kategori: item.kategori,
          judul: item.judul,
          tanggal_pinjam: item.tanggal_pinjam,
          tanggal_kembali: item.tanggal_kembali,
          gambar: item.gambar,
        }));
      } else {
        this.showToast('❌ Gagal mengambil data peminjaman.', 'danger');
      }
    } catch (error) {
      this.showToast('⚠️ Koneksi ke server gagal.', 'danger');
    }
  }

  // Konfirmasi hapus
  async hapusData(id: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah kamu yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => this.deletePeminjaman(id)
        }
      ]
    });

    await alert.present();
  }

  // Hapus data dari server
  async deletePeminjaman(id: number) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aksi: 'delete_peminjaman', id })
      });

      const result = await response.json();

      if (result.success) {
        this.showToast('✅ Data berhasil dihapus.', 'success');
        this.loadPeminjaman(); // refresh data
      } else {
        this.showToast('❌ Gagal menghapus data.', 'danger');
      }
    } catch (error) {
      this.showToast('⚠️ Koneksi ke server gagal.', 'danger');
    }
  }

  // Tampilkan toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
