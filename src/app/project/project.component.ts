import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  saveProject(create: boolean, edit: boolean, huydev: any) {
    if (create) {
      const data = {
        nameProject: this.nameProject,
        teamSize: this.teamSize,
        dateOfStart: this.dateOfStart,
      };
      this.projectService.add(data).subscribe(
        (response) => {
          this.getProjects();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && huydev) {
      // Chỉnh sửa dự án
      const data = {
        nameProject: huydev.nameProject,
        teamSize: huydev.teamSize,
        dateOfStart: huydev.dateOfStart,
      };
      console.log(data);
      // Tiến hành gọi service để cập nhật dự án với dữ liệu mới
      // this.projectService.update(this.editedProject._id, data).subscribe(
      //   (response) => {
      //     this.getProjects();
      //     // Các tác động khác sau khi cập nhật thành công
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    }
  }

  getProjects() {
    this.projectService.get().subscribe(
      (response) => {
        console.log(response);
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
  }
}
