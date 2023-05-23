import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

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
  lengthTaskProcessing: any;
  totalReducerProject: any;

  filterMembersEast: any;
  filterMembersWest: any;
  filterMembersSouth: any;
  filterMembersNorth: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
    this.getAllTasks();
  }

  getAllUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        // console.log(response)
        this.totalAllUsers = response.length;
        this.filterMembersEast = response.filter((huyne: any) => huyne.area.nameArea === "East");
        this.filterMembersWest = response.filter((huyne: any) => huyne.area.nameArea === "West");
        this.filterMembersSouth = response.filter((huyne: any) => huyne.area.nameArea === "South");
        this.filterMembersNorth = response.filter((huyne: any) => huyne.area.nameArea === "North");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllTasks() {
    this.taskService.get().subscribe(
      (response) => {
        // console.log(response)
        this.lengthTaskProcessing = response.filter((huyne: any) => huyne.status === "processing").length;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  getAllProjects() {
    this.projectService.get().subscribe(
      (response) => {
        // console.log(response);
        this.lengthProjectDeployment = response.filter((huyne: any) => huyne.status === "deployment").length;
        this.totalReducerProject = response.reduce((total: any, item: any) => 
          total + parseInt(item.budget), 0
        );

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
    // console.log(selectedValue);
    this.getSelectedProjects(selectedValue);
  }
}
