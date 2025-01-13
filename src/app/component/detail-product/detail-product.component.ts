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

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}