import { Component, OnInit ,HostListener} from '@angular/core';

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
  @HostListener('window:resize', ['$event.target']) 
  ngResize() { 
    this.minheight=window.screen.height-200-15;
  }
  heightResize(){
    this.minheight=window.screen.height-200-15;
  }


}
