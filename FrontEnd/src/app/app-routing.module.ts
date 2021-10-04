import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/AuthGuard';
import { PendingChangesGuard } from './helper/PendingChangesGuard';
import { ResolveGuardSchedule } from './helper/ResolveGuardSchedule';
import { ResolveGuardUser } from './helper/ResolveGuardUser';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddNewtaskComponent } from './pages/dashboard/newtask/add-newtask/add-newtask.component';
import { EditNewtaskComponent } from './pages/dashboard/newtask/edit-newtask/edit-newtask.component';
import { ViewNewtaskComponent } from './pages/dashboard/newtask/view-newtask/view-newtask.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { AddScheduleComponent } from './pages/schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './pages/schedule/edit-schedule/edit-schedule.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { UserComponent } from './pages/user/user/user.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'user', component: UserComponent, 
                resolve: { users: ResolveGuardUser },
                canDeactivate: [PendingChangesGuard], 
                canActivate: [AuthGuard                
            ]},
  {path:'schedule', component: ScheduleComponent, resolve: { schedules: ResolveGuardSchedule }, canActivate: [AuthGuard]},
  {path:'schedule/add-schedule', component: AddScheduleComponent, canActivate: [AuthGuard]},
  {path:'schedule/edit-schedule/:scheduleid', component: EditScheduleComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard/add-newtask', component: AddNewtaskComponent, canActivate: [AuthGuard]},
  {path:'dashboard/view-newtask/:taskid', component: ViewNewtaskComponent, canActivate: [AuthGuard]},
  {path:'dashboard/edit-newtask', component: EditNewtaskComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }