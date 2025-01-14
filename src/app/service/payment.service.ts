
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:7249/api/Payment/create-payment-url'; // URL API trực tiếp

  constructor(private http: HttpClient) {}

  createPayment(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error creating payment:', error);
        return throwError(() => new Error('Something went wrong with the payment API.'));
      })
    );
  }
}
