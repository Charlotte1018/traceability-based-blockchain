import { Component, OnInit ,HostListener} from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  minheight;
  constructor() {
  }
  @HostListener('window:resize', ['$event.target']) 
  ngResize() { 
    this.minheight=window.screen.height-200-15;
  }
  ngOnInit() {
    this.heightResize();
  }
  heightResize(){
    this.minheight=window.screen.height-200-15;
  }


}
