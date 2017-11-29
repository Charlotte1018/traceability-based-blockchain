import { Injectable } from "@angular/core";
import { stringify } from "querystring";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from 'rxjs/Subject';

//ABI
import {
    UserManagementAbi,
    AdminManagementAbi,
    CoStockBasicInformationAbi,
    RegisterAbi,
    StockInAbi,
    StockOutAbi
} from '../mockdata';

let Web3 = require('web3');
@Injectable()
export class Web3Service {
    public web3;
    public UserManagementAbiAddress = '0x2E72cb03A06aFaE952E965471a9c8b840D29132d';
    public UserManagementContractInstance;
    public AdminManagementAddress = '0xC20d4dCCaEfa881e51d4ad5A9d12D4267d9966c2';
    public AdminManagementContractInstance;
    /**
    * 连接geth客户端
    */
    connect(nodeAddress): any {
        this.web3 = new Web3(new Web3.providers.HttpProvider(nodeAddress));
        console.log('连接...', nodeAddress);
    }
    /**
    * 返回web3对象
    * @returns {[*]}
    */
    getWeb3(): any {
        // console.log(this.acc)
        return this.web3;
    }
    /**
    * 返回UserManagementContractInstance实例
    * @returns {[*]}
    */
    getUserManagementContractInstance(): any {
        let UserManagementContract = this.web3.eth.contract(UserManagementAbi);
        this.UserManagementContractInstance = UserManagementContract.at(this.UserManagementAbiAddress);
        return this.UserManagementContractInstance;
    }
    /**
    * 返回UserManagementContractInstance实例
    * @returns {[*]}
    */
    getAdminManagementContractInstance(): any {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        this.AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        return this.AdminManagementContractInstance;
    }
    /**
     * 用户注册信息
     * registerInfo ={
    coName:'',
    coAddress:'',
    corpName:'',
    corpId:'',
    tel:'',
    fax:'',
  };
     * @param register
     * @param account
     * @param password
     * @returns {[*]}
     */
    Register(register:any){
        let UserManagementContractInstance= this.UserManagementContractInstance;
        this.unLockAccount(register.account,register.password);
        UserManagementContractInstance.register(
            register.coName,
            register.coAddress,
            register.corpName,
            register.corpId,
            register.tel,
            register.fax,
            {
                from:register.account,
                gas:10000000
            });
    }

    /**
     * 解锁账户
     * @param account
     * @param password
     * @returns {[*]}
     */
    unLockAccount(account?: any, password?: string): void {
        this.web3.personal.unlockAccount(account, password);
    }
}