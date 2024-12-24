import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  baseUrl: string = 'https://lacdau.com';
  products: any[] = [];
  currentPage: number = 1; // Current page
  itemsPerPage: number = 5; // Products per page
  totalItems: number = 0;
  productDetail: any = null;
  selectedProduct: any = null;
  showModalAdd: boolean = false;
  showModalEdit: boolean = false;
  showModalDetail: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.totalItems = data.length;
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }

  get pagedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  pageNumbers(): number[] {
    const totalPages = this.totalPages;
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  // Get total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  openModalAdd() {
    this.showModalAdd = true;
  }

  openModalEdit(productId: number) {
    // Lấy thông tin sản phẩm từ API dựa trên productId
    this.productService.getProductById(productId).subscribe(
      (data) => {
        this.selectedProduct = data; // Lưu thông tin sản phẩm cần chỉnh sửa
        this.showModalEdit = true; // Mở modal chỉnh sửa
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    );
  }
  closeModalAdd() {
    this.showModalAdd = false;
  }

  closeModalEdit() {
    this.showModalEdit = false;
  }

  // Open modal to show product detail
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
}
