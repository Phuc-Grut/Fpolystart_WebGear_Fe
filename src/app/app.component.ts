import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSignIn = true;

  toggleForm(form: string) {
    this.showSignIn = form === 'login';
  }
}


