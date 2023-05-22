import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalAllUsers: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        this.totalAllUsers = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
