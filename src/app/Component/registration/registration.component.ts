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

  Admin: AdminData =new AdminData();
  message :any;
 
  constructor(private toastr:ToastrService,
    private route: ActivatedRoute,private router: Router,
    private service:AuthenticationService) { }

  ngOnInit(): void {
  }
  selectedRegians:any=[];
  Regians=["North","South","East","West"]
  // Regians=[
  //   {
  //     "key":"North",
  //     "value":"North"
  //   },
  //   {
  //     "key":"South",
  //     "value":"South"
  //   },
  //   {
  //     "key":"East",
  //     "value":"East"
  //   },
  //   {
  //     "key":"West",
  //     "value":"West"
  //   }
  // ]
  regianchange(event){
    let index =this.selectedRegians.indexOf(event.target.value);
    if (index == -1){
      this.selectedRegians.push(event.target.value);
    }else{
      this.selectedRegians.splice(index,1) 
    }
    console.log(this.selectedRegians)
  }
  // items = [
  //   {'name':'South'},
  //   {'name':'North'},
  //   {'name':'East'},
  //   {'name':'West'}
    
  // ];

  // category= []

  // checkChange(i){
  //   if (this.category[i]){  
  //     this.category[i] = !this.category[i];
  //   }
  //   else{
  //     this.category[i] = true;
  //   }
  // }

Registration()
{
  this.Admin.region=this.selectedRegians.toString();
  console.log(this.Admin.region);
    let resp=this.service.AddAdmin(this.Admin);
    resp.subscribe((data)=>{(this.message=data)

    if(data >= 1)
    {
      this.gotoLogin()
      this.toastr.success('Registration Successfully!.');
    }
    else if( data == -1)
    {
      this.toastr.warning('UserName is already exists','Failed.');
    }
    else{
      this.toastr.error('Something went wrong', 'Error');
    }
  });
}

gotoLogin(){
  localStorage.removeItem('token');
  this.router.navigate(['/LoginPath']);
}

}
