export const StockOutAbi=[
    {
      "constant": true,
      "inputs": [],
      "name": "sellQuantity",
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
          "name": "_stockBasicInfo",
          "type": "address"
        },
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "buyers",
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