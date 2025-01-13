import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, SubCategory } from '../Interface/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7249/api/admin/Category/';

  constructor(private http: HttpClient) {}

  // GET all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'get-all');
  }

  // GET category by ID
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}get-by-id/${categoryId}`);
  }

  // POST create new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + 'create', category);
  }

  // PUT update category
  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}update/${categoryId}`, category);
  }

  // DELETE category
  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}delete/${categoryId}`);
  }

  getCategoryByProductId(productId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}get-category-by-product-id?productId=${productId}`);
  }
}
