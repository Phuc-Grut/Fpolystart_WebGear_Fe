
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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
export class ProfileService {
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

  // Lấy hồ sơ người dùng
  getUserProfile(): Observable<UserProfile> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }
    return this.http.get<UserProfile>(`${this.apiUrl}/Account/get-by-id/${userId}`);
  }

  // Cập nhật hồ sơ người dùng
  updateUserProfile(userData: UserProfile): Observable<UserProfile> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }
    return this.http.put<UserProfile>(`${this.apiUrl}/Account/update/${userId}`, userData);
  }

  // Đổi mật khẩu
  changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }

    return this.http.post(`${this.apiUrl}/Password/change-password`, {
      id: userId,  // Key `id` truyền userId
      oldPassword,
      newPassword,
      newPasswordConFirm: newPasswordConfirm // Key này có thể kiểm tra chính tả với backend
    });
  }
}