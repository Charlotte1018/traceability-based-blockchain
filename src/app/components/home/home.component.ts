import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  forms=[
    {
      name:'用户名',
      placeholder:'请输入用户名'
    },
    {
      name:'密码',
      placeholder:'请输入密码'
    },
    {
      name:'用户名',
      placeholder:'请输入用户名'
    },
    {
      name:'密码',
      placeholder:'请输入密码'
    },
  ];
  
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    
    console.log('Hello Home');
  }

}
