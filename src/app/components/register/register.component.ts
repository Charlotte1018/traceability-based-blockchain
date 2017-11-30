import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  UserManagementContractInstance;
  AdminManagementContractInstance;
  public registerInfo = {
    account: '',
    password: '',
    coName: '',
    coAddress: '',
    corpName: '',
    corpId: 1,
    tel: 1,
    fax: 1,
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
  register() {
    let register = this.registerInfo;
    this.web3Service.Register(register);
    console.log(this.registerInfo);
    alert('用户注册成功，等待审核...');
  }

}
