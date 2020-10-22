import { NavbarService } from './../Services/navbar.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent {
Name:any;
Gender:any;
FullName:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, public nav: NavbarService ) {
    this.GetName();
  }

GetName(){
this.Name=  localStorage.getItem('firstName')+' '+localStorage.getItem('lastName')
this.Gender =localStorage.getItem('gender');
if(this.Gender=='Male'){
this.FullName='Hello Mr.'+this.Name
}else if(this.Gender=='Female'){
this.FullName='Hello Miss.'+this.Name
}else{
this.FullName='Hello '+this.Name
}
}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/LoginPath']);
  }

}
