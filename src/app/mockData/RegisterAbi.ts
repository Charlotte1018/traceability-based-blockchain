export const RegisterAbi=[
  {
    "constant": false,
    "inputs": [
      {
        "name": "_coName",
        "type": "string"
      },
      {
        "name": "_coAddress",
        "type": "string"
      },
      {
        "name": "_corpName",
        "type": "string"
      },
      {
        "name": "_corpId",
        "type": "uint256"
      },
      {
        "name": "_tel",
        "type": "uint256"
      },
      {
        "name": "_fax",
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
    "name": "registerInfo",
    "outputs": [
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
      },
      {
        "name": "rStatus",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "approved",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "reject",
    "outputs": [],
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
    "constant": true,
    "inputs": [],
    "name": "registerStatus",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getResisterStatus",
    "outputs": [
      {
        "name": "",
        "type": "bool"
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