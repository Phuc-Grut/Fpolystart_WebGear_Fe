import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private host = 'https://provinces.open-api.vn/api/';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(`${this.host}?depth=1`);
  }

  getDistricts(provinceId: string): Observable<any> {
    return this.http.get(`${this.host}p/${provinceId}?depth=2`);
  }

  getWards(districtId: string): Observable<any> {
    return this.http.get(`${this.host}d/${districtId}?depth=2`);
  }
}