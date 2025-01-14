import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartDeatail, CartService } from 'src/app/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-detail-user',
  templateUrl: './product-detail-user.component.html',
  styleUrls: ['./product-detail-user.component.css']
})
export class ProductDetailUserComponent {
// @Input() product: any;  // Thông tin chi tiết sản phẩm
//   @Input() showModal: boolean = false; // Kiểm tra modal có hiển thị không
//   @Output() close = new EventEmitter<void>(); // Đóng modal
//   baseUrl: string = 'https://lacdau.com';

//   closeModal() {
//     this.close.emit();
//   }
//   showMoreDetails = false;
//   onOverlayClick(event: MouseEvent) {
//     if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
//       this.closeModal();
//     }
//   }

  
//   // Hàm thay đổi ảnh chính khi click vào ảnh bổ sung
//   changeMainImage(imageUrl: string) {
//     const mainImageElement = document.querySelector('.main-image') as HTMLImageElement;
//     mainImageElement.src = imageUrl;
//   }

//   // Hàm xử lý khi nhấn nút "Mua ngay"
//   buyNow() {
//     // Logic xử lý việc mua ngay
//     alert('Bạn đã chọn Mua ngay!');
//     // Có thể chuyển hướng đến trang thanh toán hoặc làm gì đó
//   }

//   // Hàm xử lý khi nhấn nút "Thêm vào giỏ hàng"
//   addToCart() {
//     // Logic xử lý việc thêm sản phẩm vào giỏ hàng
//     alert('Sản phẩm đã được thêm vào giỏ hàng!');
//     // Có thể gọi API hoặc lưu vào giỏ hàng trong session/local storage
//   }
// }
@Input() product: any;
@Input() showModal: boolean = false;
@Output() close = new EventEmitter<void>();
baseUrl: string = 'https://lacdau.com';
showMoreDetails: boolean = false;
constructor(private cartService: CartService, private productService: ProductService) {}
currentIndex: number = 0;
  autoplayInterval: any;
  numberNotifi = 0;
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // 10 products per page (2 rows of 5 products)
  totalPages: number = 0;
  paginatedItems: any[] = [];
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

  // Hàm xử lý khi nhấn nút "Mua ngay"
  changeMainImage(imageUrl: string) {
    const mainImageElement = document.querySelector('.main-image') as HTMLImageElement;
    mainImageElement.src = imageUrl;
  }
  
  // Nút prev và next
  currentImageIndex: number = 0;
  
  prevImage() {
    if (this.product.imageProduct && this.product.imageProduct.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.imageProduct.length) % this.product.imageProduct.length;
      this.changeMainImage(this.baseUrl + this.product.imageProduct[this.currentImageIndex]);
    }
  }
  
  nextImage() {
    if (this.product.imageProduct && this.product.imageProduct.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.imageProduct.length;
      this.changeMainImage(this.baseUrl + this.product.imageProduct[this.currentImageIndex]);
    }
  }
  addToCart(data : any ): void {
    // Giả sử bạn sẽ gửi thông tin sản phẩm vào giỏ hàng
    var _data =
      {
        produceId : data?.id,
        quantity : 1,
        unitPrice : data?.unitPrice,
      }
  
    // this.cartService.handleAddCart(_data as unknown as CartDeatail).subscribe(() => {
    //   this.handlegetNumberNotifi()
    // })
    this.cartService.handleAddCart(_data as unknown as CartDeatail).subscribe(
      () => {
        this.handlegetNumberNotifi();
        toastr.success('Sản phẩm đã được thêm vào giỏ hàng thành công!');
      },
      (error) => {
        toastr.error('Có lỗi xảy ra khi thêm vào giỏ hàng.', 'Lỗi');
        console.error('Error:', error); // Kiểm tra thêm lỗi
      }
    );
  }
    // Đóng modal
    handlegetNumberNotifi() {
      this.productService.getAllProducts().subscribe(
        (data) => {
          this.products = data;
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
        }
      );
      this.cartService.handleGetCartByUserId().subscribe((response) => {
        this.numberNotifi = (response as any)?.result.cartDetails?.length
      })
    }
  
  // Mua ngay
  buyNow() {
    // Điều hướng đến trang thanh toán hoặc thực hiện thanh toán
    console.log('Mua ngay sản phẩm:', this.product);
  }
}

