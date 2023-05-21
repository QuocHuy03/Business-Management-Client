import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  projects: any;
  tasks: any;

  taskName: string = '';
  description: string = '';
  idProject: string = '';
  assignedTo: string = '';
  priority: string = '';
  status: string = '';

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTask();
    this.getProjects();
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

  getTask() {
    this.taskService.get().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveTask(create: boolean, edit: boolean, huydev: any) {
    if (create) {
      const data = {
        idProject: this.idProject,
        taskName: this.taskName,
        description: this.description,
        assignedTo: this.assignedTo,
        priority: this.priority,
        status: this.status,
      };
      this.taskService.add(data).subscribe(
        (response) => {
          this.toastr.success(`${response.message}`, 'Success');
          this.getTask();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && huydev) {
      const data = {
        idProject: huydev.idProject._id,
        taskName: huydev.taskName,
        description: huydev.description,
        assignedTo: huydev.assignedTo,
        priority: huydev.priority,
        status: huydev.status,
      };
      this.taskService.update(huydev._id, data).subscribe(
        (response) => {
          this.toastr.success(`${response.message}`, 'Success');
          this.getTask();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteTask(id: any) {
    this.taskService.delete(id).subscribe(
      (response) => {
        this.toastr.success(`${response.message}`, 'Success');
        this.getTask();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.idProject = '';
    this.taskName = '';
    this.description = '';
    this.assignedTo = '';
    this.priority = '';
    this.status = '';
  }
}
