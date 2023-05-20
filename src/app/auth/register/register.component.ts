import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  registerUser() {
    const userData = { username: this.username, password: this.password };
    this.authService.register(userData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
