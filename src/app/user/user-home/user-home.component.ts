import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDeatail, CartService } from 'src/app/cart.service';
import { ProductService } from 'src/app/service/product.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations: [
    trigger('focus', [
      state('focused', style({
        // Các style khi focus
      })),
      transition('void <=> focused', [
        animate('300ms')  // Hiệu ứng khi chuyển trạng thái
      ])
    ])
  ]
})

export class UserHomeComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];  // Mảng chứa các sản phẩm trong giỏ hàng
  isCartVisible: boolean = false;  // Trạng thái giỏ hàng có hiển thị hay không
  totalPrice: number = 0;  // Tổng số tiền trong giỏ hàng

  showModalDetail: boolean = false;
  productDetail: any = null;
  images: string[] = [
    'https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
  ];
  
  currentIndex: number = 0;
  autoplayInterval: any;
  
  // cartItems: any[] = [];
  // isCartVisible: boolean = false;
  constructor(private productService: ProductService, private router: Router, private cartService: CartService) {
  }
  
  baseUrl: string = 'https://lacdau.com';
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // 10 products per page (2 rows of 5 products)
  totalPages: number = 0;
  paginatedItems: any[] = [];
  numberNotifi = 0;
 navigate(){
  this.router.navigate(['/login'])
 }
  ngOnInit(): void {
    this.startAutoplay();
    this.checkLoginStatus();

    // this.groupItems();
    this.loadProducts();
    this.updatePagination();
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePagination();
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );

    this.calculateTotalPrice();
    this.cartItems = [
      {
        productID: 1,
        productName: 'Chuột Gaming Razer Death Adder V3',
        avatarProduct: '/assets/images/razer_mouse.jpg',
        price: 1000000, // Giá sản phẩm
        quantity: 2 // Số lượng sản phẩm trong giỏ hàng
      },
      {
        productID: 2,
        productName: 'Bàn phím Logitech G502',
        avatarProduct: '/assets/images/logitech_keyboard.jpg',
        price: 1200000, // Giá sản phẩm
        quantity: 1 // Số lượng sản phẩm trong giỏ hàng
      }
    ];

    this.calculateTotalPrice(); // Tính tổng giá trị giỏ hàng khi khởi tạo
  }
  

  // Xóa sản phẩm khỏi giỏ hàng
  // removeFromCart(productID: string) {
  //   this.cartService.removeFromCart(productID);
  //   this.cartItems = this.cartService.getCart();
  // }
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
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
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

  
  showNextPageButton: boolean = false;

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.chunkArray(this.products.slice(startIndex, endIndex), 5); // Mỗi hàng có 5 sản phẩm
  }

  // Chia sản phẩm thành các nhóm (5 sản phẩm mỗi nhóm)
  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  // Nút "Previous"
  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Nút "Next"
  loadNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Tạo một danh sách các số trang
  pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Chuyển đến trang cụ thể khi người dùng nhấp vào số trang
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  isFocused = false;

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
  selectedProduct: any = null;
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;  // Lưu danh sách sản phẩm vào mảng products
      },
      (error) => {
        console.error('Error fetching products:', error);  // Xử lý lỗi nếu có
      }
    );
  }
  showSuccessOverlay: boolean = false;
  // Khi nhấn vào sản phẩm, gọi API để lấy chi tiết sản phẩm và mở modal
  //Phương thức này sẽ được gọi khi nhấp vào nút "Thêm vào giỏ hàng"
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
        this.updatePagination();
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
    this.cartService.handleGetCartByUserId().subscribe((response) => {
      this.numberNotifi = (response as any)?.result.cartDetails?.length
    })
  }
  redirectToCart() {
    this.router.navigate(['/cart'], { queryParamsHandling: 'preserve',replaceUrl: true, });
  // Thay '/cart' bằng URL trang giỏ hàng của bạn
  }

  openModalDetail(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data) => {
        this.productDetail = data; // Lưu thông tin chi tiết sản phẩm
        this.showModalDetail = true; // Mở modal chi tiết
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    );
  }

  // Hàm đóng modal chi tiết sản phẩm
  closeModalDetail(): void {
    this.showModalDetail = false;
  }

  isModalOpen: boolean = false;

  // Hàm mở modal và truyền thông tin sản phẩm vào
  viewProductDetail(product: any) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  // Hàm đóng modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
  
  // Khởi tạo giỏ hàng mẫu (có thể thay thế bằng dữ liệu thực tế)
  

  // Tính tổng giá trị giỏ hàng
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Phương thức gọi khi nhấn "Thanh toán ngay"
  checkout() {
    if (this.cartItems.length === 0) {
      alert("Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }

    // Giả lập xử lý thanh toán
    const paymentSuccessful = this.processPayment();

    if (paymentSuccessful) {
      alert("Thanh toán thành công!");
      this.cartItems = []; // Xóa giỏ hàng sau khi thanh toán
      this.calculateTotalPrice(); // Cập nhật lại tổng tiền
      this.isCartVisible = false; // Ẩn giỏ hàng
    } else {
      alert("Thanh toán thất bại. Vui lòng thử lại!");
    }
  }

  // Giả lập phương thức thanh toán (có thể kết nối với API thực tế)
  processPayment(): boolean {
    return Math.random() < 0.9;  // Giả lập thành công với xác suất 90%
  }

  // Hiển thị hoặc ẩn giỏ hàng
  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productID: number) {
    this.cartItems = this.cartItems.filter(item => item.productID !== productID);
    this.calculateTotalPrice(); // Cập nhật lại tổng tiền sau khi xóa sản phẩm
  }
  redirectToProfile() {
    this.router.navigate(['/user-profile'], { queryParamsHandling: 'preserve',replaceUrl: true, });
  // Thay '/cart' bằng URL trang giỏ hàng của bạn
  }
  isLoggedIn = false;  // Kiểm tra trạng thái đăng nhập
  userName = '';  // Lưu trữ tên người dùng
  dropdownVisible = false;  // Trạng thái menu thả xuống

  

  // Kiểm tra trạng thái đăng nhập từ localStorage hoặc sessionStorage
  checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(user).name;  // Giả sử lưu tên người dùng trong localStorage
    }
  }

  // Hiển thị dropdown
  showDropdown() {
    this.dropdownVisible = true;
  }

  // Ẩn dropdown
  hideDropdown() {
    this.dropdownVisible = false;
  }

  // Chuyển hướng đến trang hồ sơ
  // redirectToProfile() {
  //   this.router.navigate(['/profile']);
  // }

  // Đăng xuất
  logout() {
    localStorage.removeItem('user');  // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('token');  // Xóa token nếu có
    this.isLoggedIn = false;  // Cập nhật trạng thái đăng nhập
    this.userName = '';  // Xóa tên người dùng
    this.router.navigate(['/login']);  // Điều hướng về trang đăng nhập
  }

  // Chức năng đăng nhập
  login() {
    // Giả sử người dùng đăng nhập thành công và thông tin được lưu vào localStorage
    this.router.navigate(['/login']);
    this.checkLoginStatus();  // Kiểm tra lại trạng thái đăng nhập
  }

  // Chức năng đăng ký
  register() {
    // Điều hướng đến trang đăng ký
    this.router.navigate(['/register']);
  }
}
  

