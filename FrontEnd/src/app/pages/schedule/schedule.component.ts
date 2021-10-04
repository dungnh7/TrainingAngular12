import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public editScheduleModel = new ScheduleModel();
  private ngUnsubcribe = new Subject()
  public schedules : ScheduleModel[] =[];

  constructor(private ScheduleService:ScheduleService, private router:Router,private route: ActivatedRoute ) { }

  
  ngOnInit(): void {
    this.schedules = this.route.snapshot.data['schedules'].items;
  }

  loadSchedule(){
    this.ScheduleService.getAllSchedules().pipe(
      takeUntil(this.ngUnsubcribe)
    ).subscribe((Response :any) =>{
      this.schedules= Response.items;
    })    
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  
  editSchedule(item:ScheduleModel){
    this.router.navigate(['/schedule/edit-schedule/'+item.id]);
  }


  deleteSchedule(item:ScheduleModel){
    Swal.fire({
      position: 'top',
      title: 'Are you sure want to delete '+item.title+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {       
        this.ScheduleService.deleteSchedule(item.id).pipe(
          takeUntil(this.ngUnsubcribe)
        ).subscribe((Response :any) =>{
          this.loadSchedule();
        })    
      } else if (result.dismiss === Swal.DismissReason.cancel) {       
      }
    })
  }

  trackByFn(index : any, Schedule : ScheduleModel) {
    return Schedule.id;
  }
}
