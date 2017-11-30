import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../../service';
@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  UserManagementContractInstance;
  AdminManagementContractInstance;
  public store = {
    account: '',
    password: '',
    _seller: '',
    _sellerName: '',
    _stockName: '',
    _quantity: 1,
    _qrCode:1
  };
  constructor(private web3Service: Web3Service) {
    // Do stuff
  }
  web3;
  ngOnInit() {
    this.getWeb3();
  }
  getContractInstance() {
    this.AdminManagementContractInstance = this.web3Service.getAdminManagementContractInstance();
    this.UserManagementContractInstance = this.web3Service.getUserManagementContractInstance();
    console.log(this.UserManagementContractInstance);
  }
  getWeb3() {
    this.web3Service.connect('http://localhost:8545');
    this.web3 = this.web3Service.web3;
  }
  unLockAccount(acc: any, password: string): void {
    this.web3.personal.unlockAccount(acc, password);
  }
  stores() {
    let store = this.store;
    this.web3Service.store(store);
    console.log(this.store);
  }

}
