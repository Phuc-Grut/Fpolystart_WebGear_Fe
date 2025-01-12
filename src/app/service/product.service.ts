import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
interface Product {
  productID: number;
  saleID: number;
  brandID: number;
  subCategoryID: number;
  subCategoryName: string;
  brandName: string;
  saleCode: string;
  productName: string;
  price: number;
  view: number;
  quantity: number;
  weight: number;
  description: string;
  size: string;
  batteryCapacity: string | null;
  avatarProduct: string;
  imageProduct: string[];
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7249/api/admin/Product';  // URL của API C#

  constructor(private http: HttpClient) {}
  // Lấy danh sách sản phẩm
  getAllProducts(request?: any): Observable<any> {
    // Khởi tạo HttpParams nếu có request
    let params = new HttpParams();

    // Nếu có tham số request, thêm chúng vào params
    if (request) {
      Object.keys(request).forEach(key => {
        if (request[key] !== null && request[key] !== undefined) {
          params = params.set(key, request[key]);
        }
      });
    }

    // Gọi API với HttpClient và tham số query
    return this.http.get(`${this.apiUrl}/get-all`, { params: params });
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-by-id?id=${id}`);
  }
  

  // Tạo mới sản phẩm
  // createProduct(request: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/create`, request);
  // }

  // // Cập nhật sản phẩm
  // updateProduct(id: number, request: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/update`, request, {
  //     params: { id: id.toString() }
  //   });
  // }
  

  // // Xóa sản phẩm
  // deleteProduct(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/delete`, { params: { id: id.toString() } });
  // }
  // private apiUrlKeyboards = 'https://localhost:7249/api/admin/KeyBoard/get-all'; 
  // private apiUrlMice = 'https://localhost:7249/api/admin/Mouse/get-all';

  // constructor(private http: HttpClient) {}

  // getAllProducts(keyboardRequest: any, mouseRequest: any): Observable<any> {
  //   let keyboardParams = new HttpParams();
  //   if (keyboardRequest) {
  //     keyboardParams = keyboardParams.append('keyboardRequest.page', keyboardRequest.page);
  //   }

  //   let mouseParams = new HttpParams();
  //   if (mouseRequest) {
  //     mouseParams = mouseParams.append('mouseRequest.page', mouseRequest.page);
  //   }

  //   const keyboardsRequest = this.http.get<any>(this.apiUrlKeyboards, { params: keyboardParams });
  //   const miceRequest = this.http.get<any>(this.apiUrlMice, { params: mouseParams });

  //   return forkJoin([keyboardsRequest, miceRequest]);
  // }
}

