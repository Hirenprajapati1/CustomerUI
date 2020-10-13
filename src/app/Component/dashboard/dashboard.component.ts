import { ReportServiceService } from './../../Services/report-service.service';
import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Data: any;
  data:any;
  // d1: DashboardData =new DashboardData();
  constructor(public service : ReportServiceService) { 
    this.Data=this.service.GetDashbordData().subscribe((data)=>this.Data = data);
    
  }
 
// Chart Demo
// public lineChartData: ChartDataSets[] = [
//   { data: [ 80, 81, 56, 55, 40,100,100,200,900,10], label: 'Series A' },
// ];
// public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// //  public lineChartOptions: (ChartOptions & { annotation: any }) = {
// //    responsive: true,
// //  };
// public lineChartColors: Color[] = [
//   {
//     borderColor: 'black',
//     backgroundColor: 'rgba(255,0,0,0.3)',
//   },
// ];
// public lineChartLegend = true;
// public lineChartType = 'line';
// public lineChartPlugins = [];


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
  GetChartDataSales(){   
    this.data=this.service.GetChartDataSales().subscribe((data)=>this.data = data);
  }

  GetDashbordData(){   
    this.Data=this.service.GetDashbordData().subscribe((data)=>this.Data = data);
  }
}
