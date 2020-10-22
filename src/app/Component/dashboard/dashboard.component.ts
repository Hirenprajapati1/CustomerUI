import { ReportServiceService } from './../../Services/report-service.service';
import { Component, OnInit } from '@angular/core';
import { Color, Label, ThemeService } from 'ng2-charts';
//import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import {  ChartType, Column } from 'angular-google-charts';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Data: any;
  data1:any;
  temp:any=[];
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
  constructor(public service : ReportServiceService) { 
    this.Data=this.service.GetDashbordData().subscribe((data)=>{this.Data = data

      this.TotelSalesAndPaymentCollectionpie=[['Payment Collection',this.Data[0].totelPaymentCollestions],['Due Payments',(this.Data[0].totelSeles-this.Data[0].totelPaymentCollestions)]];

      this.TotelSalesAndPaymentCollection=[['Sales',this.Data[0].totelSeles],['Payment Collection',this.Data[0].totelPaymentCollestions]];
      this.ThisMonthSalesAndPaymentCollection=[['Sales',this.Data[0].salesMonthly],['Payment Collection',this.Data[0].paymentCollestionsMonthly]];
      this.ThisYearSalesAndPaymentCollection=[['Sales',this.Data[0].salesYearly],['Payment Collection',this.Data[0].paymentCollestionsYearly]]
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
    
  }

  //Demo
  public charts: {
    title: string;
    type: ChartType;
    typepie: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];

  public Chart = {
    titleTotel: 'Totel Sales & Payment Collections',
    titlePieTotel: 'Totel Sales & Payment Collections',
    titleMonthly: 'This Month Sales & Payment Collections',
    titleYearly: 'This year Sales & Payment Collections',
    type: ChartType.BarChart,
    typepie: ChartType.PieChart,

    data:[],
    //this.a,
//    this.temp1,
    columns: ['Element', 'Density'],
    //columns: [{label:'Element', type: 'string'} , {label:'Density',type: 'number'}, { role: 'style' }, { role: 'annotation' }],
    //columns: ['Element', 'Density', { role: 'style' }, { role: 'annotation' }],
    options: {
      animation: {
        duration: 1500,
        easing: 'ease-in-out',
     //   startup: true
      }
    }
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
    if(this.data1 != null && this.datalength >0){
      for(var i=0;i<this.datalength;i++)
      {
        var temp = [];
        temp.push(this.data1[i].dates);
        temp.push(this.data1[i].sales);
    //    temp.push(this.data1[i].PaymentCollection)
        temp1.push(temp);
      }
    }    
    this.temp=temp1;
    console.log([this.temp])    
    });
  }

  GetDashbordData(){   
    this.Data=this.service.GetDashbordData().subscribe((data)=>this.Data = data);
  }
}
