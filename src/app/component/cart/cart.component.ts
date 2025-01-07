// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';

// // @Component({
// //   selector: 'app-cart',
// //   templateUrl: './cart.component.html',
// //   styleUrls: ['./cart.component.css']
// // })
// // export class CartComponent implements OnInit {
// //   products = [
// //     { id: 1, name: 'Product 1', price: 100 },
// //     { id: 2, name: 'Product 2', price: 200 },
// //     // Thêm các sản phẩm khác nếu cần
// //   ];
// //   cartItems: any[] = [];

// //   private apiUrl = 'https://localhost:7249/api/Cart';

// //   constructor(private http: HttpClient) { }

// //   ngOnInit(): void {
// //     // Bạn không cần gọi addToCart trong ngOnInit
// //     this.getCartByUserId()
// //   }

// //   addToCart(product: any) {
// //     const cartDetail = {
// //       UserID: 1, // ID người dùng, bạn có thể lấy từ session hoặc auth service
// //       ProductID: product.id,
// //       Quantity: 1, // Số lượng sản phẩm
// //       UnitPrice: product.price
// //     };

// //     this.http.post(`${this.apiUrl}/add`, cartDetail).subscribe(response => {
// //       console.log('Product added to cart:', response);
// //       // Hiển thị thông báo thành công hoặc cập nhật giao diện
// //     }, error => {
// //       console.error('Error adding product to cart:', error);
// //       // Hiển thị thông báo lỗi
// //     });
// //   }

// //   /// get cart by userid
// //   getCartByUserId() {
// //     let data = localStorage.getItem('user');
// //     let user ;
// //     if (data)
// //       user = JSON.parse(data);
// //     this.http.get(`${this.apiUrl}/user/${user?.userId as string}`).subscribe(response => {
// //       // this.cartItems = response.data;
// //       this.cartItems = (response as any)?.result?.CartDetails
// //       // Cập nhật giao diện hiển thị giỏ hàng
// //     }, error => {
// //       console.error('Error fetching cart:', error);
// //       // Hiển thị thông báo lỗi
// //     });
// //   }

// // }
// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';

// // @Component({
// //   selector: 'app-cart',
// //   templateUrl: './cart.component.html',
// //   styleUrls: ['./cart.component.css']
// // })
// // export class CartComponent implements OnInit {
// //   products = [
// //     { id: 1, name: 'Product 1', price: 100 },
// //     { id: 2, name: 'Product 2', price: 200 },
// //     // Thêm các sản phẩm khác nếu cần
// //   ];
// //   cartItems: any[] = [];
// //   totalQuantity: number = 0;  // Khai báo tổng số lượng
// //   totalAmount: number = 0;    // Khai báo tổng giá trị

// //   private apiUrl = 'https://localhost:7249/api/Cart';

// //   constructor(private http: HttpClient) { }

// //   ngOnInit(): void {
// //     this.getCartByUserId();
// //   }

// //   addToCart(product: any) {
// //     const cartDetail = {
// //       UserID: 1, // ID người dùng, bạn có thể lấy từ session hoặc auth service
// //       ProductID: product.id,
// //       Quantity: 1, // Số lượng sản phẩm
// //       UnitPrice: product.price
// //     };

// //     this.http.post(`${this.apiUrl}/add`, cartDetail).subscribe(response => {
// //       console.log('Product added to cart:', response);
// //       // Sau khi thêm sản phẩm vào giỏ, tải lại giỏ hàng
// //       this.getCartByUserId();
// //     }, error => {
// //       console.error('Error adding product to cart:', error);
// //       // Hiển thị thông báo lỗi
// //     });
// //   }

// //   getCartByUserId() {
// //     const data = localStorage.getItem('user');
// //     let user;
// //     if (data) {
// //       user = JSON.parse(data);
// //     }

// //     if (user && user.userId) {
// //       this.http.get(`${this.apiUrl}/user/${user.userId}`).subscribe(response => {
// //         const cartDetails = (response as any)?.result?.CartDetails;
// //         if (cartDetails) {
// //           this.cartItems = cartDetails; // Cập nhật giỏ hàng
// //           this.calculateTotals(); // Tính toán tổng số lượng và tổng tiền
// //         } else {
// //           this.cartItems = []; // Giỏ hàng trống nếu không có dữ liệu
// //           this.calculateTotals(); // Cập nhật tổng khi giỏ hàng trống
// //         }
// //       }, error => {
// //         console.error('Error fetching cart:', error);
// //         this.cartItems = [];
// //         this.calculateTotals(); // Cập nhật tổng khi có lỗi
// //       });
// //     } else {
// //       console.error('No user found in localStorage');
// //       this.cartItems = [];
// //       this.calculateTotals(); // Cập nhật tổng khi không có user
// //     }
// //   }

