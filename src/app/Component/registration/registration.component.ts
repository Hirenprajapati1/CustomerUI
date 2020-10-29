import { NavbarService } from './../../Services/navbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AdminData } from './../../Class/AdminData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern(/^\S*$/)]),
    lastName: new FormControl('',[Validators.required, Validators.pattern(/^\S*$/)]),
    username: new FormControl('',[Validators.required, Validators.pattern(/^\S*$/)]),
    contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),  
    emailid: new FormControl('',[Validators.required, Validators.email]),
    gender: new FormControl('',Validators.required),
    password1: new FormControl('',[Validators.required, Validators.minLength(4)])
    // region: new FormControl('',Validators.required)
    
  })
  

  Admin: AdminData =new AdminData();
  message :any;
 
  constructor(private toastr:ToastrService,
    private route: ActivatedRoute,private router: Router,
    private service:AuthenticationService,public nav: NavbarService ) {
      this.nav.hide();

    }

  ngOnInit(): void {

//    this.nav.show();
  //  this.Admin.gender= "Male";

}
  selectedRegians:any=[];
  Regians=["North","South","East","West"]
  regianchange(event){
    let index =this.selectedRegians.indexOf(event.target.value);
    if (index == -1){
      this.selectedRegians.push(event.target.value);
    }else{
      this.selectedRegians.splice(index,1) 
    }
    console.log(this.selectedRegians)
  }
  
Registration()
{
  {
  // if(this.Admin.firstName.trim()=="")
  // {
  //   this.toastr.warning('FirstName name is Requried');
  // }
  // else if(this.Admin.lastName.trim()=="")
  // {
  //   this.toastr.warning('lsatName name is Requried');
  // }
  // else if(this.Admin.username.trim()=="")
  // {
  //   this.toastr.warning('UserName name is Requried');
  // }
  // else
}
  {
    this.Admin.contactNo=this.Admin.contactNo.toString();
//    this.Admin.region=this.selectedRegians.toString();
    let resp=this.service.AddAdmin(this.Admin);
    resp.subscribe((data)=>{(this.message=data)

    if(this.message >= 1)
    {
      this.gotoLogin()
      this.toastr.success('Registration Successfully!.');
    }
    else if( this.message == -1)
    {
      this.toastr.warning('UserName is already exists','Failed.');
    }
    else{
      this.toastr.error('Something went wrong', 'Error');
    }
  });
}


}

gotoLogin(){
  localStorage.removeItem('token');
  this.router.navigate(['/LoginPath']);
}

}
