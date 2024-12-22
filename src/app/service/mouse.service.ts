import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouseService {
  private apiUrl = 'https://localhost:7249/api/admin/Mouse/';

  constructor(private http: HttpClient) {}

  // GET all mouse details
  getMice(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'get-all');
  }

  // GET mouse by ID
  getMouseById(mouseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get-by-id/${mouseId}`);
  }

  // POST create new mouse
  createMouse(mouse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create', mouse);
  }

  // PUT update mouse
  updateMouse(mouseId: number, mouse: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${mouseId}`, mouse);
  }

  // DELETE mouse
  deleteMouse(mouseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${mouseId}`);
  }
}
