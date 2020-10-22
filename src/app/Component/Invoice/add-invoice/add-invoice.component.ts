import { DatePipe } from '@angular/common';
import { GeneralSettingsService } from './../../../Services/general-settings.service';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { ToastrService } from 'ngx-toastr';
import { InvoiceServiceService } from './../../../Services/invoice-service.service';
import { InvoiceData } from './../../../Class/InvoiceData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})

export class AddInvoiceComponent implements OnInit {
  inv : InvoiceData = new InvoiceData();
  message :any;
  message1 :any;
  Customer1:any;
  Invo:any;
  flag:boolean;
  Count:number;
  public show:boolean = true;
  public buttonName:any = 'Show';
  GS:any;
  TodayDate :any;
  temp:string;
  month:any;
  day:any
  year:any
  hours:any
  minutes:any
  seconds:any
  // var month, day, year, hours, minutes, seconds;

  constructor(private toastr:ToastrService,
    private Custserivice :CustomerServiceService,private route: ActivatedRoute,
    private router: Router,private service:InvoiceServiceService,
    private GSservice:GeneralSettingsService) { }

  ngOnInit(): void { 
    this.TodayDate  =new Date();
    this.GS=this.GSservice.ListGeneralSettings().subscribe((data)=>this.GS=data);
    this.Customer1=this.Custserivice.GetCustomer().subscribe((data)=>this.Customer1=data);    
    this.InvNo();
    console.log(this.Invo);
  }
  // toggle() {
  //   this.show = !this.show;
  // }

  InvNo()
  {
    this.Invo=this.service.ShowInvoiceNoByTable().subscribe((data)=>this.Invo=data);    
  }


  public AddInvoice()
  {
    this.inv.CreatedBy = localStorage.getItem('username');
    // this.temp=this.inv.invoiceDate.toString();
    // var date = new Date(this.temp),
    //     month = ("0" + (date.getMonth() + 1)).slice(-2),
    //     day = ("0" + date.getDate()).slice(-2);
    // this.hours = ("0" + date.getHours()).slice(-2);
    // this.minutes = ("0" + date.getMinutes()).slice(-2);
    // this.seconds = ("0" + date.getSeconds()).slice(-2);

    // var mySQLDate = [date.getFullYear(), month, day].join("-");
    // var mySQLTime = [this.hours, this.minutes, this.seconds].join(":");
    // this.inv.invoiceDate = new Date((this.inv.invoiceDate).toISOString())
    // this.inv.invoiceDate2 =new Date( [mySQLDate, mySQLTime].join(" "));
    
    //this.inv.invoiceDate = moment(new Date(this.temp.substr(0, 16)));
  //  console.log(date.format("DD-MMM-YYYY")); 
   // this.inv.invoiceDate = (this.inv.invoiceDate.substring(0, 16));
//    this.inv.invoiceDate2 =new Date(this.inv.invoiceDate.getFullYear(),this.inv.invoiceDate.getMonth(),this.inv.invoiceDate.getDate(),0,0,0);
//  this.inv.invoiceDate1= (this.inv.invoiceDate.getFullYear()+"/"+this.inv.invoiceDate.getMonth() +"/"+this.inv.invoiceDate.getDate());
   // this.inv.invoiceDate1 = (this.inv.invoiceDate.getMonth+"/" +this.inv.invoiceDate.getDate+"/"+this.inv.invoiceDate.getFullYear);
    //this.inv.invoiceDate = new Date(this.inv.invoiceDate).toISOString()
    if(this.GS[0].autoInvoiceNo==true){
      this.inv.invoiceNo = undefined;
    this.AddInvoice1();
    }
    else 
    {
      this.AddInvoice2();
    }
 
  }

  public AddInvoice2(){
    this.Count=0;
    this.flag=true;

    //
    if(this.inv.invoiceNo !=undefined)
    {
      if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
      {
        this.Count++;
        this.flag=false;
      }
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

    if(this.Count >=2){
      this.toastr.warning('Please Fill All Required Fields','Requried Field!.');   
      this.flag=false;      
    }
//

    if(this.Count < 2 && this.Count > 0)
    {
      if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
        {
          this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
          this.flag=false;
        }
    else if(this.inv.customerNo == "" ||this.inv.customerNo == undefined || this.inv.customerNo.trim() == ""   )
    {
      this.toastr.warning('Customer Name is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.inv.invoiceAmount == null || this.inv.invoiceAmount == undefined  )
    {
      this.toastr.warning('Invoice Amount Is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.inv.invoiceAmount < 1 )
    {
      this.toastr.warning('Invoice Amount Should be More Then 0 Requried','Minimam Value Requried!.');   
      this.flag=false;
    }
  }

  if(this.inv.invoiceNo ==undefined && this.flag==true){
    this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
    this.flag=false;

  }
    if(this.flag==true)
    {
      let resp=this.service.AddInvoiceNoByUser(this.inv);
      resp.subscribe((data)=>{(this.message=data)
  
      if(data >= 1)
      {
        this.gotoList()
        this.toastr.success('Invoice Added Successfully','Added Successfully!.');
      }
      else if( data == -1)
      {
        this.toastr.error('Invoice No is already exists','Failed.');
      }
      else{
        this.toastr.error('Something went wrong', 'Error');
      }
    });
    }
  }


  public AddInvoice1(){
    this.Count=0;
    this.flag=true;

    //
    if(this.inv.invoiceNo !=undefined)
    {
      if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
      {
        this.Count++;
        this.flag=false;
      }
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

    if(this.Count >=2){
      this.toastr.warning('Please Fill All Required Fields','Requried Field!.');   
      this.flag=false;      
    }
//

    if(this.Count < 2 && this.Count > 0)
    {
      if(this.inv.invoiceNo !=undefined)
      {
      if(this.inv.invoiceNo == "" ||this.inv.invoiceNo == undefined || this.inv.invoiceNo.trim() == ""   )
        {
          this.toastr.warning('Invoice No Is Requried','Requried Field!.');   
          this.flag=false;
        }
      }
    else if(this.inv.customerNo == "" ||this.inv.customerNo == undefined || this.inv.customerNo.trim() == ""   )
    {
      this.toastr.warning('Customer Name is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.inv.invoiceAmount == null || this.inv.invoiceAmount == undefined  )
    {
      this.toastr.warning('Invoice Amount Is Requried','Requried Field!.');   
      this.flag=false;
    }
    else if(this.inv.invoiceAmount < 1 )
    {
      this.toastr.warning('Invoice Amount Should be More Then 0 Requried','Minimam Value Requried!.');   
      this.flag=false;
    }
  }

    if(this.flag==true)
    {
      let resp=this.service.AddInvoice(this.inv);
      resp.subscribe((data)=>{(this.message=data)
  
      if(data >= 1)
      {
        this.gotoList()
        this.toastr.success('Invoice Added Successfully','Added Successfully!.');
      }
      else if( data == -1)
      {
        this.toastr.error('Invoice No is already exists','Failed.');
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
