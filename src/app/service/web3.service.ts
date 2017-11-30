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
    public UserManagementAbiAddress = '0x89034922E31868ff6A74F1EE7e0bFe62cDD89Ade';
    public UserManagementContractInstance;
    public AdminManagementAddress = '0xE11faEB11a188eB585932ba4406399b3C9641306';
    public AdminManagementContractInstance;
    registerNum = 5;
    registerAccounts;
    // coinbase=this.web3.eth.accounts[0];
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
        // let UserManagementContractInstance = this.UserManagementContractInstance;
        let UserManagementContract = this.web3.eth.contract(UserManagementAbi);
        let UserManagementContractInstance = UserManagementContract.at(this.UserManagementAbiAddress);
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
        let UserManagementContract = this.web3.eth.contract(UserManagementAbi);
        let UserManagementContractInstance = UserManagementContract.at(this.UserManagementAbiAddress);
        // let UserManagementContractInstance = this.UserManagementContractInstance;
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
        let addressArraysNum = AdminManagementContractInstance.addressArraysNum.call().toNumber();
        for (let i = 0; i < addressArraysNum; i++) {
            addressArrays[i] = AdminManagementContractInstance.addressArrays.call(i);
        }
        this.registerAccounts = addressArrays;
        // let registerAccounts = new Set(addressArrays);
        console.log('注册的账户个数', addressArraysNum);
        console.log('注册的账户', addressArrays);
        return addressArrays;
    }
    register(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        AdminManagementContractInstance.reject(account, {
            from: AdminManagementContractInstance.administrator.call(),
            gas: 10000000
        });
    }
    searchRegisterInfo(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let contractAddress = AdminManagementContractInstance.registerAddress.call(account);

        let registerInfoContract = this.web3.eth.contract(RegisterAbi);
        let registerInfoContractInstance = registerInfoContract.at(contractAddress);
        let registerInfo = registerInfoContractInstance.registerInfo.call();
        console.log(registerInfoContract);
        return registerInfo;
    }
    searchStockBasicInfo(account,stockName) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let contractAddress = AdminManagementContractInstance.stockBasicAddress.call(account);

        let Contract = this.web3.eth.contract(CoStockBasicInformationAbi);
        let ContractInstance = Contract.at(contractAddress);

        let stockNames = [];
        let stockNameNum = ContractInstance.stockNameNum.call().toNumber();
        for (let i=0; i < stockNameNum; i++) {
            stockNames[i] = ContractInstance.stockName.call(i);
        }
        console.log(stockNames);
    }
    searchStockInInfo(account, seller) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let contractAddress = AdminManagementContractInstance.stockInAddress.call(account);
        let Contract = this.web3.eth.contract(StockInAbi);
        let ContractInstance = Contract.at(contractAddress);
        let info = ContractInstance.storeRecordNum.call(seller).toNumber();
        console.log(info);
        // return info;
    }
    searchStockOutInfo(account, buyer) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let contractAddress = AdminManagementContractInstance.stockOutAddress.call(account);

        let Contract = this.web3.eth.contract(StockOutAbi);
        let ContractInstance = Contract.at(contractAddress);
        let info = ContractInstance.sellRecordNum.call(buyer);
        console.log(info);
        return info;
    }
    approved(account) {
        let coinbase = this.web3.eth.accounts[0];
        this.unLockAccount(coinbase, '1');
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        AdminManagementContractInstance.approved(account, {
            // from: AdminManagementContractInstance.administrator.call(),
            from: coinbase,
            gas: 10000000
        });
    }
    reject(account) {
        let coinbase = this.web3.eth.accounts[0];
        this.unLockAccount(coinbase, '1');
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        AdminManagementContractInstance.reject(account, {
            // from: AdminManagementContractInstance.administrator.call(),
            from: coinbase,
            gas: 10000000
        });
    }
    getStockBasicAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockBasicAddress = AdminManagementContractInstance.stockBasicAddress.call(account);

    }

    getStockInAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockInAddress = AdminManagementContractInstance.stockInAddress.call(account);
    }
    getStockOutAddress(account) {
        let AdminManagementContract = this.web3.eth.contract(AdminManagementAbi);
        let AdminManagementContractInstance = AdminManagementContract.at(this.AdminManagementAddress);
        let stockOutAddress = AdminManagementContractInstance.stockOutAddress.call(account);
    }


}