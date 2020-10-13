import { GeneralSettingsData } from './../../Class/GeneralSettingsData';
import { GeneralSettingsService } from './../../Services/general-settings.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {
  GSData1 : GeneralSettingsData = new GeneralSettingsData();
  GSData: any;
  message: any;

  constructor(public service : GeneralSettingsService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.GSData=this.service.ListGeneralSettings().subscribe((data)=>this.GSData=data);
  }

  UpdateGeneralSettings(){
    this.GSData1.autoPaymentNo=this.GSData[0].autoPaymentNo;
    this.GSData1.autoInvoiceNo=this.GSData[0].autoInvoiceNo;
    this.GSData1.autoCustomerNo=this.GSData[0].autoCustomerNo;
  let resp=this.service.UpdateGeneralSettings(this.GSData1);
  resp.subscribe((data)=>{(this.message=data)
if(this.message>=1){
  this.toastr.success("General Settings Updated Successfully!")
}
else{
  this.toastr.error('Something went wrong', 'Error')
}

  })
  }

}
