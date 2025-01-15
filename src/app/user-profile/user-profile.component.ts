import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';

  isProfileView: boolean = true;
  isChangePasswordView: boolean = false;
  isChangeLocationView: boolean = false;

  constructor(private profileService: ProfileService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadProvinces();
    this.loadSavedAddress();
  }

  loadUserProfile(): void {
    this.profileService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        this.errorMessage = 'Không thể tải hồ sơ người dùng.';
        console.error(error);
      }
    );
  }

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

  onChangePassword(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    this.profileService.changePassword(this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      () => {
        this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
        this.clearPasswordFields();
        this.isChangePasswordView = false;
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
        console.error(error);
      }
    );
  }

  private clearPasswordFields(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirm = '';
  }

  toggleView(view: string): void {
    if (view === 'profile') {
      this.isProfileView = true;
      this.isChangePasswordView = false;
      this.isChangeLocationView = false;
    } else if (view === 'changePassword') {
      this.isProfileView = false;
      this.isChangePasswordView = true;
      this.isChangeLocationView = false;
    } else if (view === 'changeLocation') {
      this.isProfileView = false;
      this.isChangePasswordView = false;
      this.isChangeLocationView = true;
    }
    this.clearMessages();
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  selectedProvince: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';
  result: string = '';

  loadProvinces(): void {
    this.locationService.getProvinces().subscribe(data => {
      this.provinces = data;
    });
  }

  onProvinceChange(): void {
    this.locationService.getDistricts(this.selectedProvince).subscribe(data => {
      this.districts = data.districts;
      this.wards = [];
      this.selectedDistrict = '';
      this.selectedWard = '';
      this.updateResult();
    });
  }

  onDistrictChange(): void {
    this.locationService.getWards(this.selectedDistrict).subscribe(data => {
      this.wards = data.wards;
      this.selectedWard = '';
      this.updateResult();
    });
  }

  onWardChange(): void {
    this.updateResult();
  }

  updateResult(): void {
    if (this.selectedProvince && this.selectedDistrict && this.selectedWard) {
      const provinceName = this.provinces.find(p => p.code == this.selectedProvince)?.name || '';
      const districtName = this.districts.find(d => d.code == this.selectedDistrict)?.name || '';
      const wardName = this.wards.find(w => w.code == this.selectedWard)?.name || '';

      this.result = `${provinceName} | ${districtName} | ${wardName}`;
      localStorage.setItem('selectedAddress', JSON.stringify({
        province: this.selectedProvince,
        district: this.selectedDistrict,
        ward: this.selectedWard
      }));
    }
  }

  loadSavedAddress(): void {
    const savedAddress = localStorage.getItem('selectedAddress');
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      this.selectedProvince = address.province;
      this.onProvinceChange();

      setTimeout(() => {
        this.selectedDistrict = address.district;
        this.onDistrictChange();

        setTimeout(() => {
          this.selectedWard = address.ward;
          this.updateResult();
        }, 500);
      }, 500);
    }
  }
  saveMessage: string = ''; // To hold the success message
  saveErrorMessage: string = ''; // To hold the error message

  // Method to save selected address to localStorage
  saveAddressToLocalStorage(): void {
    // Check if all address fields are selected
    if (this.selectedProvince && this.selectedDistrict && this.selectedWard) {
      const address = {
        province: this.selectedProvince,
        district: this.selectedDistrict,
        ward: this.selectedWard,
      };

      // Save the address to localStorage
      localStorage.setItem('selectedAddress', JSON.stringify(address));

      // Set success message
      this.saveMessage = 'Địa chỉ đã được lưu thành công!';

      // Clear any error message
      this.saveErrorMessage = '';
    } else {
      // Set error message if any address field is missing
      this.saveErrorMessage = 'Vui lòng chọn đủ tỉnh, quận và phường!';
      
      // Clear success message
      this.saveMessage = '';
    }
  }

}
