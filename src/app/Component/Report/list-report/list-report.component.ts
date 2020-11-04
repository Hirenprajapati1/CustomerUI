import { ReportServiceService } from './../../../Services/report-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
declare var $;
declare var jQuery;

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
  dataTable: any;
  tableData: any;
  title = 'Customer Monthly Report';
  constructor(public service : ReportServiceService) { }

  fileName= 'Report.xlsx';  
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('table_Report'); 
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
    this.service.GetReport().subscribe(data => {
     
     this.tableData = data;
  
      var r=$('#table_Report').DataTable({
        data: this.tableData,
        "language": {
         "lengthMenu": "Display _MENU_ records per page  ",
         "zeroRecords": "No records found",
         "infoEmpty": "No records available",
         "infoFiltered": "(filtered from _MAX_ total records)",
        },
   
        lengthMenu: [[10,15,25,50,-1],[10,15,25,50,"All"]],
          columnDefs: [
            { type: 'stringMonthYear', targets: 0 }
          ],
          //"scrollY": "200px",
          //"dom": 'rtipS',
          // searching: false,
          "deferRender": true,
          columns: [
          { data: 'dateOfMonth', 
           render: function (data) {
   //        var  monthsarry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
           var date = new Date(data);
           // var dateonly = date.getDate();
           var month =  date.toLocaleString('en-us', { month: 'short' }); 
     //      var month = monthsarry[date.getMonth()];
            var Data1=(month.toString()) + "-" +  date.getFullYear().toString().substr(-2);
           return Data1;
           }
          },
          { data: 'customerName'},
          { data: 'noOfInvoices', className: "dt-right"},
          { data: 'sales',render: $.fn.dataTable.render.number( ',', '.',2, '$'), className: "dt-right"},
          { data: 'paymentCollection',render: $.fn.dataTable.render.number( ',', '.',2, '$'), className: "dt-right"},
        ],
        
        // Filter Dropdown
   
        initComplete: function () {
           this.api().columns([1]).every( function () {
               var column = this;
               var select = $('<select class="form-control"><option value="">All</option></select>')
                   .appendTo( '#table_ReportFilter')
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
           } );
       },
      //   //
      });

     
    });  




 //  Sorting MM-yy
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
      "stringMonthYear-pre": function (s) {
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   
          var dateComponents = s.split("-");
          dateComponents[0] = dateComponents[0].replace("," , "");
          dateComponents[1] = jQuery.trim(dateComponents[1]);
   
          var year = dateComponents[1];
   
          var month = 0;
          for (var i = 0; i < months.length; i++) {
              if (months[i].toLowerCase() == dateComponents[0].toLowerCase().substring(0,3)) {
                  month = i;
                  break;
              }
          }
   
          return new Date(year, month, 1);
      },
   
      "stringMonthYear-asc": function (a, b) {
          return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      },
   
      "stringMonthYear-desc": function (a, b) {
          return ((a < b) ? 1 : ((a > b) ? -1 : 0));
      }
  });

  }

}
