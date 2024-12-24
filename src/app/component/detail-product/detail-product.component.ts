import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  @Input() product: any;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
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