import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  nameProject: string = '';
  teamSize: string = '';
  dateOfStart: string = '';

  constructor(private projectService: ProjectService) {}

  addProject() {
    const data = {
      nameProject: this.nameProject,
      teamSize: this.teamSize,
      dateOfStart: this.dateOfStart,
    };
    this.projectService.add(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
