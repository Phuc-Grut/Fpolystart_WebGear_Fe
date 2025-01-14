import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any = null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;

  // Thuộc tính cho đổi mật khẩu
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  isChangingPassword: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Hiển thị phần thông tin người dùng
  showUserProfile(): void {
    this.isChangingPassword = false;
    this.clearMessages(); // Xóa thông báo cũ
  }

  // Hiển thị phần đổi mật khẩu
  showChangePassword(): void {
    this.isChangingPassword = true;
    this.clearMessages(); // Xóa thông báo cũ
  }

  // Tải hồ sơ người dùng
  loadUserProfile(): void {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải hồ sơ người dùng.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  // Cập nhật hồ sơ người dùng
  onUpdateProfile(): void {
    if (!this.userProfile) {
      this.errorMessage = 'Không có dữ liệu để cập nhật.';
      return;
    }

    this.profileService.updateUserProfile(this.userProfile).subscribe(
      (updatedProfile) => {
        this.userProfile = updatedProfile;
        this.successMessage = 'Cập nhật hồ sơ thành công!';
      },
      (error) => {
        this.errorMessage = 'Cập nhật hồ sơ thất bại.';
        console.error(error);
      }
    );
  }

  // Thay đổi mật khẩu
  onChangePassword(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    this.profileService.changePassword(this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      () => {
        this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
        this.clearPasswordFields();
        this.isChangingPassword = false;
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
        console.error(error);
      }
    );
  }

  // Xóa các trường nhập mật khẩu
  private clearPasswordFields(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirm = '';
  }

  // Xóa thông báo lỗi và thành công
  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}