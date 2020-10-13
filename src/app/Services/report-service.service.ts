import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
var tokenHeader;
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {


  constructor(private toastr: ToastrService,private router: Router,private http:HttpClient) { }
  GetToken()
  { 
       tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
  }
  
  RemoveToken(){
    localStorage.removeItem('token');
    this.toastr.info("please Login Again!");
  //  this.LoginAgaintoster();
    this.router.navigateByUrl('/LoginPath');
  }
  
  // LoginAgaintoster()
  // { 
  //   if(localStorage.getItem == null)
  //   {
  //   this.toastr.info("please Login Again!");
  //   }
  // }

 GetReport(){
  this.GetToken();
    return this.http.get(environment.CustUrl +'Report/GetReport',{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.RemoveToken()
              }   
          }
      )
  )
 }  

 GetDashbordData(){
  this.GetToken();

    return this.http.get(environment.CustUrl +'Report/GetDashbordData',{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.RemoveToken()
              }   
          }
      )
  )
 }  


 GetChartDataSales(){
  this.GetToken();
    return this.http.get(environment.CustUrl +'Report/GetChartDataSales',{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.RemoveToken()
              }   
          }
      )
  )
 }  

}
