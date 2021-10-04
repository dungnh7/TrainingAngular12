import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterModel } from 'src/app/models/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  public error :string ='';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) { 
      if (this.authenticationService.currentMemberValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
      var registerModel = new RegisterModel(
          0,
        this.f.name.value,
        this.f.email.value,
        this.f.password.value,
    )
      this.loading = true;
      this.authenticationService.register(registerModel)
          .pipe(first())
          .subscribe(
              data => {
                Swal.fire('')
                
                    Swal.fire({
                      position: 'top',
                      title: 'Register member successfully',
                      showCancelButton: false,
                      confirmButtonText: 'Login',
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/login']);
                      } 
                    })
              },
              error => {
                this.error=error;
                  this.loading = false;
              });
            }
  }