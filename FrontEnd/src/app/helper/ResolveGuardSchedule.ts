import { Injectable } from '@angular/core';
import { 
    Resolve, 
    ActivatedRouteSnapshot,RouterStateSnapshot, 
    Router 
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { ScheduleService } from '../services/schedule.service';
 
@Injectable()
export class ResolveGuardSchedule implements Resolve<any>{
 
    constructor(
        private _router:Router , 
        private scheduleService: ScheduleService ) {
    }
 
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
        
        return this.scheduleService.getAllSchedules().pipe(first());
    }
}
 