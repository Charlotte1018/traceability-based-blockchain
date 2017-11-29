pragma solidity ^0.4.10;

/**
 * …Ê¡∏∆Û“µπ‹¿Ì∫œ‘º
 * ÷˜“™π¶ƒ‹£∫◊¢≤·£¨»Îø‚π‹¿Ì£¨≥ˆø‚π‹¿Ì
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
        if (!adminManagement.getResisterStatus(msg.sender)) return;
        _;
    }
    
    
    /**
     * ”√ªß◊¢≤·…Í«Î
     * 
     */
    function register(string coName,string coAddress,string corpName,uint corpId,uint tel,uint fax){
        Register _register = new Register(msg.sender);
        _register.register(coName,coAddress,corpName,corpId,tel,fax);
       adminManagement.setRegisterAddress(msg.sender,_register);
    }
    
    
    /**
     * ≤÷ø‚ª˘±æ–≈œ¢◊¢≤·
     * 
     */
     function registerBasicInfo(string _stockName,uint _stockId,string _stockType,uint _inventory,
                                uint _stockNum,uint _storeRoomNum,uint _posNum,uint _qrCode) OnlyRegistered {
         coStockBasicInformation = new CoStockBasicInformation(msg.sender);
         coStockBasicInformation.registerBasicInfo(_stockName,_stockId,_stockType,_inventory,_stockNum,_storeRoomNum,_posNum,_qrCode);
         stockIn = new StockIn(msg.sender);
         stockOut = new StockOut(msg.sender);
         adminManagement.setStockOutAddress(msg.sender,stockOut);
         adminManagement.setStockInAddress(msg.sender,stockIn);
         adminManagement.setStockBasicAddress(msg.sender,coStockBasicInformation);
     }
     
     
    /**
     * ≥ˆø‚
     * 
     */ 
     function sell(address _buyer,string _buyerName,string _stockName,uint _quantity) OnlyRegistered {
        stockOut = StockOut(adminManagement.getStockOutAddress(msg.sender));
        coStockBasicInformation = CoStockBasicInformation(adminManagement.getStockBasicAddress(msg.sender));
        stockOut.sell(coStockBasicInformation, _buyer, _buyerName, _stockName, _quantity);
     }
     
     
    /**
     * »Îø‚
     * 
     */ 
    function store(address _seller,string _sellerName,string _stockName,uint _quantity,uint _qrCode) OnlyRegistered{
        stockIn = StockIn(adminManagement.getStockInAddress(msg.sender));
        coStockBasicInformation = CoStockBasicInformation(adminManagement.getStockBasicAddress(msg.sender));
        stockIn.store(coStockBasicInformation, _seller, _sellerName, _stockName, _quantity, _qrCode);
    }
    
    
}

/**
 * œµÕ≥π‹¿Ì‘±π‹¿Ì∫œ‘º
 * ÷˜“™π¶ƒ‹£∫π‹¿Ì”√ªß◊¢≤·
 * 
 */ 
