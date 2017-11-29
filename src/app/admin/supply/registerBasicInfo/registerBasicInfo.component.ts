import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../service';
@Component({
  selector: 'register',
  templateUrl: './registerBasicInfo.component.html',
  styleUrls: ['./registerBasicInfo.component.scss']
})
export class RegisterBasicInfoComponent implements OnInit {
  UserManagementContractInstance;
  AdminManagementContractInstance;
  public registerBasicInfo = {
    account: '',
    password: '',
    _stockName: '',
    _stockId: 1,
    _stockType: '',
    _inventory: 1,
    _stockNum: 1,
    _storeRoomNum: 1,
    _posNum: 1,
    _qrCode: 1,
  };
  constructor(private web3Service: Web3Service) {
    // Do stuff
  }
  web3;
  ngOnInit() {
    this.getWeb3();
    this.web3Service.getRegister();
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
  register() {
    let register = this.registerBasicInfo;
    this.web3Service.registerBasicInfo(register);
    console.log(this.registerBasicInfo);
  }

}
