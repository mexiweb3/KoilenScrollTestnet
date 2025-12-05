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
    "name": "admin",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "authorizeWriter",
    "inputs": [
      {
        "name": "_writer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "authorizedWriters",
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
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "deviceReadings",
    "inputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
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
        "name": "sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "temperature",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "humidity",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "online",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "blockNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "dataHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLatestReading",
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
        "internalType": "struct SensorDataRegistry.Reading",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sensorId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "temperature",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidity",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "online",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "dataHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "createdAt",
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
    "name": "getLatestReadings",
    "inputs": [
      {
        "name": "_deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_count",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct SensorDataRegistry.Reading[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sensorId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "temperature",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidity",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "online",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "dataHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "createdAt",
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
    "name": "getReadingCount",
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
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSensorAlerts",
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
        "type": "tuple[]",
        "internalType": "struct SensorDataRegistry.Alert[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sensorId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "alertType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "value",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "readingHash",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSensorReadingCount",
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
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSensorReadings",
    "inputs": [
      {
        "name": "_sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_count",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct SensorDataRegistry.Reading[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sensorId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "temperature",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "humidity",
            "type": "int16",
            "internalType": "int16"
          },
          {
            "name": "online",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "dataHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "createdAt",
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
    "name": "logAlert",
    "inputs": [
      {
        "name": "_sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_alertType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_value",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_readingHash",
        "type": "bytes32",
        "internalType": "bytes32"
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
    "name": "logReading",
    "inputs": [
      {
        "name": "_writer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_temperature",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_humidity",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "_online",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_timestamp",
        "type": "uint256",
        "internalType": "uint256"
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
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "logReadingsBatch",
    "inputs": [
      {
        "name": "_sensorIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "_deviceIds",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "_temperatures",
        "type": "int16[]",
        "internalType": "int16[]"
      },
      {
        "name": "_humidities",
        "type": "int16[]",
        "internalType": "int16[]"
      },
      {
        "name": "_onlineStatuses",
        "type": "bool[]",
        "internalType": "bool[]"
      },
      {
        "name": "_timestamps",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeWriter",
    "inputs": [
      {
        "name": "_writer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "sensorAlerts",
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
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "alertType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "value",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "readingHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "sensorReadings",
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
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "sensorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "temperature",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "humidity",
        "type": "int16",
        "internalType": "int16"
      },
      {
        "name": "online",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "blockNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "dataHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalAlerts",
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
    "name": "totalReadings",
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
    "name": "verifyReading",
    "inputs": [
      {
        "name": "_deviceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_index",
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
    "type": "event",
    "name": "AlertTriggered",
    "inputs": [
      {
        "name": "alertId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "sensorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "alertType",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "value",
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
    "name": "ReadingLogged",
    "inputs": [
      {
        "name": "readingId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "sensorId",
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
        "name": "temperature",
        "type": "int16",
        "indexed": false,
        "internalType": "int16"
      },
      {
        "name": "humidity",
        "type": "int16",
        "indexed": false,
        "internalType": "int16"
      },
      {
        "name": "online",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "dataHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WriterAuthorized",
    "inputs": [
      {
        "name": "writer",
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
    "name": "WriterRevoked",
    "inputs": [
      {
        "name": "writer",
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