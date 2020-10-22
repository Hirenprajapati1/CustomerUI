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
  inv : InvoiceData= new InvoiceData();
  id: number;
  Customer1:any;
  flag:boolean; 
  Count:number;
 
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
    this.inv.modifyBy = localStorage.getItem('username');
 
    this.flag=true;
    this.Count=0;
//
      if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
      {
        this.Count++;
        this.flag=false;
      }
      if(this.inv.customerNo == "" ||this.inv.customerNo == undefined || this.inv.customerNo.trim() == ""   )
      {
        this.Count++;
        this.flag=false;
      }
      if(this.inv.invoiceAmount == null || this.inv.invoiceAmount == undefined  )
      {
        this.Count++;
        this.flag=false;
      }
      else if(this.inv.invoiceAmount < 1 )
      {
        this.Count++;
        this.flag=false;
      }
      if(this.inv.invoiceDate.toString() == "" || this.inv.invoiceDate==null || this.inv.invoiceDate==undefined  )
      {
        this.Count++;
        this.flag=false;
      }

      if(this.Count >=2){
        this.toastr.warning('Please Fill All Required Fields','Requried Field!.');   
        this.flag=false;      
      }
  //
  

  if(this.Count == 1 )
  {
    if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
    {
      this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
      this.flag=false;
    }
    if(this.inv.customerNo == "" ||this.inv.customerNo == undefined || this.inv.customerNo.trim() == ""   )
    {
      this.toastr.warning('Customer Name is Requried','Requried Field!.');   
      this.flag=false;
    }
    if(this.inv.invoiceAmount == null || this.inv.invoiceAmount == undefined  )
    {
      this.toastr.warning('Invoice Amount Is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.inv.invoiceAmount < 1 )
    {
      this.toastr.warning('Invoice Amount Should be More Then 0 Requried','Minimam Value Requried!.');   
      this.flag=false;
    }
    if(this.inv.invoiceDate.toString() == "" || this.inv.invoiceDate==null || this.inv.invoiceDate==undefined  )
    {
      this.toastr.warning('Invoice Date is Requried','Requried Field!.');   
      this.flag=false;
    }
  }
    if(this.flag==true)
    {
 
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
