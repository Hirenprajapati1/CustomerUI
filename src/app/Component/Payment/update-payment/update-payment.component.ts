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
    this.Invoice1=this.Invservice.GetInvoie().subscribe((data)=>this.Invoice1=data);    
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

  GetInvoiceNoByCustomerNo(){
    this.temp=this.CustNo[0].customerNo;
    this.Invoice2=this.service.GetInvoiceNoByCustomerNo(this.temp).subscribe((data)=>{this.Invoice2=data
      this.GetInvoiceDetailsByNo()});    
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


 GetCustNoByInvNo(){
  this.CustNo=this.service.GetCustNoByInvNo(this.InvoiceNo).subscribe((data)=>{this.CustNo=data;
    this.GetInvoiceNoByCustomerNo();
  }); 
}

  public UpdatePayment(){
    this.pay.modifyBy = localStorage.getItem('username');
 
    this.flag=true;
    this.Count=0;

//
      if(this.pay.invoiceNo == "" ||this.pay.invoiceNo == undefined || this.pay.invoiceNo.trim() == ""   )
      {
        this.Count++;
      }
      if(this.pay.paymentNo == "" ||this.pay.paymentNo == undefined || this.pay.paymentNo.trim() == "" )
      {
        this.Count++;
      }   
      if(this.pay.paymentDate.toString() == "" || this.pay.paymentDate==null || this.pay.paymentDate==undefined  )
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
      if(this.Count > 1){
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
    if(this.pay.paymentDate.toString() == "" || this.pay.paymentDate==null || this.pay.paymentDate==undefined  )
    {
      this.toastr.warning('Invoice Date is Requried','Requried Field!.');   
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

//  this.GetPaymentById2()
//
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
