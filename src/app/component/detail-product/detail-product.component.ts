import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent  {
  @Input() product: any;  // Thông tin chi tiết sản phẩm
  @Input() showModal: boolean = false; // Kiểm tra modal có hiển thị không
  @Output() close = new EventEmitter<void>(); // Đóng modal

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal(); // Đóng modal khi click vào overlay
    }
  }
}