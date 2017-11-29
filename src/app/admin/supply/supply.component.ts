import { Component, OnInit, HostListener } from '@angular/core';
import { Web3Service } from '../../service';
@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss'],
  providers: [Web3Service]
})
export class SupplyComponent implements OnInit {
  minheight = window.screen.height - 200 - 15;
  web3;
  UserManagementContractInstance;
  AdminManagementContractInstance;
  constructor(private web3Service: Web3Service) {
  }
  ngOnInit() {
    this.getWeb3();
    this.getUserManagementContractInstance();
    this.getAdminManagementContractInstance();
  }
  @HostListener('window:resize', ['$event.target'])
  ngResize() {
    this.minheight = window.screen.height - 200 - 15;
  }
  getWeb3() {
    this.web3Service.connect('http://localhost:8545');
    this.web3 = this.web3Service.web3;
  }
  getUserManagementContractInstance() {
    this.UserManagementContractInstance = this.web3Service.UserManagementContractInstance;
  }
  getAdminManagementContractInstance() {
    this.AdminManagementContractInstance = this.web3Service.AdminManagementContractInstance;
  }

}
