import { Injectable } from "@angular/core";
import { stringify } from "querystring";
//ABI
import { ManagementAbi } from '../mockdata/ManagementAbi';
import { StockCodeAbi } from '../mockdata/StockCodeAbi';

let Web3 = require('web3');
@Injectable()
export class Web3Service {
    public web3;
    public ManagementAbi = ManagementAbi;
    public StockCodeAbi = StockCodeAbi;
    public ManagementContractAddress = '0x392b366D6E51D803bc0cEC13C03c8c19686e2BF6';
    public ManagementContractInstance;
    public StockCodeContractAddress = '0xA7cf324d5ffD7F6217D47Aec0a481694E4Fb1B75';
    public StockCodeContractInstance;
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
        return this.web3;
    }
    getManagementAbi(): any {
        fetch('../../../build/contracts/Management.json').then((res) => {
            return res.json();
        }).then((res) => {
            // this.ManagementAbi = JSON.stringify(res.abi);
            this.ManagementAbi = res.abi;
            console.log(this.ManagementAbi);
        })
    }
    getManagement(): any {
        let Management = {
            'ContractAddress': this.ManagementContractAddress,
            'abi': this.ManagementAbi
        }
        return Management;
    }
    getStockCodeAbi(): any {
        fetch('../../../build/contracts/StockCode.json').then((res) => {
            return res.json();
        }).then((res) => {
            // this.StockCodeAbi = JSON.stringify(res.abi);
            console.log(this.StockCodeAbi);
        })
    }
    getStockCode(): any {
        let StockCode = {
            'ContractAddress': this.StockCodeContractAddress,
            'abi': this.StockCodeAbi
        }
        return StockCode;
    }
    /**
    * 返回ManagementContractInstance实例
    * @returns {[*]}
    */
    getManagementContractInstance(): any {
        let ManagementContract = this.web3.eth.contract(this.ManagementAbi);
        this.ManagementContractInstance = ManagementContract.at(this.ManagementContractAddress);
        return this.ManagementContractInstance;
    }
    /**
    * 返回StockCodeContractInstance实例
    * @returns {[*]}
    */
    getStockCodeContractInstances(StockName): any {
        let coinbase=this.web3.eth.accounts[0];
        this.unLockAccount(coinbase,"1");
        this.ManagementContractInstance.getstockCodeAddress(StockName,{
            from: coinbase,
            gas: 10000000
        });
    }
    getStockCodeContractInstance(){
        let testStockCode=this.ManagementContractInstance.testStockCode.call();
        // let StockCodeContractAddress=testStockCode||this.StockCodeContractAddress;
        let StockCodeContractAddress=testStockCode;
        let StockCodeContract = this.web3.eth.contract(this.StockCodeAbi);
        this.StockCodeContractInstance = StockCodeContract.at(StockCodeContractAddress);
        return this.StockCodeContractInstance;
    }
    unLockAccount(acc:any,password:string):void{
        this.web3.personal.unlockAccount(acc,password);
    }
    addStock(StockName){
        let coinbase=this.web3.eth.accounts[0];
        this.unLockAccount(coinbase,"1");
        this.ManagementContractInstance.addStock(StockName,{
            from: coinbase,
            gas: 10000000
        });
    }
    newRootCode(rootCode:any) {
        let coinbase=this.web3.eth.accounts[0];
        let rootOrganizationCode=rootCode.rootOrganizationCode;
        let rootStockCode=rootCode.rootStockCode;
        let rootCloseTime=rootCode.rootCloseTime;
        let rootId=rootCode.rootId;
        this.unLockAccount(coinbase,"1");
        this.ManagementContractInstance.newRootCode(rootOrganizationCode,rootStockCode,
            rootCloseTime,rootId,{
            from: coinbase,
            gas: 10000000
        });
    }
}