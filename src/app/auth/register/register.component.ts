import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerUser() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.authService.register(userData).subscribe(
      (response) => {
        if (response.status === true) {
          this.toastr.success(`${response.message}`, 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(`${response.message}`, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
