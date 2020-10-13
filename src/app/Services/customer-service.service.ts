import { ToastrService } from 'ngx-toastr';
import { CustomerData } from './../Class/CustomerData';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
var tokenHeader;
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

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

  
  GetCustomer(){
    this.GetToken();
    return this.http.get(environment.CustUrl +'Customer/GetCustomers',{headers :tokenHeader })
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



GetCustomerNo(){
  this.GetToken();
  return this.http.get(environment.CustUrl +'Customer/ShowCustomerNoByTable',{headers :tokenHeader })
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



 AddCustomer(Customer){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'Customer/AddCustomer',Customer,{headers :tokenHeader })
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

AddCustomerNoByUser(Customer){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'Customer/AddCustomerNoByUser',Customer,{headers :tokenHeader })
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





GetCustomerById(id: number): Observable<any>{
  this.GetToken();
  return this.http.get(environment.CustUrl + 'Customer/GetCustomerById/'+id,{headers :tokenHeader })
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

 DeleteCustomer(id){
  this.GetToken();
  return this.http.delete(environment.CustUrl + 'Customer/DeleteCustomer/'+id,{headers :tokenHeader })
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


UpdateCustomer(id: number,Cust: CustomerData){
  this.GetToken();
  return this.http.post(environment.CustUrl + 'Customer/UpdateCustomer/'+id,Cust,{headers :tokenHeader })  
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
