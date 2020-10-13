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
  pay : PaymentData = new PaymentData();
  message :any;
  message1 :any;
  Invoice:any;
  Invoice1:any;
  Invoice2:any;
  Customer1:any;
  flag:boolean;
  Count:number;
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
    this.pay.CreatedBy = localStorage.getItem('username');
    if(this.GS[0].autoPaymentNo == true){
      this.pay.paymentNo = undefined;
    this.AddPayment1();
    }
    else
    {
      this.AddPayment2();
    }
  }




  AddPayment2(){
    this.flag=true;
    this.Count=0;

      if(this.pay.invoiceNo == "" ||this.pay.invoiceNo == undefined || this.pay.invoiceNo.trim() == ""   )
      {
        this.Count++;
      }
        if(this.pay.paymentNo == "" ||this.pay.paymentNo == undefined || this.pay.paymentNo.trim() == "" )
        {
          this.Count++;
        }
      if(this.pay.paymentAmount == null || this.pay.paymentAmount == undefined  )
      {
        this.Count++;
      }
      else if(this.pay.paymentAmount < 1 )
      {
        this.Count++;
      }

      if(this.Count >=2){
        this.toastr.warning('Please Fill All Required Fields','Requried Field!.');   
        this.flag=false;      
      }

//
  if(this.Count == 1)
  {
    if(this.pay.invoiceNo == "" ||this.pay.invoiceNo == undefined || this.pay.invoiceNo.trim() == ""   )
    {
      this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
      this.flag=false;
    }
    if(this.pay.paymentNo == "" ||this.pay.paymentNo == undefined || this.pay.paymentNo.trim() == "" )
    {
      this.toastr.warning('Payment No is Requried','Requried Field!.');   
      this.flag=false;
    }
    if(this.pay.paymentAmount == null || this.pay.paymentAmount == undefined  )
    {
      this.toastr.warning('Payment Amount is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.pay.paymentAmount < 1 )
    {
      this.toastr.warning('Payment Amount Should be More Then 0 Requried','Minimam Value Requried!.');   
      this.flag=false;
    }
  }
    

    if(this.flag==true)
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
    this.flag=true;
    this.Count=0;

  //     if(this.pay.paymentNo==undefined){
  // //      this.Pay1=this.service.GetPaymentNo().subscribe((data)=>this.Pay1=data);    
  // this.pay.paymentNo==(this.Pay1[0])
  // this.a == (this.Pay1.paymentNo)
  // console.log(this.Pay1[0].paymentNo);
  // console.log(this.a);
  //     }
      

      if(this.pay.invoiceNo == "" ||this.pay.invoiceNo == undefined || this.pay.invoiceNo.trim() == ""   )
      {
        this.Count++;
      }
      if(this.pay.paymentNo != undefined)
      {
        if(this.pay.paymentNo == "" ||this.pay.paymentNo == undefined || this.pay.paymentNo.trim() == "" )
        {
          this.Count++;
        }
      }
      if(this.pay.paymentAmount == null || this.pay.paymentAmount == undefined  )
      {
        this.Count++;
      }
      else if(this.pay.paymentAmount < 1 )
      {
        this.Count++;
      }

      if(this.Count >=2){
        this.toastr.warning('Please Fill All Required Fields','Requried Field!.');   
        this.flag=false;      
      }

//
  if(this.Count == 1)
  {
    if(this.pay.invoiceNo == "" ||this.pay.invoiceNo == undefined || this.pay.invoiceNo.trim() == ""   )
    {
      this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
      this.flag=false;
    }
    if(this.pay.paymentNo !=undefined){
    if(this.pay.paymentNo == "" ||this.pay.paymentNo == undefined || this.pay.paymentNo.trim() == "" )
    {
      this.toastr.warning('Payment No is Requried','Requried Field!.');   
      this.flag=false;
    }}
    if(this.pay.paymentAmount == null || this.pay.paymentAmount == undefined  )
    {
      this.toastr.warning('Payment Amount is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.pay.paymentAmount < 1 )
    {
      this.toastr.warning('Payment Amount Should be More Then 0 Requried','Minimam Value Requried!.');   
      this.flag=false;
    }
  }
    if(this.flag==true)
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
          this.Payment1WithoutToster() ;   
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
     this.router.navigate(["/Nav/ListPayment"]);    
    }

}
