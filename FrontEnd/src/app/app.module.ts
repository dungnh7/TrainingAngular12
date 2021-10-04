import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewtaskComponent } from './pages/dashboard/newtask/newtask.component';
import { TaskinprogressComponent } from './pages/dashboard/taskinprogress/taskinprogress.component';
import { TaskgotdoneComponent } from './pages/dashboard/taskgotdone/taskgotdone.component';
import { UserComponent } from './pages/user/user/user.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { LoginComponent } from './pages/login/login/login.component';
import { BannerComponent } from './pages/banner/banner.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddNewtaskComponent } from './pages/dashboard/newtask/add-newtask/add-newtask.component';
import { ViewNewtaskComponent } from './pages/dashboard/newtask/view-newtask/view-newtask.component';
import { EditNewtaskComponent } from './pages/dashboard/newtask/edit-newtask/edit-newtask.component';
import { TaskgotdonedetailComponent } from './pages/dashboard/taskgotdone/taskgotdonedetail/taskgotdonedetail.component';
import { UserscheduleComponent } from './pages/user/userschedule/userschedule.component';
import { JwtInterceptor } from './helper/jwt-interceptors';
import { HttpErrorInterceptor } from './helper/http-errors-interceptors';
import { AddScheduleComponent } from './pages/schedule/add-schedule/add-schedule.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { EditScheduleComponent } from './pages/schedule/edit-schedule/edit-schedule.component';
import { PendingChangesGuard } from './helper/PendingChangesGuard';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RegisterComponent } from './pages/login/register/register.component';
import { ResolveGuardUser } from './helper/ResolveGuardUser';
import { ResolveGuardSchedule } from './helper/ResolveGuardSchedule';

@NgModule({
  declarations: [
    AppComponent,
    NewtaskComponent,
    TaskinprogressComponent,
    TaskgotdoneComponent,
    UserComponent,
    ScheduleComponent,
    LoginComponent,
    BannerComponent,
    DashboardComponent,
    AddNewtaskComponent,
    ViewNewtaskComponent,
    EditNewtaskComponent,
    TaskgotdonedetailComponent,
    UserscheduleComponent,
    AddScheduleComponent,
    EditScheduleComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor, multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    PendingChangesGuard,
    ResolveGuardUser,
    ResolveGuardSchedule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }