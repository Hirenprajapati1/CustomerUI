import { HelperService } from './helper.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
var tokenHeader;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private toastr: ToastrService,private router: Router,private http:HttpClient
   , private helper: HelperService) { }

  AdminLogin(FormData){
    return this.http.post(environment.CustUrl + 'Authentication',FormData)
  }

  AddAdmin(FormData){
    return this.http.post(environment.CustUrl + 'Authentication/AddAdmin',FormData)
  }

  UpadeAdmin(FormData){
    this.GetToken();
    return this.http.post(environment.CustUrl + 'Report/UpdateAdmin',FormData,{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.helper.Logout();
              }   
          }
      )
  )
  
  }
  

  GetAdminByID(name: string): Observable<any>{
    this.GetToken();
    return this.http.get(environment.CustUrl + 'Report/GetAdminByID/'+name,{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.helper.Logout();
              }   
          }
      )
  )
  }
  

  GetToken()
{ 
     tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
}

// RemoveToken(){
//   localStorage.removeItem('token');
//   this.toastr.info("please Login Again!");
// //  this.LoginAgaintoster();
//   this.router.navigateByUrl('/LoginPath');
// }


}
