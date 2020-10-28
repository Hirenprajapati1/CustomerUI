import { count } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { InvoiceServiceService } from './../../../Services/invoice-service.service';
import { PaymentData } from './../../../Class/PaymentData';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/Services/payment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {
  form = new FormGroup({
    paymentNo: new FormControl('',Validators.required),
    customerNo: new FormControl('',Validators.required),
    invoiceNo: new FormControl('',Validators.required),
    paymentAmount: new FormControl('',Validators.required),
    paymentDate: new FormControl('',Validators.required),
  })
  pay : PaymentData= new PaymentData();
  id: number;
  Invoice1:any;
  flag:boolean;
  Count:number;
  Customer1:any;
  temp:any;
  temp1:any;
  Invoice:any;
  Invoice2:any;
  public show1:boolean = false;
  public show2:boolean = false;
  CustNo:any;
  InvoiceNo:any;
  DuePayment:any;
  Old:any;
  constructor(private toastr:ToastrService,private route: ActivatedRoute,
    private router: Router,private Custservice: CustomerServiceService,
    private service: PaymentServiceService,private Invservice:InvoiceServiceService) { }

  ngOnInit(): void {
    this.Invoice1=this.Invservice.GetInvoie().subscribe((data)=>{this.Invoice1=data
    this.GetInvoiceDetailsByNo();
    });    
    this.Customer1=this.Custservice.GetCustomer().subscribe((data)=>this.Customer1=data);    

    this.id = this.route.snapshot.params['id'];
    this.GetPaymentById();
    this.GetPaymentById2()
  }

  GetPaymentById(){
    this.service.GetPaymentById(this.id)
    .subscribe(data => {
      console.log(data)
      this.pay = data;
      this.InvoiceNo=this.pay.invoiceNo;
      this.GetCustNoByInvNo();
    }, error => console.log(error)); 
  
  }
falg :boolean=true;
//count1:number=0;
  GetInvoiceNoByCustomerNo(){
    this.temp=this.CustNo[0].customerNo;
    this.Invoice2=this.service.GetInvoiceNoByCustomerNo(this.temp).subscribe((data)=>{this.Invoice2=data
  //  if(this.count1<1)
    if(this.falg == true)
    {
      this.GetInvoiceDetailsByNo();
    }
    });
 //    this.pay.invoiceNo=undefined;
  // if(this.count1 >= 1)
  if(this.falg == false)
   {
     this.pay.invoiceNo=undefined;
     this.show1=false;
   }else{
    this.show2=true;
   }
 this.falg=false;
//this.count1 =this.count1+1;
  }

  GetInvoiceDetailsByNo(){
    this.GetInvoiceDetailsByNo1();
   this.Invoice=this.service.GetInvoiceDetailsByNo(this.temp1).subscribe((data)=>this.Invoice=data);    
 
    this.show1=true;
  }
 GetInvoiceDetailsByNo1(){
   this.temp1=this.pay.invoiceNo;
   this.show1=true;
 }


 GetCustNoByInvNo(){
  this.CustNo=this.service.GetCustNoByInvNo(this.InvoiceNo).subscribe((data)=>{this.CustNo=data;
    this.GetInvoiceNoByCustomerNo();
  }); 
}

  public UpdatePayment(){
   
    if(this.pay.paymentAmount <= 0)
    {
      this.toastr.warning('Payment Amount should be more then 0 requried');   
    }
    else
    {
    this.pay.modifyBy = localStorage.getItem('username');
//  this.GetPaymentById2()
      this.DuePayment=(this.Invoice[0].invoiceAmount - this.Invoice[0].paymentAmount) +this.Old.paymentAmount;
      if(this.DuePayment < this.pay.paymentAmount)
      {
       //
       Swal.fire({
        title: 'Are you sure to update this Payment?',
        text: "Payment Amount is Greater than Invoice Amount",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
  
        if (result.isConfirmed) {
          this.UpdatePaymentWithoutToster()      
        } 
         else if (result.isDismissed) {
        this.toastr.warning('Payment is Canceled!.');  
        console.log('Payment is not Added');
      }
  })
  
       // 
      }
      else
      {
        this.UpdatePaymentWithoutToster()      
      }

    }
}  

GetPaymentById2(){  
//this.id = this.route.snapshot.params['id'];
this.service.GetPaymentById(this.id)
.subscribe(data => {
  this.Old = data;
 }); 
}

UpdatePaymentWithoutToster(){
  this.service.UpdatePayment(this.id, this.pay)
  .subscribe(data =>{ console.log(data), error => console.log(error)   
 if(data == 1)
 {
    this.toastr.success('Payment Updated Successfully','Updated Successfully!.');
    this.gotoList();
 }
 else{
   this.toastr.error('Something went wrong', 'Error');
 }
});
}

  gotoList() {
    this.router.navigate(["/ListPayment"]);    
   }
}
