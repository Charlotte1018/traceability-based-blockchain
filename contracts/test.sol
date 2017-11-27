pragma solidity ^0.4.8;
contract main{
    mapping (string => newContract) newContractAddress;
    string public nameContract ;
    newContract public Contractaddress;
    newContract public Address;
    function addContract(string name){
        newContractAddress[name]=new newContract();
        Contractaddress=newContractAddress[name];
        nameContract =name;
    }
    function getMapping(string name)returns(newContract){
        Address= newContractAddress[name];
        return newContractAddress[name];
    }
}

contract newContract{
     
     function add(string b ) returns (string){
         return b;
     }
}