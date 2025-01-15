// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { PaymentService } from '../service/payment.service';
// import { Route, Router } from '@angular/router';
// import { ProductService } from '../service/product.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalQuantity: number = 0;
//   totalAmount: number = 0;
//   isModalOpen: boolean = false;
//   private apiUrl = 'https://localhost:7249/api/Cart';  // Thay API của bạn vào đây

//   constructor(private http: HttpClient, private paymentService : PaymentService, private router: Router, private productService: ProductService,) {}

//   ngOnInit(): void {
//     this.getCartByUserId(); // Gọi phương thức khi component khởi tạo
//   }

//   // Lấy giỏ hàng theo userId
//   getCartByUserId(): void {
//     const data = localStorage.getItem('user');
//     let user;
//     if (data) {
//       user = JSON.parse(data);
//     }

//     if (user && user.userId) {
//       this.http.get(`${this.apiUrl}/user/${user.userId}`).subscribe(response => {
//         console.log(response);  // Kiểm tra dữ liệu trả về từ API
//         const cartDetails = (response as any)?.result?.cartDetails;
//         if (cartDetails) {
//           this.cartItems = cartDetails; // Cập nhật giỏ hàng
//         } else {
//           this.cartItems = []; // Giỏ hàng trống nếu không có dữ liệu
//         }
//         this.calculateTotals(); // Tính toán tổng số lượng và tổng tiền
//       }, error => {
//         console.error('Error fetching cart:', error);
//         this.cartItems = [];
//         this.calculateTotals(); // Cập nhật tổng khi có lỗi
//       });
//     } else {
//       console.error('No user found in localStorage');
//       this.cartItems = [];
//       this.calculateTotals(); // Cập nhật tổng khi không có user
//     }
//   }

//   // Tính tổng số lượng và tổng tiền
//   calculateTotals(): void {
//     this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
//     this.totalAmount = this.cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
//   }

//   // Mở modal khi di chuột vào giỏ hàng
//   openCartModal(): void {
//     this.isModalOpen = true;
//   }

//   // Đóng modal khi di chuột ra ngoài giỏ hàng
//   closeCartModal(): void {
//     this.isModalOpen = false;
//   }
//   selectedProduct: any = null;
//   // viewProductDetail(product: any) {
//   //   this.selectedProduct = product;
//   //   this.isModalOpen = true;
//   // }

//   viewProductDetail(productId: number): void {
//     // Tìm sản phẩm trong giỏ hàng theo productId
//     this.selectedProduct = this.cartItems.find(item => item.productID === productId);
  
//     // Mở modal nếu tìm thấy sản phẩm
//     if (this.selectedProduct) {
//       this.isModalOpen = true;
//     }
//   }
  

//   // Hàm đóng modal
//   closeModal() {
//     this.isModalOpen = false;
//     this.selectedProduct = null;
//   }
//   // Xử lý thay đổi số lượng
//   onQuantityChange(item: any, newQuantity: number): void {
//     if (newQuantity < 1) {
//       newQuantity = 1; // Đảm bảo số lượng ít nhất là 1
//     }
//     item.quantity = newQuantity; // Cập nhật số lượng
//     item.totalPrice = item.quantity * item.unitPrice; // Cập nhật giá tiền cho sản phẩm
//     this.calculateTotals(); // Tính lại tổng số lượng và tổng tiền
//   }



//   // Xóa toàn bộ giỏ hàng
//   clearCart(): void {
//     const data = localStorage.getItem('user');
//     let user;
//     if (data) {
//       user = JSON.parse(data);
//     }

//     if (user && user.userId) {
// this.http.delete(`${this.apiUrl}/user/${user.userId}/clear`).subscribe(response => {
//         console.log('Cart cleared:', response);
//         // Cập nhật lại giỏ hàng sau khi xóa toàn bộ
//         this.cartItems = [];
//         this.calculateTotals();
//       }, error => {
//         console.error('Error clearing cart:', error);
//       });
//     }
//   }

//   // Xóa 1 sản phẩm khỏi giỏ hàng
//   removeProduct(id : number): void {
//     const data = localStorage.getItem('user');
//     let user;
//     if (data) {
//       user = JSON.parse(data);
//     }



//     if (user && user.userId) {
//       this.http.delete(`${this.apiUrl}/user/${user.userId}/product/${id}`).subscribe(response => {
//         console.log('Product removed:', response);
//         // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
//         this.getCartByUserId();
//         this.calculateTotals();
//       }, error => {
//         console.error('Error removing product:', error);
//       });
//     }
//   }

