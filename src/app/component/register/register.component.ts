import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    name: ''
  };
  errorMessage = '';
  passwordStrengthError = false;
  emailInvalid = false;
  phoneInvalid = false;
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  }

  register() {
    this.errorMessage = ''; // Reset error message
    this.passwordStrengthError = false;
    this.emailInvalid = false;
    this.phoneInvalid = false;

    // Kiểm tra các trường trống
    if (!this.user.userName) {
      this.errorMessage = 'Tên đăng nhập không được để trống.';
      return;
    }
    if (!this.user.password) {
      this.errorMessage = 'Mật khẩu không được để trống.';
      return;
    }
    if (!this.user.email) {
      this.errorMessage = 'Email không được để trống.';
      return;
    }
    if (!this.user.phoneNumber) {
      this.errorMessage = 'Số điện thoại không được để trống.';
      return;
    }
    if (!this.user.name) {
      this.errorMessage = 'Tên không được để trống.';
      return;
    }

    // Kiểm tra tính hợp lệ của mật khẩu
    if (!this.validatePassword(this.user.password)) {
      this.passwordStrengthError = true;
      return;
    }

    // Kiểm tra tính hợp lệ của email
    if (!this.validateEmail(this.user.email)) {
      this.emailInvalid = true;
      return;
    }

    // Kiểm tra tính hợp lệ của số điện thoại
    if (!this.validatePhone(this.user.phoneNumber)) {
      this.phoneInvalid = true;
      return;
    }

    // Gửi yêu cầu đăng ký tới API
    this.http.post('https://localhost:7249/api/user/Account/register', this.user).subscribe(
      (response) => {
        alert('Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực.');
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