import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  forgotPassword() {
    this.http.post('https://localhost:7249/api/Password/forgot-password', { email: this.email })
      .subscribe(
        response => {
          alert('Email khôi phục mật khẩu đã được gửi!');
        },
        error => {
          console.error('Error sending forgot password email:', error);
          alert('Lỗi gửi email khôi phục: ' + (error.error?.message || 'Vui lòng thử lại.'));
        }
      );
  }
}
