import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskgotdonedetail',
  templateUrl: './taskgotdonedetail.component.html',
  styleUrls: ['./taskgotdonedetail.component.css']
})
export class TaskgotdonedetailComponent implements OnInit, OnDestroy , OnChanges  {
  @Input() displayDetailModel : boolean =false;
  @Input() TaskId : number =0;
  @Output() hideDisplayDetailModel = new EventEmitter<boolean>();
  private ngUnsubcribe = new Subject()
  public taskDetail : any;

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {   
  }
  
  ngOnChanges( changes: {[propName:string]:SimpleChange}): void {

    this.taskService.getTaskDetail(this.TaskId).pipe(
      takeUntil(this.ngUnsubcribe)
    ).subscribe((Response : any) => {
      this.taskDetail= Response;
    });
  }

  clickHideDetail(){
    this.hideDisplayDetailModel.emit(false);
  }  

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
}
