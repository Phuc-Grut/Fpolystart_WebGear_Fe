import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7249/api/Orders'
  constructor(private http: HttpClient) { }
  // Lấy danh sách đơn hàng
  getAllOrder(request?: any): Observable<any> {
    let params = new HttpParams();
    if (request) {
      Object.keys(request).forEach(key => {
        if (request[key] !== null && request[key] !== undefined) {
          params = params.append(key, request[key]);
        }
      });
    } 
    // Gửi yêu cầu GET với các tham số
    return this.http.get(`${this.apiUrl}/get-all-order`, { params: params });
  }
  
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);  // Sử dụng định dạng đường dẫn đúng
  }
  
  

  // Cập nhật thông tin đơn hàng
  updateOrder(orderId: string, order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, order);
  }
}