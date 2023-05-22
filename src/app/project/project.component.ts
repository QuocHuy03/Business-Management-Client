import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any;
  nameProject: string = '';
  teamSize: string = '';
  dateOfStart: string = '';
  budget: string = '';
  status: string = '';

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  saveProject(create: boolean, edit: boolean, huydev: any) {
    if (create) {
      const data = {
        nameProject: this.nameProject,
        teamSize: this.teamSize,
        dateOfStart: this.dateOfStart,
        budget: this.budget,
        status: this.status,
      };
      this.projectService.add(data).subscribe(
        (response) => {
          this.toastr.success(`Thêm Project Thành Công`, 'Success');
          this.getProjects();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && huydev) {
      const data = {
        nameProject: huydev.nameProject,
        teamSize: huydev.teamSize,
        dateOfStart: huydev.dateOfStart,
        budget: huydev.budget,
        status: huydev.status,
      };
      this.projectService.update(huydev._id, data).subscribe(
        (response) => {
          this.toastr.success(`${response.message}`, 'Success');
          this.getProjects();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProject(id: any) {
    this.projectService.delete(id).subscribe(
      (response) => {
        this.toastr.success(`${response.message}`, 'Success');
        this.getProjects();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProjects() {
    this.projectService.get().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.nameProject = '';
    this.teamSize = '';
    this.dateOfStart = '';
    this.budget = '';
    this.status = '';
  }
}
