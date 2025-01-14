import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;  // Biến lưu thông tin người dùng

  constructor() { }

  // Lưu thông tin người dùng vào service
  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));  // Lưu vào localStorage nếu cần
  }

  // Lấy thông tin người dùng từ service
  getUser() {
    if (this.user) {
      return this.user;
    } else {
      const userFromLocalStorage = localStorage.getItem('user');
      return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    }
  }

  // Xóa thông tin người dùng
  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
