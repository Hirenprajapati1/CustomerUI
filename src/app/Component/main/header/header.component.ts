// import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

//var isnevbarshow;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// public  flag2:boolean;
Name:any;
Gender:any;
FullName:any;

@Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
public searchForm: FormGroup;


  constructor(private router: Router) { }


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

  
  ngOnInit(): void {
    this.GetName();
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });

  }





}
