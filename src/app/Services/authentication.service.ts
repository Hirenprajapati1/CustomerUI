import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private toastr: ToastrService,private router: Router,private http:HttpClient) { }

  AdminLogin(FormData){
    return this.http.post(environment.CustUrl + 'Authentication',FormData)
  }
  AddAdmin(FormData){
    return this.http.post(environment.CustUrl + 'Authentication/AddAdmin',FormData)
  }
  

}
