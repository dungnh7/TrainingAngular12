import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userschedule',
  templateUrl: './userschedule.component.html',
  styleUrls: ['./userschedule.component.css']
})
export class UserscheduleComponent implements OnInit, OnChanges {
  @Input() displayScheduleModel : boolean =false;
  @Input() UserId:number=0;
  @Output() hideDisplayScheduleModel = new EventEmitter<boolean>();
  private ngUnsubcribe = new Subject();
  public userschedule : ScheduleModel[]=[];
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {  
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.getScheduleOfUser(this.UserId).pipe(takeUntil(this.ngUnsubcribe))
    .subscribe((response:any)=>{
      this.userschedule = response
    })
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }

  clickHideSchedule(){
    this.hideDisplayScheduleModel.emit(false);
  }  
}