import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/authentication.service';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  public error:string ='';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) {
      const concurrentMember = this.authenticationService.currentMemberValue;
      if(concurrentMember){
          this.router.navigate(['']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      var loginModel = new LoginModel(
          this.f.email.value,
          this.f.password.value
      )
      this.authenticationService.login(loginModel)
          .pipe(first())
          .subscribe(
              data => {               
                  this.router.navigate(['/dashboard']);
              },
              error => {
                this.error=error;
                  this.loading = false;
              });
  }
}
