import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  id: any;
  constructor(){
    this.visible=true;
  }
  // constructor(private route: ActivatedRoute) {  
  //   this.id = this.route.snapshot.params['id'];
  //   if(this.id == 'LoginPath' || this.id == 'LoginPathRegistration' ){
  //     this.visible = false;
  //   }
  //}

   hide() { this.visible = false; }

   show() { this.visible = true; }

   //toggle() { this.visible = !this.visible; }

}
