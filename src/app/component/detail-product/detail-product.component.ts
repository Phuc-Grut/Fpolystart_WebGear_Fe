import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  @Input() product: any;  // Thông tin chi tiết sản phẩm
  @Input() showModal: boolean = false; // Kiểm tra modal có hiển thị không
  @Output() close = new EventEmitter<void>(); // Đóng modal
  baseUrl: string = 'https://lacdau.com';

  closeModal() {
    this.close.emit();
  }
  showMoreDetails = false;
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  
  // Hàm thay đổi ảnh chính khi click vào ảnh bổ sung
  changeMainImage(imageUrl: string) {
    const mainImageElement = document.querySelector('.main-image') as HTMLImageElement;
    mainImageElement.src = imageUrl;
  }

  // Hàm xử lý khi nhấn nút "Mua ngay"
  buyNow() {
    // Logic xử lý việc mua ngay
    alert('Bạn đã chọn Mua ngay!');
    // Có thể chuyển hướng đến trang thanh toán hoặc làm gì đó
  }

  // Hàm xử lý khi nhấn nút "Thêm vào giỏ hàng"
  addToCart() {
    // Logic xử lý việc thêm sản phẩm vào giỏ hàng
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
    // Có thể gọi API hoặc lưu vào giỏ hàng trong session/local storage
  }
}