import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    isDarkMode: boolean = false;
    searchQuery: string = '';
  
    ngOnInit() {
      // Lấy trạng thái từ LocalStorage
      const darkModePreference = localStorage.getItem('darkMode');
      this.isDarkMode = darkModePreference === 'true';
      document.body.classList.toggle('dark', this.isDarkMode);
      console.log('Initial dark mode state:', this.isDarkMode);
    }
  
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark', this.isDarkMode);
      // Lưu trạng thái vào LocalStorage
      localStorage.setItem('darkMode', this.isDarkMode.toString());
      console.log('Dark mode:', this.isDarkMode);
    }
  
    onSearch() {
      console.log('Searching for:', this.searchQuery);
    }
  
    ngAfterViewInit() {
      this.initializeMenu();
    }
  
    private initializeMenu() {
      const allSideMenu = document.querySelectorAll<HTMLAnchorElement>('.sidebar .side-menu.top li a');
  
      allSideMenu.forEach(item => {
          const li = item.parentElement as HTMLLIElement;
  
          item.addEventListener('click', (e: MouseEvent) => {
              e.preventDefault();
              allSideMenu.forEach(i => {
                  (i.parentElement as HTMLLIElement).classList.remove('active');
              });
              li.classList.add('active');
  
              const href = item.getAttribute('routerLink');
              if (href) {
                  // Xử lý chuyển trang (nếu cần thiết)
              }
          });
      });
  
      const menuBar = document.querySelector<HTMLElement>('.content nav .bx.bx-menu');
      const sidebar = document.querySelector<HTMLElement>('.sidebar');
      
      if (menuBar && sidebar) {
          menuBar.addEventListener('click', () => {
              // Không thay đổi chế độ ẩn/hiện của sidebar khi click vào menu
              // sidebar.classList.toggle('hide');  // Bỏ dòng này nếu không muốn ẩn sidebar
          });
      }
  
      const searchButton = document.querySelector<HTMLButtonElement>('.content nav form .form-input button');
      const searchForm = document.querySelector<HTMLFormElement>('.content nav form');
      
      if (searchButton && searchForm) {
          searchButton.addEventListener('click', (e: MouseEvent) => {
              if (window.innerWidth < 576) {
                  e.preventDefault();
                  searchForm.classList.toggle('show');
              }
          });
      }
  
      const logoutButton = document.querySelector<HTMLAnchorElement>('.logout');
      if (logoutButton) {
          logoutButton.addEventListener('click', (e: MouseEvent) => {
              e.preventDefault();
              window.location.href = 'user.html';
          });
      }
  
      const switchMode = document.getElementById('switch-mode') as HTMLInputElement;
      if (switchMode) {
          switchMode.addEventListener('change', () => this.toggleDarkMode());
      }
  
      if (window.innerWidth < 768 && sidebar) {
          // Sidebar sẽ không bị ẩn trên mobile nếu không muốn, bỏ phần này nếu muốn luôn hiển thị
          // sidebar.classList.add('hide');  
      }
  
      window.addEventListener('resize', () => {
          if (window.innerWidth > 576 && searchForm) {
              const searchButtonIcon = document.querySelector<HTMLButtonElement>('.content nav form .form-input button .bx');
              if (searchButtonIcon) {
                  searchButtonIcon.classList.replace('bx-x', 'bx-search');
              }
              searchForm.classList.remove('show');
          }
      });
    }  
}
