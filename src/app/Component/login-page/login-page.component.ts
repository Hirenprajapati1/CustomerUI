import { HelperService } from './../../Services/helper.service';
import { NavbarService } from './../../Services/navbar.service';
import { AuthenticationService } from './../../Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  
  form = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })

  userName:string;
  password:string;
  formModel = {
    username: '',
    password: ''
  }
  flag:boolean;
  flag1:boolean;
  constructor(private toastr:ToastrService,private route: ActivatedRoute,private router: Router,
    private service:AuthenticationService,public nav: NavbarService 
    , public helper: HelperService) {
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

  onSubmit() {
  if(this.formModel.username.trim()=="")
  {
    this.toastr.warning('UserName name is Requried');
  }
  else
      {
      this.service.AdminLogin(this.formModel).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('firstName', res.firstName);
          localStorage.setItem('lastName', res.lastName);
          localStorage.setItem('gender', res.gender);
          localStorage.setItem('region', res.region);
          localStorage.setItem('userType', res.userType);
          
          this.toastr.success("login Successfully");
          this.nav.show(); 
          this.gotDashBoard();
          if(res.userType == "Admin")
          {
            this.helper.Admintype=true;
            this.helper.Opretortype= false;
          }else if(res.userType == "Operator"){
            this.helper.Admintype=false;
            this.helper.Opretortype= true;
          }else{
            this.helper.Admintype=false;
            this.helper.Opretortype= false;
          }
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
