import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  isLoggedIn$: Observable<MemberModel|null>;
  constructor(private authenticationService:AuthenticationService, private router:Router) {   }

  ngOnInit(): void { 
      this.isLoggedIn$ = this.authenticationService.currentMember;
   }

   logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
