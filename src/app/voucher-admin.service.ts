import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Voucher {
  voucherID: number;
  voucherName: string;
  voucherPercent: number;
  expiry: string;
  createdTime: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoucherAdminService {
  private apiUrl = 'https://localhost:7249/api/Voucher';

  constructor(private http: HttpClient) {}

  // Phương thức lấy tất cả vouchers, hỗ trợ các tham số tùy chọn.
  getVouchers(request?: any): Observable<Voucher[]> {
    let params = new HttpParams();

    if (request) {
      Object.keys(request).forEach(key => {
        if (request[key] !== null && request[key] !== undefined) {
          params = params.set(key, request[key]);
        }
      });
    }

    return this.http.get<Voucher[]>(`${this.apiUrl}/get-all-voucher`, { params: params });
  }

  // Phương thức thêm voucher mới.
  addVoucher(request: Voucher): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, request);
  }

  // Phương thức cập nhật voucher theo ID.
  updateVoucher(id: number, request: Voucher): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, request); // Cập nhật voucher theo ID
  }

  // Phương thức xóa voucher theo ID.
  deleteVoucher(id: number): Observable<void> {
    const params = new HttpParams().set('id', id.toString()); // Truyền id qua query params
    return this.http.delete<void>(`${this.apiUrl}/delete`, { params: params });
  }
}
