pragma solidity ^0.4.10;

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
    StringUtils public stringUtils;
    
    function UserManagement(){
        stringUtils = new StringUtils();
        adminManagement = new AdminManagement(msg.sender,stringUtils);
    }
    
    /**
     * 判断是否注册
     * 
     */ 
    modifier WhetherRegistered(uint flag){
        if (flag == 0){
            if (!adminManagement.getResisterStatus(msg.sender)) return;
            _;
        } else if(flag == 1) {
           if(adminManagement.weatherRepetition(msg.sender) == true) return;
           _;
        }
    }
    
    
    
    
    /**
     * 用户注册申请
     * 
     */
    function register(string coName,string coAddress,string corpName,uint corpId,uint tel,uint fax) WhetherRegistered(1){
        Register _register = new Register(msg.sender);
        _register.register(coName,coAddress,corpName,corpId,tel,fax);
       adminManagement.setRegisterAddress(msg.sender,_register);
    }
    
    
    /**
     * 用户查看注册信息
     * 
     */ 
    function getResisterInfo() WhetherRegistered(0) returns(Register){
        return adminManagement.getResisterInfo(msg.sender);
    }
    
    
    
    /**
     * 仓库基本信息注册
     * 
     */
     function registerBasicInfo(string _stockName,uint _stockId,string _stockType,uint _inventory,
                                uint _stockNum,uint _storeRoomNum,uint _posNum,uint _qrCode) WhetherRegistered(0) {
         coStockBasicInformation = new CoStockBasicInformation(msg.sender,stringUtils);
         coStockBasicInformation.registerBasicInfo(_stockName,_stockId,_stockType,_inventory,_stockNum,_storeRoomNum,_posNum,_qrCode);
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
     function sell(address _buyer,string _buyerName,string _stockName,uint _quantity) WhetherRegistered(0) {
        stockOut = StockOut(adminManagement.getStockOutAddress(msg.sender));
        coStockBasicInformation = CoStockBasicInformation(adminManagement.getStockBasicAddress(msg.sender));
        stockOut.sell(coStockBasicInformation, _buyer, _buyerName, _stockName, _quantity);
     }
     
     
    /**
     * 入库
     * 
     */ 
    function store(address _seller,string _sellerName,string _stockName,uint _quantity,uint _qrCode) WhetherRegistered(0){
        stockIn = StockIn(adminManagement.getStockInAddress(msg.sender));
        coStockBasicInformation = CoStockBasicInformation(adminManagement.getStockBasicAddress(msg.sender));
        stockIn.store(coStockBasicInformation, _seller, _sellerName, _stockName, _quantity, _qrCode);
    }
    
    
}

/**
 * 系统管理员管理合约
 * 主要功能：管理用户注册
 * 
 */ 
contract AdminManagement{
    
    StringUtils stringUtils;
    
    mapping(address => Register) public registerAddress;
    mapping(address => StockOut) public stockOutAddress;
    mapping(address => StockIn) public stockInAddress;
    mapping(address => CoStockBasicInformation) public stockBasicAddress;
    
    //用于遍历mapping中所有数据
    //此处遍历所有申请注册的用户
    address[] public addressArrays;
    uint public addressArraysNum = 0;
    
    address administrator;
   
    
    
    
    function AdminManagement(address _administrator,StringUtils _stringUtils){
        administrator = _administrator;
        stringUtils = StringUtils(_stringUtils);
    }
    
    
    modifier OnlyAdministrator(){
        if(msg.sender != administrator) return;
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
        addressArraysNum++;
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
        return flag;
    }
    
    
    function getResisterInfo(address _applicant) returns(Register){
        return  Register(registerAddress[_applicant]);
    }
    
    function weatherRepetition(address _applicant) returns(bool){
        if(addressArrays.length == 0){
            return false;
        }
        
        for(uint i = 0 ; i < addressArrays.length ; i++){
            if(_applicant == addressArrays[i]){
                return true;
            }
        }
        
        return false;
    }
    
}

/**
 * 企业仓库信息合约
 * 主要功能：存储企业仓库基本信息
 * 
 */ 
contract CoStockBasicInformation{
    
    StringUtils stringUtils;
    
    address public owner;
    //仓库
    mapping(string => StockBasicInfo) stocks;
    string[] public stockName;
    uint public stockNameNum = 0;
    
    struct StockBasicInfo{
       uint stockId;
       string stockType;
       uint stockNum;
       uint inventory;
       uint storeRoomNum;
       //厫间号
       uint posNum;
       //此处需要拼接！！！！！！
       uint posCode;
       uint qrCode;
    }
    
    
    function CoStockBasicInformation(address _owner,StringUtils _stringUtils){
        owner = _owner;
        stringUtils = StringUtils(_stringUtils);
    }
    
    
    function registerBasicInfo(string _stockName,uint _stockId,string _stockType,uint _inventory,
                                uint _stockNum,uint _storeRoomNum,uint _posNum,uint _qrCode){
        for(uint i = 0 ; i < stockName.length ; i++ ){
            if(stringUtils.equal(stockName[i],_stockName)) return;
        }
        stockName.push(_stockName);
        stockNameNum ++;
        stocks[_stockName].stockId = _stockId;
        stocks[_stockName].stockType = _stockType;
        stocks[_stockName].inventory = _inventory;
        stocks[_stockName].stockNum = _stockNum;
        stocks[_stockName].storeRoomNum = _storeRoomNum;
        stocks[_stockName].posNum = _posNum;
        stocks[_stockName].qrCode = _qrCode;
    }
    
    
    function getStockInventory(string _stockName) returns(uint) {
        return stocks[_stockName].inventory;
    }
    
    
    function getStockQrCode(string _stockName) returns(uint){
        return stocks[_stockName].qrCode;
    }
    
    
    function updateInventory(string _stockName,uint _inventory){
        stocks[_stockName].inventory = _inventory;
    }
    
    
}

