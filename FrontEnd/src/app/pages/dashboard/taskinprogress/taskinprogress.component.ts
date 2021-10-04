import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskinprogress',
  templateUrl: './taskinprogress.component.html',
  styleUrls: ['./taskinprogress.component.css']
})
export class TaskinprogressComponent implements OnInit {
  private ngUnsubcribe = new Subject()
  public tasks : TaskModel[] =[];

  constructor(private taskService:TaskService ) { }

  
  ngOnInit(): void {
    this.taskService.getAllTasks(2).pipe(
      takeUntil(this.ngUnsubcribe)
    ).subscribe((Response :any) =>{
      this.tasks= Response.items;
    })    
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  
  trackByFn(index : any, task : TaskModel) {
    return task.id;
  }
}
