import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable, throwError} from 'rxjs'
import {catchError,map,retry} from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { LoginModel } from '../models/login.model';
import { MemberModel } from '../models/member.model';
import { RegisterModel } from '../models/register.model';
import {UserModel} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentMemberSubject:BehaviorSubject<MemberModel|null>;
    public currentMember:Observable<MemberModel|null>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router:Router) { 
      this.currentMemberSubject = new BehaviorSubject<MemberModel|null>(JSON.parse(localStorage.getItem('currentMember') || JSON.stringify(localStorage.getItem('currentMember'))));
      this.currentMember= this.currentMemberSubject.asObservable();
  }

  login(loginModel :LoginModel) {
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(loginModel);
    return this.http.post<MemberModel>(`${environment.apiUrl}/api/login/login`, body, httpOptions)
        .pipe(map(user => {
            localStorage.setItem('currentMember', JSON.stringify(user));
            this.currentMemberSubject.next(user);
            return user;
        }));
}

  register(registerModel :RegisterModel) {
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
    }
    const body=JSON.stringify(registerModel);
    return this.http.post<MemberModel>(`${environment.apiUrl}/api/login/register`, body, httpOptions)
        .pipe(map(user => {
            // localStorage.setItem('currentMember', JSON.stringify(user));
            // this.currentMemberSubject.next(user);
            return user;
        }));
  }

logout() {
    localStorage.removeItem('currentMember');
    this.currentMemberSubject.next(null);
    this.router.navigate(['/login']);
}

public get currentMemberValue(): MemberModel | null {
  return this.currentMemberSubject?.value;    
}


}
