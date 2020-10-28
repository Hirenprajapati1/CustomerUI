import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralSettingsService } from './../../../Services/general-settings.service';
import { InvoiceServiceService } from './../../../Services/invoice-service.service';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentData } from './../../../Class/PaymentData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/Services/payment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  form = new FormGroup({
    paymentNo: new FormControl('',Validators.required),
    invoiceNo: new FormControl('',Validators.required),
    customerNo: new FormControl('',Validators.required),
    paymentAmount: new FormControl('',Validators.required),
    paymentDate: new FormControl('',Validators.required),
  })
 
  pay : PaymentData = new PaymentData();
  message :any;
  message1 :any;
  Invoice:any;
  Invoice1:any;
  Invoice2:any;
  Customer1:any;
  // flag:boolean;
  // Count:number;
  Pay1:any;
  a:any;
  id:number;
  public show:boolean = true;
  public show1:boolean = false;
  public show2:boolean = false;
  public buttonName:any = 'Show';
  temp:any;
  temp1:any;
  GS:any;
  TodayDate:any;
  DuePayment:any;
  constructor(private toastr:ToastrService,private route: ActivatedRoute,
    private router: Router,private Custservice: CustomerServiceService,
    private service: PaymentServiceService,private Invservice:InvoiceServiceService
    ,private GSservice:GeneralSettingsService) { }

  ngOnInit(): void {
    this.TodayDate =new Date();
    this.GS=this.GSservice.ListGeneralSettings().subscribe((data)=>this.GS=data);
    this.Customer1=this.Custservice.GetCustomer().subscribe((data)=>this.Customer1=data);    
    this.Invoice2=this.Invservice.GetInvoie().subscribe((data)=>this.Invoice2=data);    
    this.Pay1=this.service.ShowPaymentNoByTable().subscribe((data)=>this.Pay1=data);    
  }

  // toggle() {
  //   this.show = !this.show;
  // }

  GetInvoiceNoByCustomerNo(){
    this.Invoice2=this.service.GetInvoiceNoByCustomerNo(this.temp).subscribe((data)=>this.Invoice2=data);    
this.show2=true;
this.show1=false;
this.pay.invoiceNo=undefined;
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
 

  AddPayment()
  {  
     if(this.pay.paymentAmount <= 0){
    this.toastr.warning('Payment Amount should be more then 0 requried');   
     }
  else
    {
    this.pay.CreatedBy = localStorage.getItem('username');
    if(this.GS[0].autoPaymentNo == true){
      this.pay.paymentNo ='P'+ this.Pay1[0].paymentNo;
    this.AddPayment1();
    }
    else
    {
      this.AddPayment2();
    }}
  }




  AddPayment2(){
    {  
      this.DuePayment=(this.Invoice[0].invoiceAmount - this.Invoice[0].paymentAmount);
      if(this.DuePayment < this.pay.paymentAmount)
      {
       //
       Swal.fire({
        title: 'Are you sure to Add this Payment?',
        text: "Payment Amount is Greater than Invoice Amount",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
      }).then((result) => {
  
        if (result.isConfirmed) {
          this.Payment2WithoutToster() ;   
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
        this.Payment2WithoutToster()
  }
    }
  }

Payment2WithoutToster()
{
  let resp=this.service.AddPaymentNoByUser(this.pay);
  resp.subscribe((data)=>{(this.message=data)

  if(data >= 1)
  {
    this.gotoList()
    this.toastr.success('Payment Added Successfully','Added Successfully!.');
  }
  else if( data == -1)
  {
    this.toastr.error('Payment No is already exists','Failed.');
  }
  else{
    this.toastr.error('Something went wrong', 'Error');
  }
});

}


  AddPayment1(){
  {
    this.pay.paymentNo==this.Pay1[0].paymentNo;
      this.DuePayment=(this.Invoice[0].invoiceAmount - this.Invoice[0].paymentAmount);
      if(this.DuePayment < this.pay.paymentAmount)
      {
       //
       Swal.fire({
        title: 'Are you sure to Add this Payment?',
        text: "Payment Amount is Greater than Invoice Amount",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
      }).then((result) => {
  
        if (result.isConfirmed) {
          this.Payment1WithoutToster() ;   
         } 
         else if (result.isDismissed) {
        this.toastr.warning('Payment is Canceled!.');  
        this.pay.paymentNo=this.Pay1[0].paymentNo;
        console.log('Payment is not Added');
      }
  })
  
       // 
      }
      else
      {
        this.Payment1WithoutToster()
  }   
 }
  }

  Payment1WithoutToster(){
    let resp=this.service.AddPayment(this.pay);
    resp.subscribe((data)=>{(this.message=data)

    if(data >= 1)
    {
      this.gotoList()
      this.toastr.success('Payment Added Successfully','Added Successfully!.');
    }
    else if( data == -1)
    {
      this.toastr.error('Payment No is already exists','Failed.');
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
