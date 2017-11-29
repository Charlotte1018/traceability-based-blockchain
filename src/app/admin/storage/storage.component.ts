import { Component, OnInit ,HostListener} from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
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
