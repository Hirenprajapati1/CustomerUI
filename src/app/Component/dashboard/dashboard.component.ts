import { Router } from '@angular/router';
import { HelperService } from './../../Services/helper.service';
import { ReportServiceService } from './../../Services/report-service.service';
import { Component, OnInit } from '@angular/core';
//import { Color, Label, ThemeService } from 'ng2-charts';
//import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
//import {  ChartType, Column } from 'angular-google-charts';
//import { templateJitUrl } from '@angular/compiler';
import { ChartType, Column } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Data: any;
  data1:any;
  temp:any=[];
  temp1:any=[];
  temp2:any=[];
  
  TotelSalesAndPaymentCollectionpie:any;  
  TotelSalesAndPaymentCollection:any;  
  ThisMonthSalesAndPaymentCollection:any;
  ThisYearSalesAndPaymentCollection:any;

  //  temp1:any=[];
  // a:any=
  // [
  //   ['Copper', 8.94 ],
  //   ['Silver', 10.49],
  //   ['Gold', 19.3],
  //   ['Platinum', 21.45]];

  // [
  //   ['Copper', 8.94 ,'#b87333','Cu'],
  //   ['Silver', 10.49, 'silver','Ag'],
  //   ['Gold', 19.3,'gold','Au'],
  //   ['Platinum', 21.45,'color: #e5e4e2','Pt' ]];
  // d1: DashboardData =new DashboardData();
  
  constructor(public service : ReportServiceService ,private router: Router, public helper: HelperService)
   { 
    //  if(helper.Admintype)
    //  {
    this.Data=this.service.GetDashbordData().subscribe((data)=>{this.Data = data

      this.TotelSalesAndPaymentCollection=[['Sales',this.Data[0].totelSeles],['Payment Collection',this.Data[0].totelPaymentCollestions]];
      this.ThisMonthSalesAndPaymentCollection=[['Sales',this.Data[0].salesMonthly],['Payment Collection',this.Data[0].paymentCollestionsMonthly]];
      this.ThisYearSalesAndPaymentCollection=[['Sales',this.Data[0].salesYearly],['Payment Collection',this.Data[0].paymentCollestionsYearly]]

      this.TotelSalesAndPaymentCollectionpie=[['Payment Collection',this.Data[0].totelPaymentCollestions],['Due Payments',(this.Data[0].totelSeles-this.Data[0].totelPaymentCollestions)]];
      
  
      // var tempdata =[];
      // var tempdata1 =[];
      // var tempdata2 =[];
      // tempdata.push("sales");
      // tempdata.push(this.Data[0].totelSeles);
      // tempdata2.push(tempdata);
      // tempdata1.push("Payment Collection");
      // tempdata1.push(this.Data[0].totelPaymentCollestions);
      // tempdata2.push(tempdata1);
      // this.temp1=tempdata2;
      // console.log(this.temp1);
  
    });
    //  }
    //  else{
    //   this.router.navigate(["/ListInvoice"]);    
    //  }
  }

  //Demo
  public charts: {
    title: string;
    type: ChartType;
    typepie: ChartType;
    typeColumn: ChartType;
    data: any[][];
    columns?: Column[];
    columns1?: Column[];
    options?: {};
    options1?: {};
    options2?: {};
    
  }[] = [];

  public Chart = {
    titleTotel: 'Totel Sales & Payment Collections',
    titlePieTotel: 'Payment Collections & Due Payments',
    titleMonthly: 'This Month Sales & Payment Collections',
    titleYearly: 'This year Sales & Payment Collections',
    titleColumnchart:'Month wise Sales & Payment Collections',
    titleMonthwisesales:'Month wise Sales ',
    titleMonthwisepaymentcollection:'Month wise Payment Collections',
    
    type: ChartType.BarChart,
    typepie: ChartType.PieChart,
    typeCombo: ChartType.ComboChart,
    typeCombo1: ChartType.Bar,
    typeColumn: ChartType.ColumnChart,
   // data:[],
    //this.a,
//    this.temp1,
    columns: ['Name', '$'],
    columns1: ['Month', 'Sales','Payment collection'],
    
    //columns: [{label:'Element', type: 'string'} , {label:'Density',type: 'number'}, { role: 'style' }, { role: 'annotation' }],
    //columns: ['Element', 'Density', { role: 'style' }, { role: 'annotation' }],
    options: {
      isStacked: true,
      'is3D':true,
     // height: 300,
     //legend: {position: 'left'},   
     // legend: {position: 'top', maxLines: 3},
  //    vAxis: {minValue: 0},
      animation: {
        duration: 1500,
        easing: 'ease-in-out',
        startup: true,
      },     
   //   vAxis: {minValue: 0}
    // vAxis: { 
    //     viewWindow: {
    //         min:0
    //     }
    // }
    // vAxes: {
    //   0: {baseline: 0},
    // },

    },

    // options1:{
    //   series: {
    //     0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
    //     1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
    //   },
    //   axes: {
    //     y: {
    //       distance: {label: 'parsecs'}, // Left y-axis.
    //       brightness: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
    //     }
    //   }
    // },


    options2 : {
      chart: {
        title: 'Month wise Sales & Payment Collections',
    //    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
      bars: 'vertical',
      vAxis: {format: 'decimal'},
      height: 400,
      colors: ['#1b9e77', '#d95f02']
    },



    options1: {
      // seriesType: 'bars',
      // series: {2: {type: 'line'}},
      // series: {
      //   0: {targetAxisIndex: 0},
      //   1: {targetAxisIndex: 1}
      // },
      // vAxes: {
      //   // Adds titles to each axis.
      //   0: {title: 'Sales'},
      //   1: {title: 'Payment Collections'}
      // },
   
      isStacked: true,
      hAxis: {
        title: 'Month',
        type: 'date',
        format: 'MMM-yy'        
      },
      
      // vAxis: {
      //   title: 'Sales & Payment',
      //   // gridlines: {
      //   //   count: 10
      //   // },
      //   // step: 1,
      // },
      formatters: {
        date: [
          {
            pattern: '"MMM-yy"',
          }
        ],
      },
      animation: {
        duration: 1500,
        easing: 'ease-in-out',
        startup: true,
      },     
    },
    colors: ['#1b9e77', '#d95f02']
  
  };

  
  //demo end


// Chart Demo
//  public lineChartData: ChartDataSets[] = [
//    { data: [ 80, 81, 10, 55, 40,100,10], label: 'Series A' },
//  ];
//  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//   //  public lineChartOptions: (ChartOptions & { annotation: any }) = {
//   // responsive: true,
//   // };
//  public lineChartColors: Color[] = [
//    {
//      borderColor: 'black',
//      backgroundColor: 'rgba(255,0,0,0.3)',
//    },
//  ];
//  public lineChartLegend = true;
//  public lineChartType = 'line';
//  public lineChartPlugins = [];


//

  ngOnInit(): void {
    this.GetChartDataSales();

  }
  //chart
  // lineChartData: ChartDataSets[] = [
  //   { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';
  
  //

  // public chartOptions = {
	// 	scales: {
	// 		xAxes: [
	// 			{
	// 				type: 'time',
	// 				time: {
	// 					unit: 'day',
	// 					displayFormats: {
	// 						day: 'MMM YYYY', // This is the default
	// 					},
	// 				},
	// 			},
	// 		]
	// 	}
  // }
  datalength:number;
  GetChartDataSales(){   
    this.data1=this.service.GetChartDataSales().subscribe((data)=>{this.data1 = data
      this.datalength=this.data1.length;
      var temp1=[];
      var temp2=[];
      var temp3=[];
    if(this.data1 != null && this.datalength >0){
      for(var i=0;i<this.datalength;i++)
      {
        var temp = [];
        temp.push(new Date(this.data1[i].dates));
        temp.push(this.data1[i].sales);
        temp.push((this.data1[i].paymentCollection))
        temp1.push(temp);
        var temp11 = [];
        temp11.push(new Date(this.data1[i].dates));
        temp11.push(this.data1[i].sales);
        temp2.push(temp11);
        var temp22 = [];
        temp22.push(new Date(this.data1[i].dates));
        temp22.push((this.data1[i].paymentCollection))
        temp3.push(temp22);
      }
    }    
    this.temp=temp1;
    this.temp1=temp2;
    this.temp2=temp3;
    
    console.log([this.temp])    
    });
  }

  GetDashbordData(){   
    this.Data=this.service.GetDashbordData().subscribe((data)=>this.Data = data);
  }
}
