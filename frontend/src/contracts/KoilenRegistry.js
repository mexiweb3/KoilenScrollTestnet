const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_evvmAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_stakingAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "ADMIN_ROLE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "DEFAULT_ADMIN_ROLE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "OPERATOR_ROLE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "businessUnitSensors",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "businessUnitSharedWith",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "businessUnits",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "clientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "location",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "businessType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "contactName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "contactPhone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "contactEmail",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "updatedAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "clientBusinessUnits",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "clients",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "businessName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "phoneNumber",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "updatedAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createBusinessUnit",
    "inputs": [
      {
        "name": "_wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_location",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_businessType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactPhone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactEmail",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_nonce",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_signature",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "_priorityFeeEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_nonceEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_priorityFlagEVVM",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_signatureEVVM",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deviceIdToSensorId",
    "inputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllBusinessUnits",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct KoilenRegistry.BusinessUnit[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "clientId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "businessType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactPhone",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactEmail",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllClients",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct KoilenRegistry.Client[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "businessName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "phoneNumber",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllSensors",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct KoilenRegistry.Sensor[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "businessUnitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "equipmentType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tempMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "tempMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "installedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getBusinessUnit",
    "inputs": [
      {
        "name": "_businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct KoilenRegistry.BusinessUnit",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "clientId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "businessType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactPhone",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactEmail",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getBusinessUnitSensors",
    "inputs": [
      {
        "name": "_businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct KoilenRegistry.Sensor[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "businessUnitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "equipmentType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tempMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "tempMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "installedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getClientBusinessUnits",
    "inputs": [
      {
        "name": "_clientId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct KoilenRegistry.BusinessUnit[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "clientId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "businessType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactPhone",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contactEmail",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getClientById",
    "inputs": [
      {
        "name": "_clientId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct KoilenRegistry.Client",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "businessName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "phoneNumber",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getClientByWallet",
    "inputs": [
      {
        "name": "_wallet",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct KoilenRegistry.Client",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "businessName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "phoneNumber",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRoleAdmin",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSensor",
    "inputs": [
      {
        "name": "_sensorId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct KoilenRegistry.Sensor",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "businessUnitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "equipmentType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tempMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "tempMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "installedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSensorByDeviceId",
    "inputs": [
      {
        "name": "_deviceId",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct KoilenRegistry.Sensor",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "businessUnitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "location",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "equipmentType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tempMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "tempMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMin",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidityMax",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "installedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalBusinessUnits",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalClients",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalSensors",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "grantRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isAsyncServiceNonceAvailable",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "nonce",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerClient",
    "inputs": [
      {
        "name": "_wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_businessName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_phoneNumber",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_nonce",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_signature",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "_priorityFeeEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_nonceEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_priorityFlagEVVM",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_signatureEVVM",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerSensor",
    "inputs": [
      {
        "name": "_wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_location",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_equipmentType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_tempMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_tempMax",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_humidityMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_humidityMax",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_nonce",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_signature",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "_priorityFeeEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_nonceEVVM",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_priorityFlagEVVM",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_signatureEVVM",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "callerConfirmation",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "sensors",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "location",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "equipmentType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "tempMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "tempMax",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "humidityMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "humidityMax",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "installedAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "updatedAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "shareBusinessUnit",
    "inputs": [
      {
        "name": "_businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_sharedWith",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateBusinessUnit",
    "inputs": [
      {
        "name": "_businessUnitId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_location",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_businessType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactPhone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_contactEmail",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateClient",
    "inputs": [
      {
        "name": "_clientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_businessName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_phoneNumber",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateSensorConfig",
    "inputs": [
      {
        "name": "_sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_tempMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_tempMax",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_humidityMin",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_humidityMax",
        "type": "int16",
        "internalType": "int16"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "walletToClientId",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "BusinessUnitCreated",
    "inputs": [
      {
        "name": "businessUnitId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "clientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "location",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BusinessUnitShared",
    "inputs": [
      {
        "name": "businessUnitId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "sharedWith",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BusinessUnitUpdated",
    "inputs": [
      {
        "name": "businessUnitId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ClientRegistered",
    "inputs": [
      {
        "name": "clientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "businessName",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ClientUpdated",
    "inputs": [
      {
        "name": "clientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "businessName",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleAdminChanged",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "previousAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "newAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleGranted",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleRevoked",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SensorConfigUpdated",
    "inputs": [
      {
        "name": "sensorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "tempMin",
        "type": "int16",
        "indexed": false,
        "internalType": "int16"
      },
      {
        "name": "tempMax",
        "type": "int16",
        "indexed": false,
        "internalType": "int16"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SensorRegistered",
    "inputs": [
      {
        "name": "sensorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "businessUnitId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "deviceId",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AccessControlBadConfirmation",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AccessControlUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "neededRole",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidServiceSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ServiceAsyncNonceAlreadyUsed",
    "inputs": []
  }
];
export default abi;