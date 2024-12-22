import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy{
  images: string[] = [
    'https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
  ];
  currentIndex: number = 0;
  autoplayInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.startAutoplay();
    this.groupItems();
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.updatePagination();
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  // Hàm chuyển sang ảnh tiếp theo
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Hàm quay lại ảnh trước
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Bắt đầu hiệu ứng autoplay
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Mỗi 3 giây chuyển ảnh
  }

  // Dừng hiệu ứng autoplay
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  allItems = [
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP001', status: 'Còn hàng', price: 123000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP002', status: 'Hết hàng', price: 95000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP003', status: 'Còn hàng', price: 150000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP004', status: 'Còn hàng', price: 200000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP005', status: 'Còn hàng', price: 250000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP006', status: 'Còn hàng', price: 300000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP007', status: 'Hết hàng', price: 350000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP008', status: 'Còn hàng', price: 400000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP009', status: 'Còn hàng', price: 450000 },
    { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP010', status: 'Còn hàng', price: 500000 }
  ];

  // Mỗi nhóm sẽ chứa 5 sản phẩm
  groupedItems: any[] = [];

  
  groupItems() {
    const itemsPerRow = 5;
    this.groupedItems = [];
    for (let i = 0; i < this.allItems.length; i += itemsPerRow) {
      this.groupedItems.push(this.allItems.slice(i, i + itemsPerRow));
    }
  }


  items = [
    { productCode: 'M001', status: 'Mới', price: 120000, imageUrl: 'assets/mouse1.jpg' },
    { productCode: 'M002', status: 'Mới', price: 150000, imageUrl: 'assets/mouse2.jpg' },
    { productCode: 'M003', status: 'Mới', price: 100000, imageUrl: 'assets/mouse3.jpg' },
    { productCode: 'M004', status: 'Mới', price: 200000, imageUrl: 'assets/mouse4.jpg' },
    { productCode: 'M005', status: 'Mới', price: 180000, imageUrl: 'assets/mouse5.jpg' },
    { productCode: 'M006', status: 'Mới', price: 160000, imageUrl: 'assets/mouse6.jpg' },
    { productCode: 'M007', status: 'Mới', price: 130000, imageUrl: 'assets/mouse7.jpg' },
    { productCode: 'M008', status: 'Mới', price: 170000, imageUrl: 'assets/mouse8.jpg' },
    { productCode: 'M009', status: 'Mới', price: 110000, imageUrl: 'assets/mouse9.jpg' },
    { productCode: 'M010', status: 'Mới', price: 140000, imageUrl: 'assets/mouse10.jpg' },
    { productCode: 'M011', status: 'Mới', price: 120000, imageUrl: 'assets/mouse11.jpg' },
    { productCode: 'M012', status: 'Mới', price: 160000, imageUrl: 'assets/mouse12.jpg' },
    { productCode: 'M013', status: 'Mới', price: 180000, imageUrl: 'assets/mouse13.jpg' },
    { productCode: 'M014', status: 'Mới', price: 150000, imageUrl: 'assets/mouse14.jpg' },
    { productCode: 'M015', status: 'Mới', price: 130000, imageUrl: 'assets/mouse15.jpg' },
    // thêm các sản phẩm khác vào đây
  ];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedItems: any[] = [];
  showNextPageButton: boolean = false;

  

  updatePagination() {
    // Cập nhật danh sách sản phẩm theo trang
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.chunkArray(this.items.slice(startIndex, endIndex), 5);

    // Kiểm tra xem có cần hiển thị nút "Trang tiếp theo" không
    this.showNextPageButton = this.currentPage < this.totalPages;
  }

  // Chia các sản phẩm thành từng hàng (tối đa 5 sản phẩm mỗi hàng)
  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  loadNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  isFocused = false;

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
   this.isFocused = false;
  }
}
