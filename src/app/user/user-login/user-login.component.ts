import { Component, OnInit, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public height;
  public width;
  constructor() {
    // Do stuff
  }
  @HostListener('window:resize', ['$event.target']) 
  ngResize() { 
    this.height=window.screen.height-40;
    this.width = window.screen.width;
  }
  ngOnInit() {
    console.log('Hello UserLoginComponent');
    this.resize();
  }
  resize(){
    this.height = window.screen.height-40;
    this.width = window.screen.width;
  }
}
