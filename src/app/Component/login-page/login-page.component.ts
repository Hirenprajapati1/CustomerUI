import { NavbarService } from './../../Services/navbar.service';
import { AuthenticationService } from './../../Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userName:string;
  password:string;
  formModel = {
    username: '',
    password: ''
  }
  flag:boolean;
  flag1:boolean;
  constructor(private toastr:ToastrService,private route: ActivatedRoute,private router: Router,
    private service:AuthenticationService,public nav: NavbarService ) {
      this.nav.hide();
     }

  ngOnInit(): void {  
    if (localStorage.getItem('token') != null)
    this.router.navigate(["/ListReport"]);    

  }

  // Login(){
  //   this.onSubmit();
  //   this.removeNav();
  // }
  gotoRegistration(){
    this.router.navigate(["/Registration"]);    
  }

  onSubmit(form: NgForm) {
    this.flag1=true;
    if((this.formModel.username == "" ||this.formModel.username == undefined || this.formModel.username.trim() == ""   )&&(this.formModel.password == "" ||this.formModel.password == undefined || this.formModel.password.trim() == ""))
    {
      this.toastr.warning('User Name And Password are Requried','Requried Field!.');   
      this.flag1=false;
    }
    else
      {
        if(this.formModel.username == "" ||this.formModel.username == undefined || this.formModel.username.trim() == ""   )
        {
          this.toastr.warning('User Name is Requried','Requried Field!.');   
          this.flag1=false;
        }
        else if(this.formModel.password == "" ||this.formModel.password == undefined || this.formModel.password.trim() == "")
        {
          this.toastr.warning('Password is Requried','Requried Field!.');   
          this.flag1=false;
        }
      }
      if(this.flag1==true)
      {
      this.service.AdminLogin(form.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('firstName', res.firstName);
          localStorage.setItem('lastName', res.lastName);
          localStorage.setItem('gender', res.gender);
          localStorage.setItem('region', res.region);
          this.toastr.success("login Successfully");
          this.nav.show(); 
          this.gotDashBoard();
          // this.gotoList();
          // this.router.navigateByUrl('/home');
        },
        err => {
          if (err.status == 400)
            this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          else
            this.toastr.error('error');
            console.log(err);
        }
      );
    }
    flag2:true;
        
 //   this.removeNav();
  }

  // removeNav()
  // {
  //   this.flag=true;
  //   var token = localStorage.getItem('token');
  //   if(typeof token === 'undefined' || token === null || token === 'undefined')
  //   {
  //     this.flag=false;
  //   }
  // }

  gotDashBoard() {
    this.router.navigate(["/DashBoard"]);    
  }
   
}
