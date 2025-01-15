import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: any; // Dữ liệu người dùng (bao gồm role, chẳng hạn)
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}

  // Phương thức đăng nhập
  login() {
    this.errorMessage = ''; // Reset thông báo lỗi trước khi kiểm tra
    if (!this.credentials.username) {
      this.errorMessage = 'Tên đăng nhập không được để trống.';
      return;
    }
    if (!this.credentials.password) {
      this.errorMessage = 'Mật khẩu không được để trống.';
      return;
    }
  
    // Tiến hành gọi API nếu không có lỗi
    this.http.post<LoginResponse>('https://localhost:7249/api/Login/login', this.credentials)
      .subscribe(response => {
        sessionStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('user', JSON.stringify(response.user));
        if (this.credentials.username === 'admin') {
          alert('Đăng nhập thành công với quyền Admin!');
          this.router.navigate(['dashboard']);
        } else {
          alert('Đăng nhập thành công với quyền User!');
          this.router.navigate(['app-user-home']);
        }
      }, error => {
        console.error(error);
        alert('Đăng nhập thất bại.');
      });
  }
  
}
