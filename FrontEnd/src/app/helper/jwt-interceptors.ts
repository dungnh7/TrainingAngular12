import {Inject, Injectable} from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import {AuthenticationService} from '../services/authentication.service'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService : AuthenticationService,
                private jwtHelper: JwtHelperService) {}

    intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        const currentMember = this.authenticationService.currentMemberValue;
        if (currentMember) {
            if(!this.jwtHelper.isTokenExpired(currentMember.token))
            {
                request = request.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${currentMember.token}`
                    }
                });
            }
            else{
                this.authenticationService.logout();
            }   
        }
        return next.handle(request);
    }
}