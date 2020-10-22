import { AuthenticationService } from './../../Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AdminData } from './../../Class/AdminData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  Admin: AdminData =new AdminData();
  message :any;
  name: string=localStorage.getItem('username');
  
  selectedRegians:any=[];

  constructor(private toastr:ToastrService,
    private route: ActivatedRoute,private router: Router,
    private service:AuthenticationService) { }

  ngOnInit(): void {  
 this.service.GetAdminByID(this.name)
    .subscribe(data => {
      console.log(data)
      this.Admin = data;
      this.selectedRegians=this.Admin.region.split(',');
      console.log(this.selectedRegians)
    }, error => console.log(error)); 
  }

  Regians=["North","South","East","West"]
  // Regians=[
  //   {
  //     "key":"North",
  //     "value":"North"
  //   },
  //   {
  //     "key":"South",
  //     "value":"South"
  //   },
  //   {
  //     "key":"East",
  //     "value":"East"
  //   },
  //   {
  //     "key":"West",
  //     "value":"West"
  //   }
  // ]
  regianchange(event){
    let index =this.selectedRegians.indexOf(event.target.value);
    if (index == -1){
      this.selectedRegians.push(event.target.value);
    }else{
      this.selectedRegians.splice(index,1) 
    }
    console.log(this.selectedRegians)
  }

  Registration()
  {
    this.Admin.region=this.selectedRegians.toString();
    console.log(this.Admin.region);
      let resp=this.service.AddAdmin(this.Admin);
      resp.subscribe((data)=>{(this.message=data)
  
      if(data >= 1)
      {
        this.toastr.success('Profile is Updated Successfully!.');
        this.router.navigate(["/LoginPath"]);    
 
      }
      else if( data == -1)
      {
        this.toastr.warning('UserName is already exists','Failed.');
      }
      else{
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  }
  
}
