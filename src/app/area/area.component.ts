import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  areas: any;
  nameArea: string = '';

  constructor(
    private areaService: AreaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas() {
    this.areaService.get().subscribe(
      (response) => {
        this.areas = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveArea(create: boolean, edit: boolean, huydev: any) {
    if (create) {
      const data = {
        nameArea: this.nameArea,
      };
      this.areaService.add(data).subscribe(
        (response) => {
          this.toastr.success(`Thêm Khu Vực Thành Công`, 'Success');
          this.getAreas();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && huydev) {
      const data = {
        nameArea: huydev.nameArea,
      };
      this.areaService.update(huydev._id, data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getAreas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteArea(id: any) {
    this.areaService.delete(id).subscribe(
      (response) => {
        if (response === true) {
          this.toastr.success(`${response.message}`, 'Success');
        } else {
          this.toastr.error(`${response.message}`, 'Error');
        }
        this.getAreas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.nameArea = '';
  }
}
