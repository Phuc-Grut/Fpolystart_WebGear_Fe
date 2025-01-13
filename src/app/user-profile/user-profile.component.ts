// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../service/user.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
// [x: string]: any;
//   userProfile: any = null;
//   errorMessage: string = '';
//   successMessage: string = '';
//   isLoading: boolean = true;

//   // Các thuộc tính cho việc thay đổi mật khẩu
//   oldPassword: string = '';
//   newPassword: string = '';
//   newPasswordConfirm: string = '';
//   isChangingPassword: boolean = false;

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadUserProfile();
//   }

//   // Tải hồ sơ người dùng
//   loadUserProfile(): void {
//     this.isLoading = true;
//     this.userService.getUserProfile().subscribe(
//       (profile) => {
//         this.userProfile = profile;
//         this.isLoading = false;
//       },
//       (error) => {
//         this.errorMessage = 'Không thể tải hồ sơ người dùng.';
//         console.error(error);
//         this.isLoading = false;
//       }
//     );
//   }

//   // Cập nhật hồ sơ người dùng
//   onUpdateProfile(userData: any): void {
//     this.userService.updateUserProfile(userData).subscribe(
//       (updatedProfile) => {
//         this.userProfile = updatedProfile;
//         alert('Cập nhật hồ sơ thành công!');
//       },
//       (error) => {
//         this.errorMessage = 'Cập nhật hồ sơ thất bại.';
//         console.error(error);
//       }
//     );
//   }

//   // Thay đổi mật khẩu
//   onChangePassword(): void {
//     if (this.newPassword !== this.newPasswordConfirm) {
//       this.errorMessage = 'Mật khẩu xác nhận không khớp!';
//       return;
//     }

//     this.userService.changePassword(this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
//       (response) => {
//         this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
//         this.isChangingPassword = false;  // Ẩn form sau khi thay đổi mật khẩu thành công
//       },
//       (error) => {
//         this.errorMessage = 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
//         console.error(error);
//       }
//     );
//   }

//   // Hiển thị form thay đổi mật khẩu
//   toggleChangePassword(): void {
//     this.isChangingPassword = !this.isChangingPassword;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  [x: string]: any;
  userProfile: any = null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;

  // Các thuộc tính cho việc thay đổi mật khẩu
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  isChangingPassword: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Tải hồ sơ người dùng
  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe(
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
  onUpdateProfile(userData: any): void {
    this.userService.updateUserProfile(userData).subscribe(
      (updatedProfile) => {
        this.userProfile = updatedProfile;
        this.successMessage = 'Cập nhật hồ sơ thành công!';
        alert(this.successMessage);
        // Tải lại hồ sơ người dùng sau khi cập nhật thành công
        this.loadUserProfile();
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

    this.userService.changePassword(this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      (response) => {
        this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
        this.isChangingPassword = false;  // Ẩn form sau khi thay đổi mật khẩu thành công
        alert(this.successMessage);

      },
      (error) => {
        this.errorMessage = 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
        console.error(error);
      }
    );
  }

  // Hiển thị form thay đổi mật khẩu
  toggleChangePassword(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }
}
