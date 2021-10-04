import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable(
   {providedIn: 'root'}
)
export class UserService {
  private pageIndex : number=1;

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/Users?pageIndex=${this.pageIndex}`);
  }

  getScheduleOfUser(Id :number) : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/Users/userschedule?userId=${Id}`);
  }

  getUserDetail(Id : number) : Observable<UserModel>{
    return this.http.get<UserModel>(`${environment.apiUrl}/api/Users/${Id}`);
  }

  addNewUser(User:UserModel){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(User);
    return this.http.post(`${environment.apiUrl}/api/Users`,body, httpOptions);
  }

  updateUser(User:UserModel, Id : number){
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(User);
    return this.http.put(`${environment.apiUrl}/api/Users/${Id}`,body, httpOptions);
  }

  deleteUser(Id:number){
    return this.http.delete<any>(`${environment.apiUrl}/api/Users/${Id}`);
  }
}