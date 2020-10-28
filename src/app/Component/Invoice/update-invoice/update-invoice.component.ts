import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { InvoiceServiceService } from './../../../Services/invoice-service.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceData } from 'src/app/Class/InvoiceData';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {
  form = new FormGroup({
    invoiceNo: new FormControl('',Validators.required),
    customerNo: new FormControl('',Validators.required),
    invoiceDate: new FormControl('',Validators.required),
    invoiceAmount: new FormControl('',Validators.required),
  })
 
 
  inv : InvoiceData= new InvoiceData();
  id: number;
  Customer1:any;
  // flag:boolean; 
  // Count:number;
 
  constructor(private toastr:ToastrService,private route: ActivatedRoute,private router: Router,
    private service:InvoiceServiceService,private Custserivice :CustomerServiceService) { }

  ngOnInit(): void {
    this.Customer1=this.Custserivice.GetCustomer().subscribe((data)=>this.Customer1=data);    

    this.id = this.route.snapshot.params['id'];
    this.service.GetInvoiceById(this.id)
    .subscribe(data => {
      console.log(data)
      this.inv = data;
    }, error => console.log(error));     
  }


  public UpdateInvioce(){
    if(this.inv.invoiceAmount <= 0)
    {
      this.toastr.warning('Invoice Amount should be more then 0');   
    }
    else
    {
    this.inv.modifyBy = localStorage.getItem('username');
    this.service.UpdateInvioce(this.id, this.inv)
    .subscribe(data =>{ console.log(data), error => console.log(error)   
   if(data == 1)
   {
          this.toastr.success('Invoice Updated Successfully','Updated Successfully!.');
          this.gotoList();
   }
   else{
     this.toastr.error('Something went wrong', 'Error');
   }
 });
}
}



  gotoList() {
    this.router.navigate(["/ListInvoice"]);    
   }

}
