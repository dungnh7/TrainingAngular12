import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/helper/PendingChangesGuard';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,ComponentCanDeactivate  {
  private ngUnsubcribe = new Subject()
  public maxId : number=0;
  public users : UserModel[] =[];
  public displayScheduleModel: boolean=false;
  public UserId :number=0;
  public editItem : UserModel = new UserModel();//cần model của user ở dây, k thể type any
  public oldItem : UserModel = new UserModel();
  public userschedule :  UserModel = new UserModel();

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if(this.editItem.name != '' || this.users.find(x=>x.id ==0) != undefined){
      return false;
    }
    return true;
  }

  constructor(private userService: UserService,private route: ActivatedRoute) {   }

  ngOnInit(): void {
    //this.LoadUser();
    this.users = this.route.snapshot.data['users'].items;
  }

  LoadUser(){
    this.userService.getAllUsers()
    .pipe(takeUntil(this.ngUnsubcribe)
    ).subscribe((response:any) =>{
      this.users= response.items;
    })
  }
  
  addUser(){
    var addItem =new UserModel() ;
    this.users.push(addItem);
    this.editItem= addItem;
  }

  saveUser(item: UserModel){
    if(item.id == 0 || item.id === undefined)
    {
      this.userService.addNewUser(item).pipe(takeUntil(this.ngUnsubcribe))
      .subscribe((response:any) =>{
        this.LoadUser();
      })
    }
    else{
      this.userService.updateUser(item,item.id).pipe(takeUntil(this.ngUnsubcribe))
      .subscribe((response:any) =>{
        this.LoadUser();
      })
    }
    this.editItem= new UserModel();
  }

  editUser(item: UserModel){
    if(this.users.find(x=>x.id ==0) != undefined)
    {
      this.users.splice(-1);
    }
    this.editItem = item;
    Object.assign(this.oldItem, item);
  }
  
  cancelUser(item: UserModel, i:number){
    if(item.id == 0){
      this.users.splice(-1);
    }else{
      this.users[i]=this.oldItem;
      this.editItem= new UserModel();
      this.oldItem= new UserModel();
    }
  }

  trackByFn(index : number, item : UserModel) {
    return item.id;
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  
  clickShowSchedule(item : UserModel){
    this.userschedule = item;
    this.displayScheduleModel=true;
    this.UserId = item.id;
}  

  hideDisplayScheduleModelMethod(item:UserModel,isHide : boolean){
    this.displayScheduleModel= isHide;
    this.userschedule= new UserModel();
  }

  deleteUser(item: UserModel){
    Swal.fire({
      position: 'top',
      title: 'Are you sure want to delete '+item.name+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        if(item.id === 0)
        {
          this.users.splice(-1);
        }else{
          this.userService.deleteUser(item.id).pipe(takeUntil(this.ngUnsubcribe)).subscribe((response:any)=>{
            this.LoadUser();
          })
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {       
      }
    })
  }
}
