import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view-newtask',
  templateUrl: './view-newtask.component.html',
  styleUrls: ['./view-newtask.component.css']
})
export class ViewNewtaskComponent implements OnInit {
  private ngUnsubcribe = new Subject()
  public taskDetail =new TaskModel();
  public showEditTask: boolean=false;

  constructor( private route: ActivatedRoute,private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnsubcribe))
    .subscribe(params => {
            var taskId = params['taskid'];
            this.taskService.getTaskDetail(taskId).pipe(
                    takeUntil(this.ngUnsubcribe)
                  ).subscribe((Response : any) => {
                    this.taskDetail= Response;
                  });
    });
  }

  editTask(){
    this.showEditTask=true;
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }

}
