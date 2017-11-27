export  const ManagementAbi=[
  {
    "constant": true,
    "inputs": [],
    "name": "currentStockName",
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
        "name": "rootOrganizationCode",
        "type": "string"
      },
      {
        "name": "rootStockCode",
        "type": "string"
      },
      {
        "name": "rootCloseTime",
        "type": "string"
      },
      {
        "name": "rootId",
        "type": "string"
      }
    ],
    "name": "newRootCode",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "currentOrganizationCode",
        "type": "string"
      },
      {
        "name": "currentStockCode",
        "type": "string"
      },
      {
        "name": "currentCloseTime",
        "type": "string"
      },
      {
        "name": "foodNature",
        "type": "string"
      },
      {
        "name": "businessNum",
        "type": "string"
      }
    ],
    "name": "newCurrentCode",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sourceType",
        "type": "string"
      },
      {
        "name": "sourceNum",
        "type": "string"
      }
    ],
    "name": "newSourceCode",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "testStockCode",
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
        "name": "stockName",
        "type": "string"
      }
    ],
    "name": "addStock",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "stockName",
        "type": "string"
      }
    ],
    "name": "getstockCodeAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  }
];