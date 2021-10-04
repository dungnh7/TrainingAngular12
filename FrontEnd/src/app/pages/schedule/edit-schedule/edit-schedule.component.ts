import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { UserModel } from 'src/app/models/user.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
public editSchedule = new ScheduleModel();
public scheduleId : number =0;
private ngUnsubcribe = new Subject()
public locations = ['HCM', 'HN', 'Da Nang', 'London', 'Tokyo'];
public users : UserModel[] =[];

guestForm: FormGroup;
constructor(private userService:UserService, private scheduleService:ScheduleService,
  private location: Location,private router:Router,private  route: ActivatedRoute){
}

ngOnInit() {
  this.loadUser();

  this.route.params.pipe(takeUntil(this.ngUnsubcribe)).subscribe(params=>{
    this.scheduleId =  params['scheduleid'];
    this.scheduleService.getScheduleDetail(this.scheduleId).pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any) =>{
      this.editSchedule = response;
    })
  }) 
}

  loadUser(){
    this.userService.getAllUsers().pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any)=>{
      this.users=response.items;
    })
  }

  updateSchedule(){
    this.scheduleService.updateSchedule(this.editSchedule,this.scheduleId).pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any)=>{      
      console.log(response);
      this.router.navigate(['/schedule']);
    })
  }

  backClicked(){
    this.location.back();
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
}