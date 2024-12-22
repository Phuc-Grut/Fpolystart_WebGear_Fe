import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private apiUrl = 'https://localhost:7249/api/admin/KeyBoard/';

  constructor(private http: HttpClient) {}

  // GET all keyboard details
  getKeyboards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'get-all');
  }

  // GET keyboard by ID
  getKeyboardById(keyboardId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get-by-id/${keyboardId}`);
  }

  // POST create new keyboard
  createKeyboard(keyboard: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create', keyboard);
  }

  // PUT update keyboard
  updateKeyboard(keyboardId: number, keyboard: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${keyboardId}`, keyboard);
  }

  // DELETE keyboard
  deleteKeyboard(keyboardId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${keyboardId}`);
  }
}
