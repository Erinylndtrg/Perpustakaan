import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab1Page implements OnInit {

  constructor(
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // Navigasi ke halaman Peminjaman Buku (Tab 2)
  goToPeminjaman() {
    this.router.navigate(['/tabs/tab2']);
  }

  // Navigasi ke halaman Data Peminjaman (Tab 3)
  goToDataPeminjaman() {
    this.router.navigate(['/tabs/tab3']);
  }

  goToDaftarBuku() {
  this.router.navigate(['/tabs/tab4']);
}

 // Navigasi ke halaman Tentang Aplikasi
goToTentangAplikasi() {
  this.router.navigate(['/tabs/tab5']); // sesuaikan path routing Tab5 kamu
}

  // Tampilkan notifikasi toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
