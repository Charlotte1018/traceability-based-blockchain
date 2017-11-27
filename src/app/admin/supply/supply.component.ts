import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {
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
