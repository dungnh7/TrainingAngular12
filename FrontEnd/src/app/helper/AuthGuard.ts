import {Injectable} from '@angular/core'
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';

import {AuthenticationService} from '../services/authentication.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router:Router,
        private authenticationService : AuthenticationService,
        private jwtHelper: JwtHelperService
    ) {}

    canActivate(router:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const concurrentMember = this.authenticationService.currentMemberValue;
        if(concurrentMember){
            if(!this.jwtHelper.isTokenExpired(concurrentMember.token)){
                return true;
            }else{
                this.authenticationService.logout();
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}