pragma solidity ^0.4.18;

/**
 * 涉粮企业管理合约
 * 主要功能：注册，入库管理，出库管理
 * 
 */ 
contract UserManagement{
    
    AdminManagement public adminManagement;
    CoStockBasicInformation public coStockBasicInformation;
    StockIn public stockIn;
    StockOut public stockOut;
    
    function UserManagement(){
        adminManagement = new AdminManagement(msg.sender);
    }
    
    
    modifier OnlyRegistered(){
        if (!adminManagement.getResisterStatus(msg.sender)) throw;
        _;
    }
    
    
    /**
     * 用户注册申请
     * 
     */
    function register(string coName,string coAddress,string corpName,uint corpId,uint tel,uint fax){
        Register _register = new Register(msg.sender);
        _register.register(coName,coAddress,corpName,corpId,tel,fax);
       adminManagement.setRegisterAddress(msg.sender,_register);
    }
    
    
    /**
     * 仓库基本信息注册
     * 
     */
     function registerBasicInfo(string stockName,uint stockId,string stockType,uint inventory,
                                uint stockNum,uint storeRoomNum,uint posNum) OnlyRegistered {
         coStockBasicInformation = new CoStockBasicInformation(msg.sender);
         coStockBasicInformation.registerBasicInfo(stockName,stockId,stockType,inventory,stockNum,storeRoomNum,posNum);
         stockIn = new StockIn(msg.sender);
         stockOut = new StockOut(msg.sender);
         adminManagement.setStockOutAddress(msg.sender,stockOut);
         adminManagement.setStockInAddress(msg.sender,stockIn);
         adminManagement.setStockBasicAddress(msg.sender,coStockBasicInformation);
     }
     
     
    /**
     * 出库
     * 
     */ 
     function sell(address _buyer,string stockName,uint quantity) OnlyRegistered {
         stockOut = StockOut(adminManagement.getStockOutAddress(msg.sender));
         coStockBasicInformation = CoStockBasicInformation(adminManagement.getStockBasicAddress(msg.sender));
         stockOut.sell(msg.sender,coStockBasicInformation,_buyer,stockName,quantity);
     }
    
    
    
}

/**
 * 系统管理员管理合约
 * 主要功能：管理用户注册
 * 
 */ 
contract AdminManagement{
    
    mapping(address => Register) public registerAddress;
    mapping(address => StockOut) public stockOutAddress;
    mapping(address => StockIn) public stockInAddress;
    mapping(address => CoStockBasicInformation) public stockBasicAddress;
    
    //用于遍历mapping中所有数据
    //此处遍历所有申请注册的用户
    address[] public addressArrays;
    
    address administrator;
    
    
    
    function AdminManagement(address _administrator){
        administrator = _administrator;
    }
    
    
    modifier OnlyAdministrator(){
        if(msg.sender != administrator) throw;
        _;
    }
    
     /**
     * 管理员处理注册信息
     * 
     */ 
    function reject(address _applicant) OnlyAdministrator{
        Register register = Register(registerAddress[_applicant]);
        register.reject();
    }
    
    function approved(address _applicant) OnlyAdministrator{
        Register register = Register(registerAddress[_applicant]);
        register.approved();
    }
    
    
    function setRegisterAddress(address _applicant,Register _register){
        registerAddress[_applicant] = _register;
        addressArrays.push(_applicant);
    }
    
    
    function setStockOutAddress(address _user,StockOut _stockOut){
        stockOutAddress[_user] = _stockOut;
    }
    
    
    function setStockInAddress(address _user,StockIn _stockIn){
        stockInAddress[_user] = _stockIn;
    }
    
    
    function setStockBasicAddress(address _user,CoStockBasicInformation _stockBasicInfo){
        stockBasicAddress[_user] = _stockBasicInfo;
    }
    
    
    function getStockOutAddress(address _user) returns(StockOut){
        StockOut stockOut = stockOutAddress[_user];
        return stockOut;
    }
    
    
    function getStockInAddress(address _user) returns(StockIn){
        StockIn stockIn = stockInAddress[_user];
        return stockIn;
    }
    
    
    function getStockBasicAddress(address _user) returns(CoStockBasicInformation){
        CoStockBasicInformation stockBasicInfo = stockBasicAddress[_user];
        return stockBasicInfo;
    }
    
    
    function getResisterStatus(address _applicant) returns(bool){
        Register register = Register(registerAddress[_applicant]);
        bool flag = register.getResisterStatus();
    }
    
}

/**
 * 企业仓库信息合约
 * 主要功能：存储企业仓库基本信息
 * 
 */ 
