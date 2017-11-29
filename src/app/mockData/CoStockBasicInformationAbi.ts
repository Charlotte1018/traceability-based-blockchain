export const CoStockBasicInformationAbi=[
    {
      "constant": false,
      "inputs": [
        {
          "name": "_stockName",
          "type": "string"
        },
        {
          "name": "_inventory",
          "type": "uint256"
        }
      ],
      "name": "updateInventory",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_stockName",
          "type": "string"
        }
      ],
      "name": "getStockInventory",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stockName",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
        }
      ],
      "name": "getStockQrCode",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
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
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    }
  ];