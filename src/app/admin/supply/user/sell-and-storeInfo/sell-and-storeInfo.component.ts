import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../../service';
@Component({
    selector: 'admin-sell-store',
    templateUrl: './sell-and-storeInfo.component.html',
    styleUrls: ['./sell-and-storeInfo.component.scss']
})
export class sellStoreComponent implements OnInit {
    UserManagementContractInstance;
    AdminManagementContractInstance;
    registerAccounts;
    registerInfo;
    stockInInfo;
    stockOutInfo;
    basicStock={
        name:''
    }
    user={
        account:'',
        password:1,
    }
    stockName;
    buyer;
    seller;
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
    searchStockBasicInfo(){
        let acc=this.user.account;
        let stockName=this.stockName;
        this.web3Service.searchStockBasicInfo(acc,stockName);
    }
    searchStockInInfo() {
        let acc=this.user.account;
        let seller=this.seller;
        this.stockInInfo=this.web3Service.searchStockInInfo(acc,seller);
        // console.log(this.stockInInfo);
    }
    searchStockOutInfo() {
        let acc=this.user.account;
        let buyer=this.buyer;
        this.stockOutInfo=this.web3Service.searchStockOutInfo(acc,buyer);
        console.log(this.stockOutInfo);
    }

}
