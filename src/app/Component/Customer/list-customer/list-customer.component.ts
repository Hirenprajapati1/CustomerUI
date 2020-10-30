import { CustomerServiceService } from './../../../Services/customer-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
declare var $;
declare var jQuery;

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  dataTable: any;
  tableData: any;
  title = 'Customer';
  custid: any;
  Custdata: any;
  constructor(public service : CustomerServiceService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.getDataFromSource();
  }
  
  getDataFromSource() {
    this.service.GetCustomer().subscribe(data => {
     
     this.tableData = data;
  
      var r=$('#table_Customer').DataTable({
        data: this.tableData,
        "language": {
         "lengthMenu": "Display _MENU_ records per page  ",
         "zeroRecords": "No records found",
         "infoEmpty": "No records available",
         "infoFiltered": "(filtered from _MAX_ total records)",
        },
   
        lengthMenu: [[10,15,25,50,-1],[10,15,25,50,"All"]],
          columns: [
          { data: 'customerNo'},
          { data: 'customerName'},
          {
            data: null,
            className: "dt-center",
            defaultContent: '<div class="btn-group btn-group-sm"><a href="" class="btn btn btn-primary editor_edit" title="Edit" ><i class="glyphicon glyphicon-pencil edituserinfo" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="" class="btn btn btn-danger editor_remove" title="Delete"><i class="glyphicon glyphicon-trash edituserinfo" aria-hidden="true"></i></a></div>',
            orderable: false,
            sWidth: '50px',
          }
          ], 
      });

      
//edit delete
$("#table_Customer tbody").unbind("click");

$("tbody").on("click", "a.editor_edit", e => {
  e.preventDefault();

  var tr = $(e.target).closest("tr");
  var row = r.row(tr).data();
  this.updateCustomer(row.customerNo);

  $('html,body').animate({
    scrollTop: $("#section-shape-2").offset().top
  }, 'slow');
});


$("#table_Customer tbody").on("click", "a.editor_remove", e => {
  e.preventDefault();

  var tr = $(e.target).closest("tr");
  var row = r.row(tr).data();
  
 // this.DeleteCustomer(row.customerNo)
  // if (confirm('Are you sure to delete this record ?'))
  // {
    
    Swal.fire({
      title: 'Are you sure to delete this Customer?',
      text: "You won't be able to revert this Customer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

  let resp= this.service.DeleteCustomer(row.customerNo);
  resp.subscribe((data)=>{
    this.custid=data
    if(this.custid == 1)
    {
      this.toastr.info('Deleted Successfully!');
      r.row(tr).remove().draw();
    }
    else if(data == -1)
    {
      this.toastr.warning('Pleace First Delete All Payment & Invoice of this Customer')     
    }  
    else
    {
      this.toastr.error('Something went wrong', 'Error');     
    }      
    this.reloadData()
  });
} else if (result.isDismissed) {
  console.log('Clicked No, File is safe!');
}
})
  // }


});
    });  
  }

  updateCustomer(id: number){
    this.router.navigate(['/UpdateCustomer', id]);
  }

  gotoadd(){
      this.router.navigate(['/AddCustomer']);
  }
  reloadData() {
    this.Custdata=this.service.GetCustomer().subscribe((data)=>this.Custdata=data); 
 }

 

}



  // public DeleteCustomer(id:number){
  //   if (confirm('Are you sure to delete this record ?'))
  //   {
  //   let resp= this.service.DeleteCustomer(id);
  //   resp.subscribe((data)=>{
  //     this.custid=data
  //     if(this.custid == 1)
  //     {
  //       this.toastr.info('Deleted Successfully!');
  //     }  
  //     else
  //     {
  //       this.toastr.error('Something went wrong', 'Error');     
  //     }      
  //     this.reloadData()
  //   });
  //   }
  //  }

