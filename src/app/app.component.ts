import { NavbarService } from './Services/navbar.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerUI';
  constructor(private router: Router,public nav: NavbarService) { }


  // title1 = 'Browser market shares at a specific website, 2014';
  // type = 'PieChart';
  // data = [
  //    ['Firefox', 45.0],
  //    ['IE', 26.8],
  //    ['Chrome', 12.8],
  //    ['Safari', 8.5],
  //    ['Opera', 6.2],
  //    ['Others', 0.7] 
  // ];
  // columnNames = ['Browser', 'Percentage'];
  // options = {    
  // };
  // width = 550;
  // height = 400;



  flag:boolean =true;
  
// // It should work, but I think it's far less comprehensive
// if(localStorage.getItem('token') == undefined || localStorage.getItem('token') == null )
// {
  
// }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/LoginPath']);
    this.flag=false;    
  }

}
