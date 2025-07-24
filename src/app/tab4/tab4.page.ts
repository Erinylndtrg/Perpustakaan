import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab4Page implements OnInit {

  bukuList: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  selectedBook: any = null;

  constructor() { }

  ngOnInit() {
    this.loadDaftarBuku();
  }

  loadDaftarBuku() {
    this.bukuList = [
      { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', foto: 'assets/img/laskar.jpg'},
      { judul: 'Dilan 1990', penulis: 'Pidi Baiq', foto: 'assets/img/dilan.jpg'},
      { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', foto: 'assets/img/ayatcinta.jpg'},
      { judul: '5 CM', penulis: 'Donny Dhirgantoro', foto: 'assets/img/5 cm.jpg'},
      { judul: 'Bumi', penulis: 'Tere Liye', foto: 'assets/img/bumi.jpg'},
      { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', foto: 'assets/img/negeri 5.jpg'},
      { judul: 'Harry Potter', penulis: 'J.K. Rowling', foto: 'assets/img/harry.jpg'},
      { judul: 'The Hobbit', penulis: 'J.R.R. Tolkien', foto: 'assets/img/the hobbit.jpg'}, 
      { judul: 'Sherlock Holmes', penulis: 'Arthur Conan Doyle', foto: 'assets/img/sherlock.jpg'},
      { judul: 'Atomic Habits', penulis: 'James Clear', foto: 'assets/img/atomic.jpg'},
      { judul: 'Filosofi Teras', penulis: 'Henry Manampiring' , foto: 'assets/img/filosofi.png'},
      { judul: 'Rich Dad Poor Dad', penulis: 'Robert Kiyosaki', foto: 'assets/img/rich.jpg'},
      { judul: 'Think and Grow Rich', penulis: 'Napoleon Hill' , foto: 'assets/img/think.png'},
      { judul: 'The Alchemist', penulis: 'Paulo Coelho' , foto: 'assets/img/the alc.jpg'},
      { judul: 'Hujan', penulis: 'Tere Liye' , foto: 'assets/img/hujan.jpg'},
      { judul: 'Sunset Bersama Rosie', penulis: 'Tere Liye', foto: 'assets/img/sunset.jpg'},
      { judul: 'Madilog', penulis: 'Tan Malaka' , foto: 'assets/img/madilog.jpg'},
      { judul: 'The Secret', penulis: 'Rhonda Byrne' , foto: 'assets/img/secret.jpg'},
      { judul: 'Digital Minimalism', penulis: 'Cal Newport' , foto: 'assets/img/digital.jpg'},
      { judul: 'Deep Work', penulis: 'Cal Newport' , foto: 'assets/img/deep.jpg'},
      { judul: 'A Man Called Ove', penulis: 'Fredrik Backman' },
      { judul: 'Anxious People', penulis: 'Fredrik Backman' },
      { judul: 'Ikigai', penulis: 'Hector Garcia' },
      { judul: 'Origin', penulis: 'Dan Brown' },
      { judul: 'Inferno', penulis: 'Dan Brown' , foto: 'assets/img/inferno.jpg'},
      { judul: 'Angels and Demons', penulis: 'Dan Brown' , foto: 'assets/img/angels.jpg'},
      { judul: 'Da Vinci Code', penulis: 'Dan Brown' , foto: 'assets/img/vinci.jpg'},
      { judul: 'Sherlock Holmes: The Sign of Four', penulis: 'Arthur Conan Doyle' , foto: 'assets/img/the sign.jpg'},
      { judul: 'Sherlock Holmes: The Hound of Baskervilles', penulis: 'Arthur Conan Doyle' },
      { judul: '1984', penulis: 'George Orwell' },
      { judul: 'Animal Farm', penulis: 'George Orwell' },
      { judul: 'Brave New World', penulis: 'Aldous Huxley' },
      { judul: 'To Kill a Mockingbird', penulis: 'Harper Lee' },
      { judul: 'The Great Gatsby', penulis: 'F. Scott Fitzgerald' },
      { judul: 'Pride and Prejudice', penulis: 'Jane Austen' },
      { judul: 'Wuthering Heights', penulis: 'Emily Brontë' },
      { judul: 'Crime and Punishment', penulis: 'Fyodor Dostoevsky' },
      { judul: 'The Brothers Karamazov', penulis: 'Fyodor Dostoevsky' },
      { judul: 'Sapiens', penulis: 'Yuval Noah Harari' },
      { judul: 'Homo Deus', penulis: 'Yuval Noah Harari' },
      { judul: '21 Lessons for the 21st Century', penulis: 'Yuval Noah Harari' },
      { judul: 'The Psychology of Money', penulis: 'Morgan Housel' },
      { judul: 'Educated', penulis: 'Tara Westover' },
      { judul: 'Becoming', penulis: 'Michelle Obama' },
      { judul: 'Steve Jobs', penulis: 'Walter Isaacson' },
      { judul: 'Elon Musk', penulis: 'Ashlee Vance' },
      { judul: 'Zero to One', penulis: 'Peter Thiel' },
      { judul: 'Start With Why', penulis: 'Simon Sinek' },
      // Tambah jika ingin sampai 50 buku
    ];
    this.filteredBooks = this.bukuList;
  }

  filterBooks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.bukuList.filter(buku =>
      buku.judul.toLowerCase().includes(term) || buku.penulis.toLowerCase().includes(term)
    );
    // Reset detail book jika filter berubah
    this.selectedBook = null;
  }

  selectBook(buku: any) {
    this.selectedBook = buku;
  }

  closeDetail() {
    this.selectedBook = null;
  }
}
