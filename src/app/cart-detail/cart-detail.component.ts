import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartDeatail, CartService } from '../cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent {
  @Input() product: any;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  baseUrl: string = 'https://lacdau.com';
  showMoreDetails: boolean = false;
  currentProduct: any;  // Để lưu thông tin chi tiết của sản phẩm

  constructor(private cartService: CartService, private productService: ProductService) {}

  // Khi modal mở, tải chi tiết sản phẩm
  ngOnChanges() {
    if (this.product && this.product.id) {
      this.loadProductDetails(this.product.id);
    }
  }

  // Lấy chi tiết sản phẩm theo ID
  loadProductDetails(producetId: number) {
    this.productService.getProductById(producetId).subscribe(
      (response: any) => {
        this.currentProduct = response;
      },
      (error) => {
        console.error('Error loading product details', error);
      }
    );
  }

  // Hiện/Ẩn chi tiết
  toggleDetails(show: boolean) {
    this.showMoreDetails = show;
  }

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}


