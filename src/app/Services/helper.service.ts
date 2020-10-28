import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//var tokenHeader;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastr: ToastrService,private router: Router,private http:HttpClient) { }

// GetToken()
// { 
//   var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
// }

Logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  localStorage.removeItem('gender');
  localStorage.removeItem('lastName');
  localStorage.removeItem('username');
 // localStorage.removeItem('region');

  this.toastr.info("please Login Again!");
//  this.LoginAgaintoster();
  this.router.navigateByUrl('/LoginPath');
}
}
