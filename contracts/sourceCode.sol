pragma solidity ^0.4.8;
contract Management {
    
  mapping(string => StockCode) stockCodeAddress;
  string public currentStockName;
  StockCode public testStockCode;
   
  function addStock(string stockName){
      StockCode stockCode = new StockCode();
      stockCodeAddress[stockName] = stockCode;
      currentStockName = stockName;
  }
  function getstockCodeAddress(string stockName) returns(StockCode){
     testStockCode = stockCodeAddress[stockName];
     return stockCodeAddress[stockName];
    
  }
   
  function newRootCode(string rootOrganizationCode,string rootStockCode,string rootCloseTime,string rootId){
      stockCodeAddress[currentStockName].newRootCode(rootOrganizationCode,rootStockCode,rootCloseTime,rootId);
  }
   
  function newCurrentCode(string currentOrganizationCode,string currentStockCode,string currentCloseTime,
                          string foodNature,string businessNum){
      stockCodeAddress[currentStockName].newCurrentCode(currentOrganizationCode,currentStockCode,currentCloseTime,foodNature,businessNum);
  }
  
  function newSourceCode(string sourceType,string sourceNum){
      stockCodeAddress[currentStockName].newSourceCode(sourceType,sourceNum);
  }
  
  
   
  
   
   
}

contract StockCode{
        
        RootCode public  rootCode;
        CurrentCode public currentCode;
        SourceCode public sourceCode;
        SourceCodeId public sourceCodeId;
        CodeId public codeId;
        
        
        //根代码
        struct RootCode{
          string rootOrganizationCode;
          string rootStockCode;
          string rootCloseTime;
          string rootId;
        }  
        
        //当前码
        struct CurrentCode{
          string currentOrganizationCode;
          string currentStockCode;
          string currentCloseTime;
          string foodNature;
          string businessNum;
        }
        
        
        //来源码
        struct SourceCode{
          string sourceType;
          string sourceNum;

        }
        
        //来源代码标识
        struct SourceCodeId{
            string sourceSection1;
            string sourceSection2;
            string sourceSection3; 
        }
        
        //代码标识
        struct CodeId{
            string section1;
            string section2;
            string section3; 
        }
        
        function newRootCode(string rootOrganizationCode,string rootStockCode,string rootCloseTime,string rootId){
           rootCode.rootOrganizationCode = rootOrganizationCode;
           rootCode.rootStockCode = rootStockCode;
           rootCode.rootCloseTime = rootCloseTime;
           rootCode.rootId = rootId;
        }
        
        function newCurrentCode(string currentOrganizationCode,string currentStockCode,string currentCloseTime,
                          string foodNature,string businessNum){
           currentCode.currentOrganizationCode = currentOrganizationCode;
           currentCode.currentStockCode = currentStockCode;
           currentCode.currentCloseTime = currentCloseTime;
           currentCode.foodNature = foodNature;
           currentCode.businessNum = businessNum;
        }
        
        function newSourceCode(string sourceType,string sourceNum){
            sourceCode.sourceType = sourceType;
            sourceCode.sourceNum = sourceNum;
            sourceCodeId.sourceSection1 = rootCode.rootOrganizationCode;
            sourceCodeId.sourceSection2 = rootCode.rootStockCode;
            sourceCodeId.sourceSection3 = rootCode.rootCloseTime;
            codeId.section1 = currentCode.currentOrganizationCode;
            codeId.section2 = currentCode.currentStockCode;
            codeId.section3 = currentCode.currentCloseTime;
        }
        
        
        
        
        
      
       
       
    
    
   
}

