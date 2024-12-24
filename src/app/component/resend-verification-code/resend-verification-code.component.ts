import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-resend-verification-code',
  templateUrl: './resend-verification-code.component.html',
  styleUrls: ['./resend-verification-code.component.css']
})
export class ResendVerificationCodeComponent implements OnInit, OnDestroy {
  @Input() email: string = ''; // Nhận email từ component cha
  @Output() onResendSuccess = new EventEmitter<void>();
  @Output() onResendError = new EventEmitter<string>();

  isLoading: boolean = false;
  countdown: number = 60; // Đếm ngược từ 60 giây
  canResend: boolean = false; // Kiểm tra có thể gửi lại mã hay không
  errorMessage: string = '';
  successMessage: string = '';
  private countdownSubscription: Subscription = new Subscription(); // Để quản lý thời gian đếm ngược

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  // Bắt đầu đếm ngược từ 60 giây
  startCountdown(): void {
    this.countdown = 60;
    this.canResend = false;

    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canResend = true;
        this.countdownSubscription.unsubscribe();
      }
    });
  }

  resendCode(): void {
    if (this.isLoading || !this.canResend) return;

    this.isLoading = true;
    const resendCodeApiUrl = 'https://localhost:7249/api/Login/resend-verification-code';
    const payload = { email: this.email };

    this.http.post(resendCodeApiUrl, payload).subscribe(
      () => {
        this.onResendSuccess.emit();
        this.successMessage = 'Mã xác thực đã được gửi lại.';
        this.errorMessage = '';
        this.startCountdown(); // Bắt đầu lại đếm ngược sau khi gửi lại mã
      },
      (error) => {
        this.onResendError.emit('Không thể gửi lại mã xác thực, vui lòng thử lại.');
        this.successMessage = '';
        this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
