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
  forms = [
    {
      name: '企业名称',
      placeholder: '请输入企业名称',
      bind: this.registerInfo.coName
    },
    {
      name: '企业地址',
      placeholder: '请输入企业地址',
      bind: this.registerInfo.coAddress
    },
    {
      name: '企业法人代表',
      placeholder: '请输入企业法人代表',
      bind: this.registerInfo.corpName
    },
    {
      name: '企业法人身份证号',
      placeholder: '请输入企业法人代表身份证号',
      bind: this.registerInfo.corpId
    },
    {
      name: '电话',
      placeholder: '请输入电话',
      bind: this.registerInfo.tel
    },
    {
      name: '传真',
      placeholder: '请输入传真',
      bind: this.registerInfo.fax
    },
  ];

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
    let register = this.registerInfo;
    this.web3Service.Register(register);
    console.log(this.registerInfo);
    alert('用户注册成功，等待审核...');
  }

}
