import { VERSION } from '@angular/cdk';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 public appVersion = VERSION;
 
  constructor() { }

  ngOnInit(): void {
  }

}
