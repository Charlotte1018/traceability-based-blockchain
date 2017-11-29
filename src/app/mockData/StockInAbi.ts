export const StockInAbi=[
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
      "constant": true,
      "inputs": [],
      "name": "storeQuantity",
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
      "constant": false,
      "inputs": [
        {
          "name": "_stockBasicInfo",
          "type": "address"
        },
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