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
    registerNum = 5;
    registerAccounts;
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
     * 解锁账户
     * @param account
     * @param password
     * @returns {[*]}
     */
    unLockAccount(account?: any, password?: string): void {
        this.web3.personal.unlockAccount(account, password);
    }
    /**
     * 用户管理-----------------------------------------------------------------
     */
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
     * 用户注册信息
     * registerInfo ={coName:'',coAddress:'',corpName:'',corpId:'',tel:'',fax:'',};
     * @param register
     * @param account
     * @param password
     * @returns {[*]}
     */
    Register(register: any) {
        // let UserManagementContractInstance = this.UserManagementContractInstance;
        let UserManagementContract = this.web3.eth.contract(UserManagementAbi);
        let UserManagementContractInstance = UserManagementContract.at(this.UserManagementAbiAddress);
        this.unLockAccount(register.account, register.password);
        UserManagementContractInstance.register(
            register.coName,
            register.coAddress,
            register.corpName,
            register.corpId,
            register.tel,
            register.fax,
            {
                from: register.account,
                gas: 10000000
            });
    }
    /**
     * 注册仓库信息
     * registerBasicInfo ={account：'',password:'',coName:'',coAddress:'',corpName:'',corpId:'',tel:'',fax:'',};
     * @param registerBasicInfo
     * @returns {[*]}
     */
    registerBasicInfo(registerBasicInfo) {
        let params = registerBasicInfo;
        let UserManagementContract = this.web3.eth.contract(UserManagementAbi);
        let UserManagementContractInstance = UserManagementContract.at(this.UserManagementAbiAddress);
        // let UserManagementContractInstance = this.UserManagementContractInstance;
        this.unLockAccount(params.account, params.password);
        UserManagementContractInstance.registerBasicInfo(
            params._stockName,
            params._stockId,
            params._stockType,
            params._inventory,
            params._stockNum,
            params._storeRoomNum,
            params._posNum,
            params._qrCode,
            {
                from: params.account,
                gas: 10000000
            });

    }
    /**
         * 注册仓库信息
         * registerBasicInfo ={account：'',password:'',coName:'',coAddress:'',corpName:'',corpId:'',tel:'',fax:'',};
         * @param sell
         * @returns {[*]}
         */
    sell(sell) {
        let params = sell;
        let UserManagementContractInstance = this.UserManagementContractInstance;
        this.unLockAccount(params.account, params.password);
        UserManagementContractInstance.sell(
            params._buyer,
            params._buyerName,
            params._stockName,
            params._quantity,
            {
                from: params.account,
                gas: 10000000
            });

    }
    /**
         * 注册仓库信息
         * registerBasicInfo ={account：'',password:'',coName:'',coAddress:'',corpName:'',corpId:'',tel:'',fax:'',};
         * @param store
         * @returns {[*]}
         */
    store(store) {
        let params = store;
        let UserManagementContractInstance = this.UserManagementContractInstance;
        this.unLockAccount(params.account, params.password);
        UserManagementContractInstance.store(
            params._seller,
            params._sellerName,
            params._stockName,
            params._quantity,
            params._qrCode,
            {
                from: params.account,
                gas: 10000000
            });

    }

    /**
     * 管理员管理-----------------------------------------------------------------
     */

    /**
    * 返回UserManagementContractInstance实例
    * @returns {[*]}
    */
    getAdminManagementContractInstance(): any {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        this.AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        return this.AdminManagementContractInstance;
    }
    getRegister() {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let addressArrays = [];
        for (let i = 0; i < this.registerNum; i++) {
            addressArrays[i] = AdminManagementContractInstance.addressArrays.call(i);
        }
        console.log(addressArrays);
        this.registerAccounts = addressArrays;
        return addressArrays;
    }
    register(account){
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        AdminManagementContractInstance.reject(account,{
            from:AdminManagementContractInstance.administrator.call(),
            gas:10000000
        });
    }
    approved(account){
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        AdminManagementContractInstance.approved(account,{
            from:AdminManagementContractInstance.administrator.call(),
            gas:10000000
        });
    }
    getStockBasicAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockBasicAddress= AdminManagementContractInstance.stockBasicAddress.call(account);
        
    }

    getStockInAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockInAddress= AdminManagementContractInstance.stockInAddress.call(account);
    }
    getStockOutAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockOutAddress= AdminManagementContractInstance.stockOutAddress.call(account);
    }


}