import { CartDeatail } from 'src/app/service/cart.service';
import { CartService } from 'src/app/service/cart.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUser, ProductUserService } from 'src/app/service/product-user.service';
import { ProductService } from 'src/app/service/product.service';



@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css']
 })

export class HomeuserComponent  implements OnInit{


   isFocused = false;

   onFocus() {
     this.isFocused = true;
   }

   onBlur() {
    this.isFocused = false;
   }

   products: ProductUser[] = [];  // Mảng chứa danh sách sản phẩm
   currentIndex: number = 0;  // Chỉ mục hiện tại của danh sách sản phẩm
   numberNotifi = 0;

   constructor(private productService: ProductUserService, private cartService : CartService) {}

   ngOnInit(): void {
     // Gọi service để lấy danh sách sản phẩm
     this.productService.getProducts().subscribe(
       (response: ProductUser[]) => {
         this.products = response.map(product => ({
           ...product,
           showCart: false  // Thêm thuộc tính `showCart` để điều khiển việc hiển thị icon giỏ hàng
         }));
       },
       (error) => {
         console.error('Lỗi khi lấy danh sách sản phẩm', error);
       }
     );

     this.cartService.handleGetCartByUserId().subscribe((response) => {
      this.numberNotifi = (response as any)?.result.cartDetails.length
     })
   }

   // Di chuyển sang sản phẩm trước đó
   prevSlide(): void {
     if (this.currentIndex > 0) {
       this.currentIndex -= 4;
     }
   }

   // Di chuyển sang sản phẩm tiếp theo
   nextSlide(): void {
     if (this.currentIndex + 4 < this.products.length) {
       this.currentIndex += 4;
     }
   }

   // Hiển thị icon giỏ hàng khi di chuột vào ảnh sản phẩm
   showCartIcon(product: ProductUser): void {
     product.showCart = true;
   }

   // Ẩn icon giỏ hàng khi di chuột ra khỏi ảnh sản phẩm
   hideCartIcon(): void {
     this.products.forEach(product => product.showCart = false);
   }

   /// get

 }