// //   calculateTotals() {
// //     // Tính tổng số lượng và tổng giá trị của giỏ hàng
// //     this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
// //     this.totalAmount = this.cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ProductService } from 'src/app/service/product.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   products = [
//     { id: 1, name: 'Product 1', price: 100 },
//     { id: 2, name: 'Product 2', price: 200 },
//     // Thêm các sản phẩm khác nếu cần
//   ];
//   cartItems: any[] = [];
//   totalQuantity: number = 0;
//   totalAmount: number = 0;

//   private apiUrl = 'https://localhost:7249/api/Cart';  // Thay API của bạn vào đây

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getCartByUserId(); // Gọi phương thức khi component khởi tạo
//   }


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
//           this.calculateTotals(); // Tính toán tổng số lượng và tổng tiền
//         } else {
//           this.cartItems = []; // Giỏ hàng trống nếu không có dữ liệu
//           this.calculateTotals(); // Cập nhật tổng khi giỏ hàng trống
//         }
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
//    // Xử lý thay đổi số lượng
//    onQuantityChange(item: any, newQuantity: number): void {
//     if (newQuantity < 1) {
//       newQuantity = 1; // Đảm bảo số lượng ít nhất là 1
//     }
//     item.quantity = newQuantity; // Cập nhật số lượng
//     item.totalPrice = item.quantity * item.unitPrice; // Cập nhật giá tiền cho sản phẩm
//     this.calculateTotals(); // Tính lại tổng số lượng và tổng tiền
//   }
//   removeProduct(product: any): void {
//     const index = this.cartItems.findIndex(item => item.productId === product.productId);
//     if (index !== -1) {
//       this.cartItems.splice(index, 1);  // Xóa sản phẩm khỏi mảng
//       this.calculateTotals();  // Cập nhật lại tổng số lượng và tổng tiền
//     }
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalQuantity: number = 0;
  totalAmount: number = 0;
  isModalOpen: boolean = false; // Biến điều khiển việc hiển thị modal
  private apiUrl = 'https://localhost:7249/api/Cart';  // Thay API của bạn vào đây

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCartByUserId(); // Gọi phương thức khi component khởi tạo
  }

  getCartByUserId(): void {
    const data = localStorage.getItem('user');
    let user;
    if (data) {
      user = JSON.parse(data);
    }

    if (user && user.userId) {
      this.http.get(`${this.apiUrl}/user/${user.userId}`).subscribe(response => {
        console.log(response);  // Kiểm tra dữ liệu trả về từ API
        const cartDetails = (response as any)?.result?.cartDetails;
        if (cartDetails) {
          this.cartItems = cartDetails; // Cập nhật giỏ hàng
          this.calculateTotals(); // Tính toán tổng số lượng và tổng tiền
        } else {
          this.cartItems = []; // Giỏ hàng trống nếu không có dữ liệu
          this.calculateTotals(); // Cập nhật tổng khi giỏ hàng trống
        }
      }, error => {
        console.error('Error fetching cart:', error);
        this.cartItems = [];
        this.calculateTotals(); // Cập nhật tổng khi có lỗi
      });
    } else {
      console.error('No user found in localStorage');
      this.cartItems = [];
      this.calculateTotals(); // Cập nhật tổng khi không có user
    }
  }

  // Tính tổng số lượng và tổng tiền
  calculateTotals(): void {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }

  // Mở modal khi di chuột vào giỏ hàng
  openCartModal(): void {
    this.isModalOpen = true;
  }

  // Đóng modal khi di chuột ra ngoài giỏ hàng
  closeCartModal(): void {
    this.isModalOpen = false;
  }

  // Xử lý thay đổi số lượng
  onQuantityChange(item: any, newQuantity: number): void {
    if (newQuantity < 1) {
      newQuantity = 1; // Đảm bảo số lượng ít nhất là 1
    }
    item.quantity = newQuantity; // Cập nhật số lượng
    item.totalPrice = item.quantity * item.unitPrice; // Cập nhật giá tiền cho sản phẩm
    this.calculateTotals(); // Tính lại tổng số lượng và tổng tiền
  }

   removeProduct(product: any): void {
       const index = this.cartItems.findIndex(item => item.productId === product.productId);
        if (index !== -1) {
        this.cartItems.splice(index, 1);  // Xóa sản phẩm khỏi mảng
         this.calculateTotals();  // Cập nhật lại tổng số lượng và tổng tiền
       }
      }
}

