import { HelperService } from './helper.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PaymentData } from './../Class/PaymentData';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { InvoiceData } from '../Class/InvoiceData';
import { Router } from '@angular/router';
var tokenHeader;
@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  constructor(private toastr: ToastrService,private router: Router,
    private helper: HelperService,private http:HttpClient) { }
  GetToken()
  { 
       tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})
  }
  
//   RemoveToken(){
//     localStorage.removeItem('token');
//     this.toastr.info("please Login Again!");
//   //  this.LoginAgaintoster();
//     this.router.navigateByUrl('/LoginPath');
//   }
  
  // LoginAgaintoster()
  // { 
  //   if(localStorage.getItem == null)
  //   {
  //   this.toastr.info("please Login Again!");
  //   }
  // }
  
  
  GetInvoie(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Invoice/GetInvoices',{headers :tokenHeader })
    .pipe(
      tap(
          succ => { },
          err => {
              if (err.status == 401){
              this.helper.Logout()
              }   
          }
      )
  ) }
  
  
  GetInvoiceNo(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Invoice/ShowInvoiceNo',{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.helper.Logout();
             }   
         }
     )
  );
  } 

  ShowInvoiceNoByTable(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Invoice/ShowInvoiceNoByTable',{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.helper.Logout();
             }   
         }
     )
  );
  } 




  ListPaymentDelete(Inv_no){
    this.GetToken();
    return this.http.post(environment.CustUrl +'Invoice/ListPaymentDelete/'+Inv_no,{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.helper.Logout();
             }   
         }
     )
  );
  } 

  DeletePaymentByInvoiceNo(Inv_no){
    this.GetToken();
    return this.http.post(environment.CustUrl +'Invoice/DeletePaymentByInvoiceNo/'+Inv_no,{headers :tokenHeader })
    .pipe(
     tap(
         succ => { },
         err => {
             if (err.status == 401){
             this.helper.Logout();
             }   
         }
     )
  );
  } 
 


 AddInvoice(invoice){    
   this.GetToken();
  return this.http.post(environment.CustUrl + 'Invoice/AddInvoice',invoice,{headers :tokenHeader })
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


AddInvoiceNoByUser(invoice){    
  this.GetToken();
 return this.http.post(environment.CustUrl + 'Invoice/AddInvoiceNoByUser',invoice,{headers :tokenHeader })
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



GetInvoiceById(id: number): Observable<any>{
  this.GetToken();
  return this.http.get(environment.CustUrl + 'Invoice/GetInvoiceById/'+id,{headers :tokenHeader })
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

 
UpdateInvioce(id: number,Inv: InvoiceData){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'Invoice/UpdateInvoice/'+id,Inv,{headers :tokenHeader })  
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

 
 DeleteInvoice(id){
  this.GetToken();
  return this.http.delete(environment.CustUrl + 'Invoice/DeleteInvoice/'+id,{headers :tokenHeader })
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
