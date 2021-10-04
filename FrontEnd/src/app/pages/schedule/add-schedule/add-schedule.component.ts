import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { UserModel } from 'src/app/models/user.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
public newSchedule = new ScheduleModel();
private ngUnsubcribe = new Subject()
public locations = ['HCM', 'HN', 'Da Nang', 'London', 'Tokyo'];
public users : UserModel[] =[];

guestForm: FormGroup;
constructor(private userService:UserService, private scheduleService:ScheduleService,
  private location: Location,private router: Router, ){
}

ngOnInit() {
  this.loadUser();
}

  loadUser(){
    this.userService.getAllUsers().pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any)=>{
      this.users=response.items;
    })
  }

  AddSchedule(){
    this.scheduleService.addNewSchedule(this.newSchedule).pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any)=>{
      this.router.navigate(['/schedule']);
      console.log(response);
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