import { Injectable } from '@angular/core';
import { 
    Resolve, 
    ActivatedRouteSnapshot,RouterStateSnapshot, 
    Router 
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
 
@Injectable()
export class ResolveGuardUser implements Resolve<any>{
 
    constructor(
        private _router:Router , 
        private userService:UserService ) {
    }
 
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
        
        return this.userService.getAllUsers().pipe(first());
    }
}
 