import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-newtask',
  templateUrl: './edit-newtask.component.html',
  styleUrls: ['./edit-newtask.component.css']
})
export class EditNewtaskComponent implements OnInit {
  private ngUnsubcribe = new Subject()
  @Input() taskDetail = new TaskModel();


  constructor(private taskService:TaskService,
    private location: Location,
    private router: Router ) { }

  ngOnInit(): void {
    console.log(this.taskDetail)
  }

  updateTask()
  {
    this.taskDetail.statusId = this.taskDetail.statusId==='New' ? "1" : (this.taskDetail.statusId==='Done' ? "3" : "2")
    this.taskDetail.userId = '1';//hard code

    this.taskService.updateTask(this.taskDetail, this.taskDetail.id).pipe(
      takeUntil(this.ngUnsubcribe)
    ).subscribe((response:any) =>{
      this.router.navigate(['/dashboard']);
      console.log(response);
    })
  }

  confirmBox(title: string, id :any){
    Swal.fire({
      position: 'top',
      title: 'Are you sure want to delete '+title+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(id).pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any) =>{
          this.router.navigate(['/dashboard']);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {       
      }
    })
  }

  backClicked() {
    this.location.back();
  }
  
  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  
}


