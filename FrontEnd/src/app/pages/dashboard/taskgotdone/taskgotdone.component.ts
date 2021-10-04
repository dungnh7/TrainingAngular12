import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskgotdone',
  templateUrl: './taskgotdone.component.html',
  styleUrls: ['./taskgotdone.component.css']
})
export class TaskgotdoneComponent implements OnInit {

  public displayDetailModel: boolean=false;
  private ngUnsubcribe = new Subject()
  public tasks : TaskModel[] =[];
  public TaskId : number =0;

  constructor(private taskService:TaskService ) { }

  
  ngOnInit(): void {
    this.taskService.getAllTasks(3).pipe(
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

  clickShowDetail(task : TaskModel){
    this.displayDetailModel=true;   
    this.TaskId=task.id
  }  

  hideDisplayDetailModelMethod(isHide : boolean){
    this.displayDetailModel= isHide;
  }
}

