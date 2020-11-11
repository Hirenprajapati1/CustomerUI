import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Operator } from 'rxjs';
//var tokenHeader;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Admintype : boolean= false;
  Opretortype : boolean= false;
  
  constructor(private toastr: ToastrService,private router: Router,private http:HttpClient) { 
    if(localStorage.getItem('userType') == "Admin")
    {
      this.Admintype=true;
      this.Opretortype= false;
    }else if(localStorage.getItem('userType') == "Operator"){
      this.Admintype=false;
      this.Opretortype= true;
    }else{
      this.Admintype=false;
      this.Opretortype= false;
    }
  }

// GetToken()
// { 
//   var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
// }


// a:any;
// a=localStorage.getItem('userType');
// if(localStorage.getItem('userType') == ("Admin").toString())
// {

// }
// Admintype : boolean= true;
//Opretortype : boolean= true;




Logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  localStorage.removeItem('gender');
  localStorage.removeItem('lastName');
  localStorage.removeItem('username');
  localStorage.removeItem('userType');
 // localStorage.removeItem('region');

  this.toastr.info("please Login Again!");
//  this.LoginAgaintoster();
  this.router.navigateByUrl('/LoginPath');
}
}
