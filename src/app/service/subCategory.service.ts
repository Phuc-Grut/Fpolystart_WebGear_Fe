import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, SubCategory } from '../Interface/ICategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private apiUrl = 'https://localhost:7249/api/admin/SubCategory/';

  constructor(private http: HttpClient) {}

  // GET all categories
  getAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.apiUrl + 'get-all');
  }
}