contract CoStockBasicInformation{
    
    using StringUtils for *;
    
    address public owner;
    //仓库
    mapping(string => StockBasicInfo) stocks;
    string[] public stockName;
    
    struct StockBasicInfo{
       uint stockId;
       string stockType;
       uint stockNum;
       uint inventory;
       uint storeRoomNum;
       uint posNum;
       //此处需要拼接！！！！！！
       uint posCode;
    }
    
    
    function CoStockBasicInformation(address _owner){
        owner = _owner;
    }
    
    
    function registerBasicInfo(string _stockName,uint _stockId,string _stockType,uint _inventory,
                                uint _stockNum,uint _storeRoomNum,uint _posNum){
        for(uint i = 0 ; i < stockName.length ; i++ ){
            if(StringUtils.equal(stockName[i],_stockName)) throw;
        }
        stockName.push(_stockName);
        stocks[_stockName].stockId = _stockId;
        stocks[_stockName].stockType = _stockType;
        stocks[_stockName].inventory = _inventory;
        stocks[_stockName].stockNum = _stockNum;
        stocks[_stockName].storeRoomNum = _storeRoomNum;
        stocks[_stockName].posNum = _posNum;
    }
    
    
    function getStock(){
        
    }
    
    
    
    
    
}

/**
 * 用户注册合约
 * 主要功能：注册业务具体实现
 * 
 */ 
contract Register{
    
    enum RegisterStatus{Auditing,Reject,Approved}
    RegisterStatus public registerStatus;
    address public owner;
    
    
    //企业注册基本信息
    string public coName;
    string public coAddress;
    string public corpName;
    uint public corpId;
    uint public tel;
    uint public fax;
    
    
    function Register(address _owner){
        owner = owner;
    }
    
   
    function register(string _coName,string _coAddress,string _corpName,uint _corpId,uint _tel,uint _fax){
        coName = _coName;
        coAddress = _coAddress;
        corpName = _corpName;
        corpId = _corpId;
        tel = _tel;
        fax = _fax;
        registerStatus = RegisterStatus.Auditing;
    }
    
    
    function checkRegister() returns(string _coName,string _coAddress){
        _coName = coName;
        _coAddress = coAddress;
    }
    
    
    function reject(){
        registerStatus = RegisterStatus.Reject;
    }
    
    
    function approved(){
        registerStatus = RegisterStatus.Approved;
    }
    
    
    function getResisterStatus() returns(bool){
        if(registerStatus == RegisterStatus.Auditing || registerStatus == RegisterStatus.Reject){
            return false;
        }else{
            return true;
        }
    }
    

}


/**
 * 入库管理合约
 * 主要功能
 * 
 */ 
contract StockIn{
    
    address public owner;
    
   
    
    function StockIn(address _owner){
        owner = _owner;
    }
    
    
    
}

/**
 * 出库管理合约
 * 主要功能
 * 
 */ 
contract StockOut{
    
    CoStockBasicInformation public coStockBasicInformation;
    
    address public owner;
    uint public sellID = 0;
    
    //销售记录
    //记录编号 => (买家 => 出货单详情)
    mapping(uint => mapping(address => StockOutInfo)) sellRecord;
    
    struct StockOutInfo{
        string stockName;
        address buyer;
        string buyerName;
        uint quantity;
        uint qualityId;
    }
    
    
    function StockOut(address _owner){
        owner = _owner;
    }
    
    
    function sell(CoStockBasicInformation _stockBasicInfo,address _buyer,string _stockName,uint _quantity){
        _stockBasicInfo.getStock();
        
    }
}

library StringUtils {
    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function compare(string _a, string _b) returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string _a, string _b) returns (bool) {
        return compare(_a, _b) == 0;
    }
    /// @dev Finds the index of the first occurrence of _needle in _haystack
    function indexOf(string _haystack, string _needle) returns (int)
    {
    	bytes memory h = bytes(_haystack);
    	bytes memory n = bytes(_needle);
    	if(h.length < 1 || n.length < 1 || (n.length > h.length)) 
    		return -1;
    	else if(h.length > (2**128 -1)) // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
    		return -1;									
    	else
    	{
    		uint subindex = 0;
    		for (uint i = 0; i < h.length; i ++)
    		{
    			if (h[i] == n[0]) // found the first char of b
    			{
    				subindex = 1;
    				while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
    				{
    					subindex++;
    				}	
    				if(subindex == n.length)
    					return int(i);
    			}
    		}
    		return -1;
    	}	
    }
}