//   redirectToAppUserHome() {
//     this.router.navigate(['app-user-home']);
//   }

  

//   handlePayment(request: any) {
//     const userData = localStorage.getItem('user');
//     let user: { username: string } | null = null;

//     if (userData) {
//       try {
//         user = JSON.parse(userData);
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     }

//     if (user && user.username) {
//       this.paymentService
//         .createPayment({
//           amount: request.amount,
//           orderType: 'other',
//           orderDescription: 'Thanh toán VNPay DecorGear',
//           name: user.username,
//         })
//         .subscribe(
//           (response) => {
//             console.log('Payment URL generated successfully:', response);
//             if (response.paymentUrl) {
//               // Redirect to the VNPay payment URL
//               window.location.href = response.paymentUrl;

//               // Clear cart after successful payment
//               this.clearCart();
//             }
//           },
//           (error) => {
//             console.error('Error during payment creation:', error);
//             alert('Không thể tạo URL thanh toán. Vui lòng thử lại sau.');
//           }
//         );
//     } else {
//       alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

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
  selectedProduct: any = null;  // Sản phẩm đang được chọn để xem chi tiết
  private apiUrl = 'https://localhost:7249/api/Cart';

  constructor(private http: HttpClient, private paymentService: PaymentService, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartByUserId(); // Lấy giỏ hàng khi component được khởi tạo
  }

  // Lấy giỏ hàng của người dùng từ API
  getCartByUserId(): void {
    const data = localStorage.getItem('user');
    let user;
    if (data) {
      user = JSON.parse(data);
    }

    if (user && user.userId) {
      this.http.get(`${this.apiUrl}/user/${user.userId}`).subscribe(response => {
        const cartDetails = (response as any)?.result?.cartDetails;
        if (cartDetails) {
          this.cartItems = cartDetails;
        } else {
          this.cartItems = [];
        }
        this.calculateTotals();
      }, error => {
        console.error('Error fetching cart:', error);
        this.cartItems = [];
        this.calculateTotals();
      });
    }
  }

  // Tính toán tổng số lượng và tổng tiền
  calculateTotals(): void {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }

  // Mở modal để xem chi tiết sản phẩm
  viewProductDetail(productId: number): void {
    this.selectedProduct = this.cartItems.find(item => item.productID === productId);
    if (this.selectedProduct) {
      this.loadProductDetails(productId);
      this.isModalOpen = true;
    }
  }

  // Lấy chi tiết sản phẩm từ API
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

  // Xử lý thay đổi số lượng sản phẩm
  onQuantityChange(item: any, newQuantity: number): void {
    if (newQuantity < 1) {
      newQuantity = 1;  // Đảm bảo số lượng không nhỏ hơn 1
    }
    item.quantity = newQuantity;
    item.totalPrice = item.quantity * item.unitPrice;
    this.calculateTotals();
  }

  // Xóa toàn bộ giỏ hàng
  clearCart(): void {
    const data = localStorage.getItem('user');
    let user;
    if (data) {
      user = JSON.parse(data);
    }

    if (user && user.userId) {
      this.http.delete(`${this.apiUrl}/user/${user.userId}/clear`).subscribe(response => {
        this.cartItems = [];
        this.calculateTotals();
      }, error => {
        console.error('Error clearing cart:', error);
      });
    }
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  removeProduct(id: number): void {
    const data = localStorage.getItem('user');
    let user;
    if (data) {
      user = JSON.parse(data);
    }

    if (user && user.userId) {
      this.http.delete(`${this.apiUrl}/user/${user.userId}/product/${id}`).subscribe(response => {
        this.getCartByUserId();
        this.calculateTotals();
      }, error => {
        console.error('Error removing product:', error);
      });
    }
  }

  // Điều hướng đến trang thanh toán
  redirectToAppUserHome(): void {
    this.router.navigate(['app-user-home']);
  }

  // Xử lý thanh toán
  handlePayment(request: any): void {
    const userData = localStorage.getItem('user');
    let user: { username: string } | null = null;

    if (userData) {
      try {
        user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }

    if (user && user.username) {
      this.paymentService.createPayment({
        amount: request.amount,
        orderType: 'other',
        orderDescription: 'Thanh toán VNPay DecorGear',
        name: user.username,
      }).subscribe(
        (response) => {
          if (response.paymentUrl) {
            window.location.href = response.paymentUrl;
            this.clearCart();
          }
        },
        (error) => {
          console.error('Error during payment creation:', error);
          alert('Không thể tạo URL thanh toán. Vui lòng thử lại sau.');
        }
      );
    } else {
      alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
    }
  }
}
