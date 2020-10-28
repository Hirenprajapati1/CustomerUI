import { HelperService } from './helper.service';
import { GeneralSettingsData } from './../Class/GeneralSettingsData';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
var tokenHeader;

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(private toastr: ToastrService,private router: Router,
    private helper: HelperService,private http:HttpClient) { }

  GetToken()
  { 
       tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
  }
  
  // RemoveToken(){
  //   localStorage.removeItem('token');
  //   this.toastr.info("please Login Again!");
  //   this.router.navigateByUrl('/LoginPath');
  // }
  
  ListGeneralSettings(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'GeneralSettings/ListGeneralSettings',{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.helper.Logout()
             }   
         }
     )
 )
} 

UpdateGeneralSettings(GSD: GeneralSettingsData){
  return this.http.post(environment.CustUrl + 'GeneralSettings/UpdateGeneralSettings',GSD,{headers :tokenHeader })  
  .pipe(
    tap(
        succ => { },
        err => {
            if (err.status == 401){
            this.helper.Logout()
            }   
        }
    )
)
}



UpdateGeneralSettings1(EditGS){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'GeneralSettings/UpdateGeneralSettings',EditGS,{headers :tokenHeader })
  .pipe(
    tap(
        succ => { },
        err => {
            if (err.status == 401){
            this.helper.Logout()
            }   
        }
    )
)
}

}
