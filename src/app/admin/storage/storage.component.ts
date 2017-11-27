import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
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