/**
 * 用户注册合约
 * 主要功能：注册业务具体实现
 * 
 */ 
contract Register{
    
    enum RegisterStatus{Auditing,Reject,Approved}
    RegisterStatus public registerStatus = registerInfo.rStatus;
    RegisterInfo public registerInfo;
    address public owner;
    
    struct RegisterInfo{
        //企业注册基本信息
        string coName;
        string coAddress;
        string corpName;
        uint corpId;
        uint tel;
        uint fax;
        RegisterStatus rStatus;
    }
    
    
    function Register(address _owner){
        owner = _owner;
    }
    
   
    function register(string _coName,string _coAddress,string _corpName,uint _corpId,uint _tel,uint _fax){
        registerInfo.coName = _coName;
        registerInfo.coAddress = _coAddress;
        registerInfo.corpName = _corpName;
        registerInfo.corpId = _corpId;
        registerInfo.tel = _tel;
        registerInfo.fax = _fax;
        registerInfo.rStatus = RegisterStatus.Auditing;
    }
    
    
    // function checkRegister() returns(){
    //     _coName = coName;
    //     _coAddress = coAddress;
    // }
    
    
    function reject(){
        registerInfo.rStatus = RegisterStatus.Reject;
    }
    
    
    function approved(){
        registerInfo.rStatus = RegisterStatus.Approved;
    }
    
    
    function getResisterStatus() returns(bool){
        if(registerInfo.rStatus == RegisterStatus.Auditing || registerInfo.rStatus == RegisterStatus.Reject){
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
    address[] public sellers;
    uint public sellersNum = 0;
    
    
    StockInInfo stockInInfo;
    
   
    function StockIn(address _owner){
        owner = _owner;
    }
    
    //入库记录
    //卖家 => 入库详单
    mapping(address => StockInInfo[]) public storeRecord;
    mapping(address => uint) public storeRecordNum;
    
    
    struct StockInInfo{
        string stockName;
        address seller;
        string sellerName;
        uint quantity;
        
        //假设为可以识别粮食的唯一代码！！！！！！！！！！！
        uint qrCode;
    }
    
    
    function store(CoStockBasicInformation _stockBasicInfo,address _seller,string _sellerName,string _stockName,uint _quantity,uint _qrCode){
        uint _inventory = _stockBasicInfo.getStockInventory(_stockName);
        _stockBasicInfo.updateInventory(_stockName,_inventory + _quantity);
        
       
        
        if (sellers.length == 0){
            
             stockInInfo.stockName = _stockName;
             stockInInfo.seller = _seller;
             stockInInfo.sellerName = _sellerName;
             stockInInfo.quantity = _quantity;
             stockInInfo.qrCode = _qrCode;
             storeRecord[_seller].push(stockInInfo);
             storeRecordNum[_seller]++;
             sellersNum++;
             
        } else {
            
            bool flag = false;
            
            for(uint i = 0 ; i < sellers.length ; i++){
                
                if(sellers[i] == _seller){
                    flag = true;
                    break;
                }
                
            }
            
            if(flag == false){
                sellers.push(_seller);
                sellersNum++;
            }
            
             stockInInfo.stockName = _stockName;
             stockInInfo.seller = _seller;
             stockInInfo.sellerName = _sellerName;
             stockInInfo.quantity = _quantity;
             stockInInfo.qrCode = _qrCode;
             storeRecord[_seller].push(stockInInfo);
             storeRecordNum[_seller]++;
            
        }
        
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
    address[] public buyers;
    uint public buyersNum = 0;
    StockOutInfo stockOutInfo;
    
    //销售记录
    //买家 => 出货单详情
    mapping(address => StockOutInfo[]) public sellRecord;
    mapping(address => uint) public sellRecordNum;
    
    struct StockOutInfo{
        string stockName;
        address buyer;
        string buyerName;
        uint quantity;
        
        //假设为可以识别粮食的唯一代码！！！！！！！！！！！
        uint qrCode;
    }
    
    
    function StockOut(address _owner){
        owner = _owner;
    }
    
    
    function sell(CoStockBasicInformation _stockBasicInfo,address _buyer,string _buyerName,string _stockName,uint _quantity){
        uint _inventory = _stockBasicInfo.getStockInventory(_stockName);
        if(_inventory < _quantity) return;
        _stockBasicInfo.updateInventory(_stockName,_inventory - _quantity);
        
       
        
        if (buyers.length == 0){
            
             stockOutInfo.stockName = _stockName;
             stockOutInfo.buyer = _buyer;
             stockOutInfo.buyerName = _buyerName;
             stockOutInfo.quantity = _quantity;
             stockOutInfo.qrCode = _stockBasicInfo.getStockQrCode(_stockName);
             sellRecord[_buyer].push(stockOutInfo);
             sellRecordNum[_buyer]++;
             buyersNum++;
             
        } else {
            
            bool flag = false;
            
            for(uint i = 0 ; i < buyers.length ; i++){
                
                if(buyers[i] == _buyer){
                    flag = true;
                    break;
                }
                
            }
            
            if(flag == false){
                buyers.push(_buyer);
                buyersNum++;
            }
            
             stockOutInfo.stockName = _stockName;
             stockOutInfo.buyer = _buyer;
             stockOutInfo.buyerName = _buyerName;
             stockOutInfo.quantity = _quantity;
             stockOutInfo.qrCode = _stockBasicInfo.getStockQrCode(_stockName);
             sellRecord[_buyer].push(stockOutInfo);
             sellRecordNum[_buyer]++;
            
        }
        
        
    }
}

contract StringUtils {
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

