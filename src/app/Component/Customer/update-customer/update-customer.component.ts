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
  Cust : CustomerData= new CustomerData();
  id: number;
  flag:boolean;  
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
    this.Cust.modifyBy =localStorage.getItem('username');
  
    this.flag=true;
    if( this.Cust.customerName == ""  || this.Cust.customerName == undefined || this.Cust.customerName.trim() =="")
    {
      this.toastr.warning('Customer Name Is Requried','Requried Field!.');   
      this.flag=false;
    }
 
    if(this.flag== true){
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
}
  }  



  gotoList() {
    this.router.navigate(["/ListCustomer"]);    
   }


}
