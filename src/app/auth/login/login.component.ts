import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  loginUser() {
    const userData = { username: this.username, password: this.password };
    this.authService.login(userData).subscribe(
      (response) => {
        if (response.status === true) {
          this.toastr.success(`${response.message}`, 'Success');
          localStorage.setItem('accessToken', response.accessToken);
          this.authService.setIsLoggedIn(true);
          this.router.navigate(['project']);
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
