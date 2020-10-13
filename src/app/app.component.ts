import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerUI';
  constructor(private router: Router) { }

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
