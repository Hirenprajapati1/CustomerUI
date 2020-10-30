import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomerData } from './../../../Class/CustomerData';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  form = new FormGroup({
    customerNo: new FormControl('',Validators.required),
    customerName:  new FormControl('',[Validators.required]),
  })


  Cust : CustomerData= new CustomerData();
  id: number;
  constructor(private toastr:ToastrService,private route: ActivatedRoute,private router: Router,
    private service:CustomerServiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.GetCustomerById(this.id)
    .subscribe(data => {
      console.log(data)
      this.Cust = data;
    }, error => console.log(error)); 
  }


  public UpdateCustomer(){

    if(this.Cust.customerName.trim() == "")
    {
      this.toastr.warning('Customer Name is requried');
    }
    else{
    {
      this.Cust.modifyBy =localStorage.getItem('username');
     this.service.UpdateCustomer(this.id, this.Cust)
     .subscribe(data =>{ console.log(data), error => console.log(error)   
    if(data == 1)
    {
           this.toastr.success('Customer Updated Successfully','Updated Successfully!.');
           this.gotoList();
    }
    else{
      this.toastr.error('Something went wrong', 'Error');
    }
  });
}}
  }  



  gotoList() {
    this.router.navigate(["/ListCustomer"]);    
   }


}