contract AdminManagement{
    
    mapping(address => Register) public registerAddress;
    mapping(address => StockOut) public stockOutAddress;
    mapping(address => StockIn) public stockInAddress;
    mapping(address => CoStockBasicInformation) public stockBasicAddress;
    
    //”√”⁄±È¿˙mapping÷–À˘”– ˝æ›
    //¥À¥¶±È¿˙À˘”–…Í«Î◊¢≤·µƒ”√ªß
    address[] public addressArrays;
    
    address administrator;
   
    
    
    
    function AdminManagement(address _administrator){
        administrator = _administrator;
    }
    
    
    modifier OnlyAdministrator(){
        if(msg.sender != administrator) return;
        _;
    }
    
     /**
     * π‹¿Ì‘±¥¶¿Ì◊¢≤·–≈œ¢
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
        return flag;
    }
    
}

/**
 * ∆Û“µ≤÷ø‚–≈œ¢∫œ‘º
 * ÷˜“™π¶ƒ‹£∫¥Ê¥¢∆Û“µ≤÷ø‚ª˘±æ–≈œ¢
 * 
 */ 
contract CoStockBasicInformation{
    
    //using StringUtils for *;
    
    address public owner;
    //≤÷ø‚
    mapping(string => StockBasicInfo) stocks;
    string[] public stockName;
    
    struct StockBasicInfo{
       uint stockId;
       string stockType;
       uint stockNum;
       uint inventory;
       uint storeRoomNum;
       //Öêº‰∫≈
       uint posNum;
       //¥À¥¶–Ë“™∆¥Ω”£°£°£°£°£°£°
       uint posCode;
       uint qrCode;
    }
    
    
    function CoStockBasicInformation(address _owner){
        owner = _owner;
    }
    
    
    function registerBasicInfo(string _stockName,uint _stockId,string _stockType,uint _inventory,
                                uint _stockNum,uint _storeRoomNum,uint _posNum,uint _qrCode){
        // for(uint i = 0 ; i < stockName.length ; i++ ){
        //     if(StringUtils.equal(stockName[i],_stockName)) return;
        // }
        stockName.push(_stockName);
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
 * ”√ªß◊¢≤·∫œ‘º
 * ÷˜“™π¶ƒ‹£∫◊¢≤·“µŒÒæﬂÃÂ µœ÷
 * 
 */ 
contract Register{
    
    enum RegisterStatus{Auditing,Reject,Approved}
    RegisterStatus public registerStatus;
    address public owner;
    
    
    //∆Û“µ◊¢≤·ª˘±æ–≈œ¢
    string public coName;
    string public coAddress;
    string public corpName;
    uint public corpId;
    uint public tel;
    uint public fax;
    
    
    function Register(address _owner){
        owner = _owner;
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
 * »Îø‚π‹¿Ì∫œ‘º
 * ÷˜“™π¶ƒ‹
 * 
 */ 
contract StockIn{
    
    address public owner;
    uint public storeQuantity = 0;
    address[] sellers;
    StockInInfo stockInInfo;
    
   
    function StockIn(address _owner){
        owner = _owner;
    }
    
    //»Îø‚º«¬º
    //¬Ùº“ => »Îø‚œÍµ•
    mapping(address => StockInInfo[]) storeRecord;
    
    
    struct StockInInfo{
        string stockName;
        address seller;
        string sellerName;
        uint quantity;
        
        //ºŸ…ËŒ™ø…“‘ ∂±¡∏ ≥µƒŒ®“ª¥˙¬Î£°£°£°£°£°£°£°£°£°£°£°
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
             storeQuantity++;
             
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
            }
            
             stockInInfo.stockName = _stockName;
             stockInInfo.seller = _seller;
             stockInInfo.sellerName = _sellerName;
             stockInInfo.quantity = _quantity;
             stockInInfo.qrCode = _qrCode;
             storeRecord[_seller].push(stockInInfo);
             storeQuantity++; 
            
        }
        
    }
    
}

/**
 * ≥ˆø‚π‹¿Ì∫œ‘º
 * ÷˜“™π¶ƒ‹
 * 
 */ 
contract StockOut{
    
    CoStockBasicInformation public coStockBasicInformation;
    
    address public owner;
    uint public sellQuantity = 0;
    address[] public buyers;
    StockOutInfo stockOutInfo;
    
    //œ˙ €º«¬º
    //¬Úº“ => ≥ˆªıµ•œÍ«È
    mapping(address => StockOutInfo[]) sellRecord;
    
    struct StockOutInfo{
        string stockName;
        address buyer;
        string buyerName;
        uint quantity;
        
        //ºŸ…ËŒ™ø…“‘ ∂±¡∏ ≥µƒŒ®“ª¥˙¬Î£°£°£°£°£°£°£°£°£°£°£°
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
             sellQuantity++;
             
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
            }
            
             stockOutInfo.stockName = _stockName;
             stockOutInfo.buyer = _buyer;
             stockOutInfo.buyerName = _buyerName;
             stockOutInfo.quantity = _quantity;
             stockOutInfo.qrCode = _stockBasicInfo.getStockQrCode(_stockName);
             sellRecord[_buyer].push(stockOutInfo);
             sellQuantity++;
            
        }
        
        
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

