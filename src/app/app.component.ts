import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  title = 'Home';
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
