import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7249/api/admin/Category/';

  constructor(private http: HttpClient) {}

  // GET all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'get-all');
  }

  // GET category by ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get-by-id/${categoryId}`);
  }

  // POST create new category
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create', category);
  }

  // PUT update category
  updateCategory(categoryId: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${categoryId}`, category);
  }

  // DELETE category
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${categoryId}`);
  }
}
