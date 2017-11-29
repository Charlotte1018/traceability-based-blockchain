export  const UserManagementAbi=[
  {
    "constant": false,
    "inputs": [
      {
        "name": "coName",
        "type": "string"
      },
      {
        "name": "coAddress",
        "type": "string"
      },
      {
        "name": "corpName",
        "type": "string"
      },
      {
        "name": "corpId",
        "type": "uint256"
      },
      {
        "name": "tel",
        "type": "uint256"
      },
      {
        "name": "fax",
        "type": "uint256"
      }
    ],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "adminManagement",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_buyer",
        "type": "address"
      },
      {
        "name": "_buyerName",
        "type": "string"
      },
      {
        "name": "_stockName",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "stockIn",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_seller",
        "type": "address"
      },
      {
        "name": "_sellerName",
        "type": "string"
      },
      {
        "name": "_stockName",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_qrCode",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "stockOut",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "coStockBasicInformation",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_stockName",
        "type": "string"
      },
      {
        "name": "_stockId",
        "type": "uint256"
      },
      {
        "name": "_stockType",
        "type": "string"
      },
      {
        "name": "_inventory",
        "type": "uint256"
      },
      {
        "name": "_stockNum",
        "type": "uint256"
      },
      {
        "name": "_storeRoomNum",
        "type": "uint256"
      },
      {
        "name": "_posNum",
        "type": "uint256"
      },
      {
        "name": "_qrCode",
        "type": "uint256"
      }
    ],
    "name": "registerBasicInfo",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  }
];