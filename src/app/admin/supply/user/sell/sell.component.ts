import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../../service';
@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  UserManagementContractInstance;
  AdminManagementContractInstance;
  public sell = {
    account: '',
    password: '',
    _buyer: '',
    _buyerName: '',
    _stockName: '',
    _quantity: 1
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
  sells() {
    let sell = this.sell;
    this.web3Service.sell(sell);
    console.log(this.sell);
  }

}
