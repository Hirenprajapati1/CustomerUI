import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PaymentData } from './../Class/PaymentData';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
var tokenHeader;
@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

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

  GetPayment(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Payment/GetPayments',{headers :tokenHeader })
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
 
 GetPaymentNo(){
  this.GetToken();
  return this.http.get(environment.CustUrl +'Payment/ShowPaymentNo',{headers :tokenHeader })
  .pipe(
   tap(
       succ => { },
       err => {
           if (err.status == 401){
           this.RemoveToken();
           }   
       }
   )
);
} 

ShowPaymentNoByTable(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Payment/ShowPaymentNoByTable',{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.RemoveToken();
             }   
         }
     )
  );
  } 
  

 AddPayment(Payment){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'Payment/AddPayment',Payment,{headers :tokenHeader })
  .pipe(
    tap(
        succ => { },
        err => {
            if (err.status == 401){
            this.RemoveToken()
            }   
        }
    )
)}


AddPaymentNoByUser(Payment){
    this.GetToken();
    return this.http.post(environment.CustUrl + 'Payment/AddPaymentNoByUser',Payment,{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.RemoveToken()
              }   
          }
      )
  )}
  


 GetPaymentById(id: number): Observable<any>{
  this.GetToken();
  return this.http.get(environment.CustUrl + 'Payment/GetPaymentById/'+id,{headers :tokenHeader })
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

UpdatePayment(id: number,Pay: PaymentData){
  return this.http.post(environment.CustUrl + 'Payment/UpdatePayment/'+id,Pay,{headers :tokenHeader })  
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

 
 DeletePayment(id){
  this.GetToken();
  return this.http.delete(environment.CustUrl + 'Payment/DeletePayment/'+id,{headers :tokenHeader })
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

GetInvoiceNoByCustomerNo(id: number): Observable<any>{
    this.GetToken();
    return this.http.get(environment.CustUrl + 'Payment/GetInvoiceNoByCustomerNo/'+id,{headers :tokenHeader })
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
  

  GetInvoiceDetailsByNo(id: number): Observable<any>{
    this.GetToken();
    return this.http.get(environment.CustUrl + 'Payment/GetInvoiceDetailsByNo/'+id,{headers :tokenHeader })
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


  GetCustNoByInvNo(id: number): Observable<any>{
    this.GetToken();
    return this.http.get(environment.CustUrl + 'Payment/GetCustNoByInvNo/'+id,{headers :tokenHeader })
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
