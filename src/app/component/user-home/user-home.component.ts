import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CartDeatail, CartService } from 'src/app/service/cart.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit, OnDestroy,AfterViewInit {
  images: string[] = [
    'https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
    'https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png',
  ];

  currentIndex: number = 0;
  autoplayInterval: any;

  constructor(private productService: ProductService, private cartService : CartService, private route: Router) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  baseUrl: string = 'https://lacdau.com';
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // 10 products per page (2 rows of 5 products)
  totalPages: number = 0;
  paginatedItems: any[] = [];
  numberNotifi = 0;
 navigate(){
  this.route.navigate(['/login'])
 }
  ngOnInit(): void {
    this.startAutoplay();
    // this.groupItems();

    this.updatePagination();
    this.handlegetNumberNotifi()
  }

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
  // allItems = [
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP001', status: 'Còn hàng', price: 123000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP002', status: 'Hết hàng', price: 95000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP003', status: 'Còn hàng', price: 150000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP004', status: 'Còn hàng', price: 200000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP005', status: 'Còn hàng', price: 250000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP006', status: 'Còn hàng', price: 300000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP007', status: 'Hết hàng', price: 350000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP008', status: 'Còn hàng', price: 400000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP009', status: 'Còn hàng', price: 450000 },
  //   { imageUrl: 'https://via.placeholder.com/250', productCode: 'SP010', status: 'Còn hàng', price: 500000 }
  // ];

  // Mỗi nhóm sẽ chứa 5 sản phẩm
  // groupedItems: any[] = [];

  //  groupItems() {
  //    const itemsPerRow = 5;
  //    this.groupedItems = [];
  //    for (let i = 0; i < this.products.length; i += itemsPerRow) {
  //     this.groupedItems.push(this.products.slice(i, i + itemsPerRow));
  //    }
  //  }

  items = [
    {
      productCode: 'M001',
      status: 'Mới',
      price: 120000,
      imageUrl: 'assets/mouse1.jpg',
    },
    {
      productCode: 'M002',
      status: 'Mới',
      price: 150000,
      imageUrl: 'assets/mouse2.jpg',
    },
    {
      productCode: 'M003',
      status: 'Mới',
      price: 100000,
      imageUrl: 'assets/mouse3.jpg',
    },
    {
      productCode: 'M004',
      status: 'Mới',
      price: 200000,
      imageUrl: 'assets/mouse4.jpg',
    },
    {
      productCode: 'M005',
      status: 'Mới',
      price: 180000,
      imageUrl: 'assets/mouse5.jpg',
    },
    {
      productCode: 'M006',
      status: 'Mới',
      price: 160000,
      imageUrl: 'assets/mouse6.jpg',
    },
    {
      productCode: 'M007',
      status: 'Mới',
      price: 130000,
      imageUrl: 'assets/mouse7.jpg',
    },
    {
      productCode: 'M008',
      status: 'Mới',
      price: 170000,
      imageUrl: 'assets/mouse8.jpg',
    },
    {
      productCode: 'M009',
      status: 'Mới',
      price: 110000,
      imageUrl: 'assets/mouse9.jpg',
    },
    {
      productCode: 'M010',
      status: 'Mới',
      price: 140000,
      imageUrl: 'assets/mouse10.jpg',
    },
    {
      productCode: 'M011',
      status: 'Mới',
      price: 120000,
      imageUrl: 'assets/mouse11.jpg',
    },
    {
      productCode: 'M012',
      status: 'Mới',
      price: 160000,
      imageUrl: 'assets/mouse12.jpg',
    },
    {
      productCode: 'M013',
      status: 'Mới',
      price: 180000,
      imageUrl: 'assets/mouse13.jpg',
    },
    {
      productCode: 'M014',
      status: 'Mới',
      price: 150000,
      imageUrl: 'assets/mouse14.jpg',
    },
    {
      productCode: 'M015',
      status: 'Mới',
      price: 130000,
      imageUrl: 'assets/mouse15.jpg',
    },
    // thêm các sản phẩm khác vào đây
  ];


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
  this.route.navigate(['/cart'], { queryParamsHandling: 'preserve',replaceUrl: true, });
// Thay '/cart' bằng URL trang giỏ hàng của bạn
}
}
