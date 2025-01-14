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

  constructor(private http: HttpClient, private router: Router) {}

  // Phương thức đăng nhập
  login() {
    this.http.post<LoginResponse>('https://localhost:7249/api/Login/login', this.credentials)
      .subscribe(response => {
        // Lưu thông tin người dùng vào sessionStorage/localStorage
        sessionStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Kiểm tra nếu username là 'admin'
        if (this.credentials.username === 'admin') {
          alert('Đăng nhập thành công với quyền Admin!');
          this.router.navigate(['dashboard']); // Điều hướng đến trang admin (dashboard)
        } else {
          alert('Đăng nhập thành công với quyền User!');
          this.router.navigate(['app-user-home']); // Điều hướng đến trang người dùng
        }
      }, error => {
        console.error(error);
        alert('Đăng nhập thất bại.');
      });
  }
}
