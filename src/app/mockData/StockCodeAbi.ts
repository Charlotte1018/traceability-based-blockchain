export const StockCodeAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "codeId",
    "outputs": [
      {
        "name": "section1",
        "type": "string"
      },
      {
        "name": "section2",
        "type": "string"
      },
      {
        "name": "section3",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rootCode",
    "outputs": [
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
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "sourceCode",
    "outputs": [
      {
        "name": "sourceType",
        "type": "string"
      },
      {
        "name": "sourceNum",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentCode",
    "outputs": [
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
    "name": "sourceCodeId",
    "outputs": [
      {
        "name": "sourceSection1",
        "type": "string"
      },
      {
        "name": "sourceSection2",
        "type": "string"
      },
      {
        "name": "sourceSection3",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  }
];