import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  area: string = '';
  password: string = '';
  isLoading: boolean = false;

  areas: any;

  constructor(
    private authService: AuthService,
    private areaService: AreaService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArea();
  }

  getArea() {
    this.areaService.get().subscribe(
      (response) => {
        this.areas = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser() {
    this.isLoading = true;
    const userData = {
      username: this.username,
      email: this.email,
      area: this.area,
      password: this.password,
    };
    this.authService.register(userData).subscribe(
      (response) => {
        if (response.status === true) {
          this.isLoading = false;
          this.toastr.success(`${response.message}`, 'Success');
          this.router.navigate(['/login']);
        } else {
          this.isLoading = false;
          this.toastr.error(`${response.message}`, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
