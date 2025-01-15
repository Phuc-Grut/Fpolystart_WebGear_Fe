import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/service/payment.service';
import { Voucher, VoucherAdminService } from '../voucher-admin.service';
import { ProductDetailUserComponent } from '../user/product-detail-user/product-detail-user.component';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalQuantity: number = 0;
  totalAmount: number = 0;
  isModalOpen: boolean = false;
  voucherCode: string = '';
  discountAmount: number = 0;
  finalAmount: number = 0;
  vouchers: Voucher[] = [];
  paymentMethod: string = 'COD';
  selectedProduct: any = null;
  private apiUrl = 'https://localhost:7249/api/Cart';
  private orderUrl = 'https://localhost:7249/api/Orders';

  constructor(private http: HttpClient, private paymentService: PaymentService, private voucherService: VoucherAdminService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartByUserId();
    this.loadVouchers();
  }

  getCartByUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.userId) {
      this.http.get(`${this.apiUrl}/user/${user.userId}`).subscribe(response => {
        this.cartItems = (response as any)?.result?.cartDetails || [];
        this.calculateTotals();
      }, error => {
        console.error('Error fetching cart:', error);
      });
    }
  }

  calculateTotals(): void {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
    this.finalAmount = Math.max(0, this.totalAmount - this.discountAmount);
  }
viewProductDetail(productId: number): void {
    this.selectedProduct = this.cartItems.find(item => item.productID === productId);
    if (this.selectedProduct) {
      this.loadProductDetails(productId);
      this.isModalOpen = true;
    }
  }
loadProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (response: any) => {
        this.selectedProduct = response;  // Lưu thông tin chi tiết sản phẩm
      },
      (error) => {
        console.error('Error loading product details', error);
      }
    );
  }

  // Đóng modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
  onQuantityChange(item: any, newQuantity: number): void {
    item.quantity = Math.max(newQuantity, 1);
    item.totalPrice = item.quantity * item.unitPrice;
    this.calculateTotals();
  }

  clearCart(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.userId) {
      this.http.delete(`${this.apiUrl}/user/${user.userId}/clear`).subscribe(() => {
        this.cartItems = [];
        this.calculateTotals();
      });
    }
  }

  removeProduct(id: number): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.userId) {
      this.http.delete(`${this.apiUrl}/user/${user.userId}/product/${id}`).subscribe(() => {
        this.getCartByUserId();
      });
    }
  }
redirectToAppUserHome(): void {
    this.router.navigate(['app-user-home']);
  }
  handlePayment(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.userId) {
      const orderDetails = this.cartItems.map(item => ({
        productID: item.productID,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      }));

      const orderData = {
        userID: user.userId,
        voucherID: null,
        orderStatus: this.paymentMethod === 'BankTransfer' ? 4 : 1,
        paymentMethod: this.paymentMethod,
orderDetails: orderDetails,
        createdTime: new Date().toISOString(),
        completeDate: new Date().toISOString(),
      };

      this.http.post(`${this.orderUrl}/create-order`, orderData).subscribe(response => {
        if (this.paymentMethod === 'BankTransfer') {
          this.paymentService.createPayment({
            amount: this.finalAmount,
            orderType: 'other',
            orderDescription: 'Thanh toán VNPay DecorGear',
            name: user.username
          }).subscribe(paymentResponse => {
            window.location.href = paymentResponse.paymentUrl;
          });
        } else {
          alert('Đặt hàng thành công!');
          this.clearCart();
        }
      });
    }
  }

  loadVouchers(): void {
    this.voucherService.getVouchers().subscribe(data  => {
      this.vouchers = data;
    });
  }

  applyVoucher(): void {
    const voucher = this.vouchers.find(v => v.voucherName === this.voucherCode && v.status === 1);
    if (voucher) {
      this.discountAmount = this.totalAmount * (voucher.voucherPercent );
      this.finalAmount = this.totalAmount - this.discountAmount;
      alert(`Áp dụng mã giảm giá thành công! Giảm ${voucher.voucherPercent}%`);
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  }
}
