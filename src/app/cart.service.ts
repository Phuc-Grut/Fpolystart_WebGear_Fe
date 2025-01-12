import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = []; // Giỏ hàng lưu trữ các sản phẩm

  constructor() {}

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.productID === product.productID);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  // Lấy danh sách sản phẩm trong giỏ hàng
  getCart() {
    return this.cart;
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productID: string) {
    this.cart = this.cart.filter(item => item.productID !== productID);
  }

  // Làm trống giỏ hàng
  clearCart() {
    this.cart = [];
  }
}