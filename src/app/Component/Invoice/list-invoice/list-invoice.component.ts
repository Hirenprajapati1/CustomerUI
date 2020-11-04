import { ToastrService } from 'ngx-toastr';
import { InvoiceServiceService } from './../../../Services/invoice-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; 
declare var $;
declare var jQuery;

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {
  dataTable: any;
  tableData: any;
  title = 'Invoice';
  Invdata:any;
  
  constructor(public service : InvoiceServiceService,private toastr: ToastrService,private router: Router) { }

  fileName= 'Invoice.xlsx';  
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('table_Invoice'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
 
  ngOnInit(): void {
    this.getDataFromSource();
  }
  getDataFromSource() {
    this.service.GetInvoie().subscribe(data => {
     
     this.tableData = data;
  
      var r=$('#table_Invoice').DataTable({
        data: this.tableData,
        "language": {
         "lengthMenu": "Display _MENU_ records per page  ",
         "zeroRecords": "No records found",
         "infoEmpty": "No records available",
         "infoFiltered": "(filtered from _MAX_ total records)",
        },
   
        lengthMenu: [[10,15,25,50,-1],[10,15,25,50,"All"]],
        columnDefs: [
          { type: 'stringDateMonthYear', targets: [3,5] }
        ],
    
          columns: [
          { data: 'invoiceNo', className: "dt-right"},
          { data: 'customerName', className: "dt-center"},
          { data: 'customerNo', className: "dt-right"},
          { data: 'invoiceDate',
          render: function (data) {
            //        var  monthsarry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var date = new Date(data);
                    var dateonly = date.getDate();
                    var month =  date.toLocaleString('en-us', { month: 'short' }); 
              //      var month = monthsarry[date.getMonth()];
//              var Data1=(dateonly.toString().length > 1 ? dateonly : "0" + dateonly) + "-" +(month.toString()) + "-" +  date.getFullYear().toString().substr(-2);
              var Data1=(dateonly.toString().length > 1 ? dateonly : "0" + dateonly) + "-" +(month.toString()) + "-" +  date.getFullYear().toString();
              return Data1;
                  }     
          },
          { data: 'invoiceAmount',render: $.fn.dataTable.render.number( ',', '.',2, '$'), className: "dt-right"},
          { data: 'paymentDueDate',
          render: function (data) {
            //        var  monthsarry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var date = new Date(data);
                    var dateonly = date.getDate();
                    var month =  date.toLocaleString('en-us', { month: 'short' }); 
              //      var month = monthsarry[date.getMonth()];
         //     var Data1=(dateonly.toString().length > 1 ? dateonly : "0" + dateonly) + "-" +(month.toString()) + "-" +  date.getFullYear().toString().substr(-2);
              var Data1=(dateonly.toString().length > 1 ? dateonly : "0" + dateonly) + "-" +(month.toString()) + "-" +  date.getFullYear().toString();
              return Data1;
                  }     
        
        },      
          {
          data: null,
          className: "dt-center",
          defaultContent: '<div class="btn-group btn-group-sm"><a href="" class="btn btn btn-primary editor_edit" title="Edit" ><i class="glyphicon glyphicon-pencil edituserinfo" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="" class="btn btn btn-danger editor_remove" title="Delete"><i class="glyphicon glyphicon-trash edituserinfo" aria-hidden="true"></i></a></div>',
        //  defaultContent: '<div class="btn-group btn-group-sm"><a href="" class="btn btn btn-primary editor_edit" title="Edit" ><i class="glyphicon glyphicon-pencil edituserinfo" aria-hidden="true"></i></a><a href="" class="btn btn btn-danger editor_remove" title="Delete" data-toggle="modal" data-target="#myModal" ><i class="glyphicon glyphicon-trash edituserinfo" aria-hidden="true"></i></a></div>',
          orderable: false,
          sWidth: '50px',
        }
        ],
        
        // Filter Dropdown
   
        initComplete: function () {
           this.api().columns([1]).every( function () {
               var column = this;
               var select = $('<select class="form-control"><option value="">All</option></select>')
                   .appendTo( '#table_InvoiceFilter')
                   .on( 'change', function () {
                       var val = $(this).val();
                       column.search( this.value ).draw();
                   } );
   
               // Only contains the *visible* options from the first page
               console.log(column.data().unique());
   
               // If I add extra data in my JSON, how do I access it here besides column.data?
               column.data().unique().sort().each( function ( d, j ) {
                if(d != null){
                   select.append( '<option value="'+d+'">'+d+'</option>' )}
               } );
           } );     //
       },
      //   //
      });
    
//edit delete
$("#table_Invoice tbody").unbind("click");

$("tbody").on("click", "a.editor_edit", e => {
  e.preventDefault();

  var tr = $(e.target).closest("tr");
  var row = r.row(tr).data();
  this.updateInvoice(row.invoiceNo);

  $('html,body').animate({
    scrollTop: $("#section-shape-2").offset().top
  }, 'slow');
});


$("#table_Invoice tbody").on("click", "a.editor_remove", e => {
  e.preventDefault();

  var tr = $(e.target).closest("tr");
  var row = r.row(tr).data();
  // if (confirm('Are you sure to delete this record ?'))
  // {
    Swal.fire({
      title: 'Are you sure to delete this Invoice?',
      text: "You won't be able to revert this Invoice!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

  let resp= this.service.DeleteInvoice(row.invoiceNo);
  resp.subscribe((data)=>{
    
    if(data == 1)
    {
      this.toastr.info('Deleted Successfully!');
      r.row(tr).remove().draw();  
    }  
    else if(data == -1)
    {
      this.toastr.warning('Pleace First Delete All Payment of This Invoice')     
  //    this.lstpay(row.invoiceNo);
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
  
});
   

    });  


//
//  Sorting MM-yy
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "stringDateMonthYear-pre": function (s) {
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      var dateComponents = s.split("-");
      dateComponents[0]=dateComponents[0].replace("," , "");
      dateComponents[1] = dateComponents[1].replace("," , "");
      dateComponents[2] = jQuery.trim(dateComponents[2]);

      var year = dateComponents[2];

      var month = 0;
      for (var i = 0; i < months.length; i++) {
          if (months[i].toLowerCase() == dateComponents[1].toLowerCase().substring(0,3)) {
              month = i;
              break;
          }
      }
      var DD= dateComponents[0]
      return new Date(year, month, DD);
  },

  "stringMonthYear-asc": function (a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  "stringMonthYear-desc": function (a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//

  }

  updateInvoice(id: number){
    this.router.navigate(['/UpdateInvoice', id]);
  }
  lstpay(id: number){
    this.router.navigate(['/ListPay', id]);
  }
  
  gotoadd(){
      this.router.navigate(['/AddInvoice']);
  }
  reloadData() {
    this.Invdata=this.service.GetInvoie().subscribe((data)=>this.Invdata=data); 
 }
 
}
