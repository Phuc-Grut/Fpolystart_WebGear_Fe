import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  showModalAdd: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const apiUrl = 'https://localhost:7249/api/admin/Account/get-all';
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        // Assuming the API returns an object with "users" array
        this.users = response.users.map((user: any) => ({
          id: user.userID,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          userName: user.userName,
          createdAt: new Date(user.createdTime),
          role: user.roleId === 1 ? 'Quản Trị Viên' : 'Khách Hàng',
          isActive: user.status === 1
        }));
      },
      (error) => {
        console.error('Failed to fetch users', error);
      }
    );
  }

  editUser(userId: number) {
    this.router.navigate([`edit-users/${userId}`]);
  }

  openModalAdd() {
    this.showModalAdd = true;
  }

  closeModalAdd() {
    this.showModalAdd = false;
  }
}
