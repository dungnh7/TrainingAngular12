import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-newtask',
  templateUrl: './add-newtask.component.html',
  styleUrls: ['./add-newtask.component.css']
})
export class AddNewtaskComponent implements OnInit {
  private ngUnsubcribe = new Subject()
  public newTask = new TaskModel();

  constructor(private taskService:TaskService,private router: Router,
    private location: Location ) {   }

  ngOnInit(): void {
    this.newTask.statusId="1";
  }

  AddTask(){
    this.newTask.userId = '1';//hard code
    this.taskService.addNewTask(this.newTask).pipe(
      takeUntil(this.ngUnsubcribe)
    ).subscribe((response:any) =>{
      this.router.navigate(['/dashboard/view-newtask/'+response.id]);
      console.log(response);
    })
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  
  backClicked() {
    this.location.back();
  }
}