import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable(
   {providedIn: 'root'}
)
export class TaskService {
  private pageIndex : number=1;

  constructor(private http : HttpClient) { }

  getAllTasks(statusId : number) : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/tasks?pageIndex=${this.pageIndex}&status=${statusId}`);
  }

  getTaskDetail(Id : number) : Observable<TaskModel>{
    return this.http.get<TaskModel>(`${environment.apiUrl}/api/tasks/${Id}`);
  }

  addNewTask(task:TaskModel){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(task);
    return this.http.post(`${environment.apiUrl}/api/tasks`,body, httpOptions);
  }

  updateTask(task:TaskModel, Id : number){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(task);
    return this.http.put(`${environment.apiUrl}/api/tasks/${Id}`,body, httpOptions);
  }

  deleteTask(Id:number){
    return this.http.delete<any>(`${environment.apiUrl}/api/tasks/${Id}`);
  }
}