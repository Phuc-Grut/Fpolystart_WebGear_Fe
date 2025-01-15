import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserProfile {
  userId: string;
  name: string;
  phoneNumber: string;
  email: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7249/api/user';

  constructor(private http: HttpClient) {}

  // Lấy userId từ localStorage
  private getUserId(): string | null {
    const data = localStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      return user.userId;
    }
    return null;
  }

  // Kiểm tra sự tồn tại của userId
  private checkUserId(): void {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }
  }

  // Lấy hồ sơ người dùng
  getUserProfile(): Observable<UserProfile> {
    this.checkUserId();
    const userId = this.getUserId();
    return this.http.get<UserProfile>(`${this.apiUrl}/Account/get-by-id/${userId}`);
  }

  // Cập nhật hồ sơ người dùng
  updateUserProfile(userData: UserProfile): Observable<UserProfile> {
    this.checkUserId();
    const userId = this.getUserId();
    return this.http.put<UserProfile>(`${this.apiUrl}/Account/update/${userId}`, userData);
  }

  // Đổi mật khẩu
  changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    this.checkUserId();
    const userId = this.getUserId();

    // Gửi yêu cầu POST với dữ liệu thay đổi mật khẩu bao gồm userId, oldPassword, newPassword và newPasswordConfirm
    return this.http.post(`${this.apiUrl}/Password/change-password`, {
      id: userId,  // Gửi userId với key là 'id'
      oldPassword,
      newPassword,
      newPasswordConFirm: newPasswordConfirm // Lưu ý có thể sửa lỗi chính tả nếu cần
    });
  }
}
