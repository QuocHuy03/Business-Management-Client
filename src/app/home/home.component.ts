import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalAllUsers: any[] = [];
  listAllProjects: any;
  listIDProject: any;
  lengthProjectDeployment: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
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



  getAllProjects() {
    this.projectService.get().subscribe(
      (response) => {
        console.log(response);
        this.lengthProjectDeployment =response.filter((huyne: any) => huyne.status === "deployment").length;
        this.listAllProjects = response;
        const selectedValue = this.listAllProjects[0]._id;
        this.getSelectedProjects(selectedValue);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSelectedProjects(selectedValue: any) {
    this.projectService.getSelect(selectedValue).subscribe(
      (response) => {
        this.listIDProject = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onProjectChange(event: any) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    this.getSelectedProjects(selectedValue);
  }
}
