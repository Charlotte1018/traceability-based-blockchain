import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  minheight;
  constructor() {
  }

  ngOnInit() {
    this.heightResize();
  }
  heightResize(){
    this.minheight=window.screen.height-200-15;
  }


}
