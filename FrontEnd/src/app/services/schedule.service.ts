import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleModel } from '../models/schedule.model';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable(
   {providedIn: 'root'}
)
export class ScheduleService {
  private pageIndex : number=1;

  constructor(private http : HttpClient) { }

  getAllSchedules() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/Schedules?pageIndex=${this.pageIndex}`);
  }

  getScheduleDetail(Id : number) : Observable<ScheduleModel>{
    return this.http.get<ScheduleModel>(`${environment.apiUrl}/api/Schedules/${Id}`);
  }

  addNewSchedule(Schedule:ScheduleModel){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(Schedule);
    return this.http.post(`${environment.apiUrl}/api/Schedules`,body, httpOptions);
  }

  updateSchedule(Schedule:ScheduleModel, Id : number){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(Schedule);
    return this.http.put(`${environment.apiUrl}/api/Schedules/${Id}`,body, httpOptions);
  }

  deleteSchedule(Id:number){
    return this.http.delete<any>(`${environment.apiUrl}/api/Schedules/${Id}`);
  }
}