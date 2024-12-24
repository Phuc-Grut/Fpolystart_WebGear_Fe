import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    name: ''
  };

  showPassword: boolean = false;  // Biến kiểm soát việc hiển thị mật khẩu

  constructor(private http: HttpClient, private router: Router) {}

  // Phương thức để bật/tắt hiển thị mật khẩu
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.http.post('https://localhost:7249/api/user/Account/register', this.user).subscribe(
      (response) => {
        alert('Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực.');
        // Điều hướng sang trang verify-code và truyền email
        localStorage.setItem('email', this.user.email);
        this.router.navigate(['/verify-code'], { queryParams: { email: this.user.email } });
      },
      (error) => {
        console.error('Lỗi đăng ký:', error);
        alert('Đăng ký thất bại.');
      }
    );
  }
}
