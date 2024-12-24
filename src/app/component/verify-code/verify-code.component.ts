import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  email: string = '';
  code: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  verifyCode(): void {
    if (!this.code || this.code.length !== 6) {
      this.errorMessage = 'Mã xác thực phải có 6 ký tự.';
      return;
    }

    this.isLoading = true;
    const verifyCodeApiUrl = 'https://localhost:7249/api/Login/verify-code';
    const payload = { email: this.email, code: this.code };

    const verifyRequest = this.http.post(verifyCodeApiUrl, payload).subscribe(
      () => {
        this.successMessage = 'Mã xác thực hợp lệ. Tài khoản đã được xác thực.';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Mã xác thực không hợp lệ:', error);
        this.errorMessage = 'Mã xác thực không đúng, vui lòng thử lại.';
        this.successMessage = '';
      },
      () => {
        this.isLoading = false;
      }
    );

    this.subscriptions.add(verifyRequest);
  }

  handleResendSuccess(): void {
    this.successMessage = 'Mã xác thực đã được gửi lại.';
    this.errorMessage = '';
  }

  handleResendError(error: string): void {
    this.errorMessage = error;
    this.successMessage = '';
  }
}
