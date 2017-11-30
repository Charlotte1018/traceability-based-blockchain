import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../../service';
@Component({
    selector: 'admin-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
    UserManagementContractInstance;
    AdminManagementContractInstance;
    registerAccounts;
    registerInfo;
    constructor(private web3Service: Web3Service) {
        // Do stuff
    }
    web3;
    ngOnInit() {
        this.getWeb3();
        this.getRegister();
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
    getRegister() {
        this.registerAccounts = this.web3Service.getRegister();
        console.log(this.registerAccounts);
    }
    approved(register) {
        this.web3Service.approved(register);
        console.log(register);
    }
    reject(register) {
        console.log(register);
    }
    search(acc) {
        this.registerInfo=this.web3Service.searchRegisterInfo(acc);
        console.log(this.registerInfo);
    }

}
