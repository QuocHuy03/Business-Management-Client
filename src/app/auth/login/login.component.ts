import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { ApiAccessTokenService } from 'src/app/helper/api-access-token.service';
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
    private apiAccessTokenService: ApiAccessTokenService,
    private router: Router
  ) {}

  
  // loginUser() {
  //   const userData = { username: this.username, password: this.password };
  //   this.authService.login(userData).subscribe(
  //     (response) => {
  //       if (response.status === true) {
  //         this.toastr.success(`${response.message}`, 'Success');
  //         localStorage.setItem('accessToken', response.accessToken);
  //         this.apiAccessTokenService.get().subscribe(
  //           (response) => {
  //             localStorage.setItem('level', response.level);
  //             this.authService.setLevel(response.level);
  //           },
  //           (error) => {
  //             console.log(error);
  //           }
  //         );
  //         this.router.navigate(['project']);
  //       } else {
  //         this.toastr.error(`${response.message}`, 'Error');
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  loginUser() {
    const userData = { username: this.username, password: this.password };
    this.authService
      .login(userData)
      .pipe(
        switchMap((response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
            localStorage.setItem('accessToken', response.accessToken);
            return this.apiAccessTokenService.get().pipe(
              tap((response) => {
                localStorage.setItem('level', response.level);
                this.authService.setLevel(response.level);
                if (response.level === 'employee') {
                  this.router.navigateByUrl('/task');
                } else if (response.level === 'leader') {
                  this.router.navigateByUrl('/');
                } else {
                  this.router.navigate(['access-denied']);
                }
              })
            );
          } else {
            this.toastr.error(`${response.message}`, 'Error');
            throw new Error('Login failed');
          }
        })
      )
      .subscribe(
        () => {
          console.log('Lê Quốc Huy');
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
