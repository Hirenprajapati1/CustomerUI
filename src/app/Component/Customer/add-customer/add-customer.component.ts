import { GeneralSettingsService } from './../../../Services/general-settings.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerServiceService } from './../../../Services/customer-service.service';
import { CustomerData, CustomerData1 } from './../../../Class/CustomerData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  form = new FormGroup({
    customerNo: new FormControl('',[Validators.required, Validators.pattern(/^\S*$/)]),
    customerName:  new FormControl('',[Validators.required]),
  })

  GS:any;
  Cust1 : CustomerData = new CustomerData();
  Cust2:any;
  message :any;
  message1 :any;
  CustomerNo:any;
  userName:any;
 flag :boolean;
 public show:boolean = true;
 public buttonName:any = 'Show';
resp:any

 constructor(private toastr:ToastrService,
  private route: ActivatedRoute,private router: Router,
    private service:CustomerServiceService,private GSservice:GeneralSettingsService) { }
  ngOnInit(): void {
    this.GS=this.GSservice.ListGeneralSettings().subscribe((data)=>this.GS=data);
    this.getno();   
    console.log(this.Cust2);
  }

  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   // if(this.show)  
  //   //   this.buttonName = "Hide";
  //   // else
  //   //   this.buttonName = "Show";
  // }

  
  // toggle1() {
  //   this.show1 = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.show)  
  //   {
  // //    this.buttonName1 = "Hide";
  //     this.buttonName = "Show";
  //   }
  //   else{
  //   //  this.buttonName1 = "Show";
  //     this.buttonName = "Hide";
  //   }
  // }
  
  public AddCustomer()
  {
    if(this.Cust1.customerName.trim() == "")
    {
      this.toastr.warning('Customer Name is requried');
    }
    else
    {
    this.userName =localStorage.getItem('username');
    this.Cust1.CreatedBy = this.userName;
    if(this.GS[0].autoCustomerNo == true){

    this.Cust1.customerNo ='C'+ this.Cust2[0].customerNo;
    //this.AddCustomer1();
     this.resp=this.service.AddCustomer(this.Cust1);
    }
    else 
    {
      //this.AddCustomerNoByUser1();
      this.resp=this.service.AddCustomer(this.Cust1);
    }
    this.resp.subscribe((data)=>{(this.message=data)
    
      if(data >= 1)
      {
        this.gotoList()
        this.toastr.success('Customer Added Successfully','Added Successfully!.');
      }
      else if( data == -1)
      {
        this.toastr.error('Customer No is already exists','Failed.');
      }
      else{
        this.toastr.error('Something went wrong', 'Error');
      }
    });  
  }
  }

   getno(){
  //  this.CustomerNo=this.service.GetCustomerNo().subscribe((data)=>data) 
     this.Cust2=this.service.GetCustomerNo().subscribe((data)=>this.Cust2=data) 
   }

    gotoList() {
     this.router.navigate(["/ListCustomer"]);    
    }

} 





// AddCustomerNoByUser1()
// {  
//     let resp=this.service.AddCustomerNoByUser(this.Cust1);
//     resp.subscribe((data)=>{(this.message=data)

//     if(data >= 1)
//     {
//       this.gotoList()
//       this.toastr.success('Customer Added Successfully','Added Successfully!.');
//     }
//     else if( data == -1)
//     {
//       this.toastr.error('Customer No is already exists','Failed.');
//     }
//     else{
//       this.toastr.error('Something went wrong', 'Error');
//     }
//   });
// }

// AddCustomer1()
// {
//     let resp=this.service.AddCustomer(this.Cust1);
//     resp.subscribe((data)=>{(this.message=data)

//     if(data >= 1)
//     {
//       this.gotoList()
//       this.toastr.success('Customer Added Successfully','Added Successfully!.');
//     }
//     else if( data == -1)
//     {
//       this.toastr.error('Customer No is already exists','Failed.');
//     }
//     else{
//       this.toastr.error('Something went wrong', 'Error');
//     }
//   });
// }


