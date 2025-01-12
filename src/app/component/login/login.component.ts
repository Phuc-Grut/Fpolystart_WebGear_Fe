import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  refreshToken: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<LoginResponse>('https://localhost:7249/api/Login/login', this.credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        alert('Đăng nhập thành công!');
        this.router.navigate(['app-user-home']);
      }, error => {
        console.error(error);
        alert('Đăng nhập thất bại.');
      });
  }
}
