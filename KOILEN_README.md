# Koilen - IoT Sensor Management System

## Overview

Koilen is a blockchain-based IoT sensor management system built on Scroll Sepolia testnet, featuring gasless transactions through EVVM (Ethereum Virtual Virtual Machine) integration. The system allows businesses to register, manage sensors, and log temperature/humidity readings without paying gas fees.

## ⚡ Quick Start (5 minutes)

1. **Clone & Install**
   ```bash
   git clone https://github.com/mexiweb3/KoilenScrollTestnet.git
   cd KoilenScrollTestnet/frontend
   npm install
   npm run dev
   ```

2. **Configure MetaMask**
   - Network: Scroll Sepolia
   - RPC: `https://sepolia-rpc.scroll.io/`
   - Chain ID: `534351`
   - Block Explorer: `https://sepolia.scrollscan.com`

3. **Get Test ETH**
   - Scroll Sepolia Faucet: [https://scroll.io/faucet](https://scroll.io/faucet)
   - Or bridge from Ethereum Sepolia

4. **Start Using**
   - Open `http://localhost:3000`
   - Connect your wallet
   - Register as a client
   - Start managing sensors!

## 🚀 Features

### Core Functionality
- **Client Registration**: Register businesses with contact information
- **Business Unit Management**: Create and manage multiple business locations
- **Sensor Registration**: Register IoT sensors for temperature and humidity monitoring
- **Reading Logging**: Record sensor readings with timestamps
- **Gasless Transactions**: All operations use EVVM for zero gas costs

### Technical Highlights
- ✅ **EVVM Integration**: All 4 main functions support gasless transactions (EVVM ID: 1083)
- ✅ **EIP-191 Signatures**: Secure message signing for authentication
- ✅ **Dual-Signature Flow**: Service authorization + Payment authorization
- ✅ **React Frontend**: Modern UI with React Router and ethers.js
- ✅ **Smart Contract Security**: Role-based access control with OpenZeppelin

## 📋 System Architecture

### Smart Contracts

#### KoilenRegistry.sol
Main registry contract for clients, business units, and sensors.

**Key Functions:**
- `registerClient(wallet, businessName, email, phone, nonce, signature, fee, evvmNonce, priorityFlag, evvmSignature)` - Register a new client (gasless)
- `createBusinessUnit(wallet, name, location, businessType, contactName, contactPhone, contactEmail, nonce, signature, fee, evvmNonce, priorityFlag, evvmSignature)` - Create a business unit (gasless)
- `registerSensor(wallet, businessUnitId, deviceId, name, equipmentType, location, minTemp, maxTemp, nonce, signature, fee, evvmNonce, priorityFlag, evvmSignature)` - Register a sensor (gasless)
- `getClient(clientId)` - View client information
- `getBusinessUnit(businessUnitId)` - View business unit details
- `getSensor(sensorId)` - View sensor information

**Deployed Address**: `0x605d618A3D3ece7aAe6820007a5bF81649632077`

#### SensorDataRegistry.sol
Registry for sensor readings and data management.

**Key Functions:**
- `logReading(wallet, sensorId, deviceId, temperature, humidity, online, timestamp, nonce, signature, fee, evvmNonce, priorityFlag, evvmSignature)` - Log a sensor reading (gasless)
- `getSensorReadings(sensorId, limit)` - Get recent readings for a sensor
- `getReading(readingId)` - Get specific reading details

**Deployed Address**: `0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268`

### Frontend Application

#### Technology Stack
- **React** 18.3.1 - UI framework
- **React Router DOM** 6.28.0 - Client-side routing
- **ethers.js** 6.16.0 - Ethereum interaction
- **Vite** 5.4.21 - Build tool and dev server

#### Pages
1. **Home** (`/`) - Landing page with wallet connection
2. **Dashboard** (`/dashboard`) - Overview of clients, business units, and sensors
3. **Register Client** (`/register-client`) - Client registration form
4. **Create Business Unit** (`/business-units/create`) - Business unit creation form
5. **Register Sensor** (`/sensors/register`) - Sensor registration form
6. **Log Reading** (`/readings/log`) - Sensor reading registration form
7. **Sensor Details** (`/sensors/:sensorId`) - Individual sensor information and readings

#### Key Components

**useWallet Hook**
Manages wallet connection and MetaMask integration.

**useKoilenContracts Hook**
Provides all contract interaction functions with EVVM gasless integration.

**EVVM Gasless Flow**:
1. User initiates action (e.g., register client)
2. Generate service payload: `evvmId,functionName,params,nonce`
3. User signs service payload (Signature 1)
4. Alert: "First signature ready! Now comes payment authorization..."
5. Generate payment payload: `evvmId,pay,to,token,amount,fee,nonce,priorityFlag,executor`
6. User signs payment payload (Signature 2)
7. Transaction sent to blockchain (gasless)
8. Confirmation and navigation

## 🔧 Configuration

### Blockchain Configuration
File: `frontend/src/config/blockchain.js`

```javascript
export const BLOCKCHAIN_CONFIG = {
  networkName: 'Scroll Sepolia',
  chainId: 534351,
  evvmId: 1083,  // EVVM instance ID
  rpcUrl: 'https://sepolia-rpc.scroll.io/',
  blockExplorer: 'https://sepolia.scrollscan.com',
  contracts: {
    koilenRegistry: '0x605d618A3D3ece7aAe6820007a5bF81649632077',
    sensorDataRegistry: '0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268',
  },
  adminAddress: '0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF',
};
```

### Contract Addresses

**Koilen Service Contracts (Scroll Sepolia):**
- **KoilenRegistry**: `0x605d618A3D3ece7aAe6820007a5bF81649632077`
- **SensorDataRegistry**: `0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268`

**EVVM Core Contracts (Scroll Sepolia):**
- **EVVM**: `0x97f35683957475Fd1548463923EC2111E19a9fCb`
- **Staking**: `0x8291228ac301E8FCFc4773062453c7731E84BeDf`
- **Treasury**: `0x8fbc0B5bfa930d7B24CE99cF23F122958e3b43FD`
- **NameService**: `0xC63F7bF078f84Fc2af163dEADDFbb0223DC9F416`
- **P2PSwap**: `0xd74B1BF6579ec20a55c62b5a3a91886F8eB52856`
- **Estimator**: `0x08cb050641b028a4467438e76546270Fe195F4cB`
- **EVVM ID**: `1083`

**Block Explorer**: [Scrollscan Sepolia](https://sepolia.scrollscan.com)

## 💰 Token Economics

### KOIL Token (Principal Token)
KOIL is the native token of the EVVM instance used for gasless operations and rewards.

**Token Details:**
- **Total Supply**: 2,033,333,333 KOIL
- **Era Pool (Rewards)**: 1,524,999,999.75 KOIL (75%)
- **Circulating Supply**: 508,333,333.25 KOIL (25%)
- **Reward per Operation**: 5 KOIL
- **Contract Address**: `0x0000000000000000000000000000000000000001` (Principal Token)

**Token Distribution:**
```
Total Supply:        2,033,333,333 KOIL (100%)
├─ Era Pool:         1,524,999,999.75 KOIL (75%) - Reserved for operation rewards
└─ Circulating:      508,333,333.25 KOIL (25%) - Initial distribution
   ├─ Treasury:      Reserved for system operations
   ├─ Staking:       10 KOIL - Initial staking allocation
   ├─ NameService:   10,000 KOIL - Domain registration operations
   └─ Users:         Distributed through operations
```

### Gasless Operations
All Koilen operations (registerClient, createBusinessUnit, registerSensor, logReading) are **completely gasless** thanks to EVVM ID 1083:

**How it works:**
1. Users sign transactions with their wallet (no gas needed)
2. EVVM processes the transaction on the virtual blockchain
3. Fishers (transaction processors) earn KOIL rewards
4. No ETH gas fees required for users

**Benefits:**
- ✅ Zero gas costs for all sensor operations
- ✅ Predictable transaction costs
- ✅ Better UX for IoT applications
- ✅ Scalable for high-frequency sensor readings

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm
- MetaMask browser extension
- Foundry (for smart contract development)

### Installation

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### Smart Contract Development
```bash
# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Deploy to Scroll Sepolia
forge script script/DeployKoilenServices.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --verify
```

### Environment Variables

Create `.env` file in project root:
```bash
# RPC URL
RPC_URL=https://sepolia-rpc.scroll.io/

# Etherscan API for verification
ETHERSCAN_API_KEY=your_api_key_here

# Admin wallet (for deployment)
PRIVATE_KEY=your_private_key_here
```

## 📖 User Guide

### 1. Register as a Client

1. Connect your wallet (MetaMask)
2. Navigate to "Register Client" from Dashboard
3. Fill in:
   - Business Name
   - Email
   - Phone Number
4. Click "Register"
5. Sign two messages:
   - Service authorization
   - Payment authorization
6. Wait for transaction confirmation

### 2. Create a Business Unit

1. From Dashboard, click "Nueva Sucursal"
2. Fill in:
   - Business Unit Name
   - Address, City, Country
   - Business Type (restaurant, supermarket, etc.)
   - Contact Information
3. Click "Create Business Unit"
4. Sign two messages
5. Transaction confirmed

### 3. Register a Sensor

1. From Dashboard, click "Nuevo Sensor"
2. Select Business Unit
3. Fill in:
   - Device ID (from IoT device)
   - Sensor Name
   - Equipment Type (cooler, freezer, etc.)
   - Location
   - Temperature Range (min/max)
4. Click "Register Sensor"
5. Sign two messages
6. Transaction confirmed

### 4. Log a Reading

1. From Dashboard, click "📊 Registrar Lectura"
2. Select Business Unit → Sensors load automatically
3. Select Sensor
4. Enter:
   - Temperature (°C) - e.g., 5.5
   - Humidity (%) - e.g., 50
   - Online status (checked/unchecked)
5. Click "Registrar Lectura"
6. Sign two messages
7. Transaction confirmed
8. Redirected to sensor details page

### 5. View Sensor Data

1. Navigate to sensor details page
2. View:
   - Sensor information
   - Latest reading
   - Reading history
   - Business unit and client information

## 🔐 Security Features

### Smart Contract Security
- **Role-Based Access Control**: Admin, Operator roles using OpenZeppelin AccessControl
- **Signature Verification**: EIP-191 message signing for authentication
- **Nonce Management**: Prevents replay attacks with AsyncNonceService
- **EVVM Integration**: Secure gasless transaction framework

### Frontend Security
- **Wallet Connection**: Secure MetaMask integration
- **Message Signing**: User-controlled signature requests
- **Input Validation**: Form validation before submission
- **Error Handling**: Comprehensive error messages and recovery

## 📊 Data Models

### Client
```solidity
struct Client {
    uint256 id;
    address wallet;
    string businessName;
    string email;
    string phoneNumber;
    bool isActive;
    uint256 createdAt;
    uint256 updatedAt;
}
```

### Business Unit
```solidity
struct BusinessUnit {
    uint256 id;
    uint256 clientId;
    string name;
    string location;
    string businessType;
    string contactName;
    string contactPhone;
    string contactEmail;
    bool isActive;
    uint256 createdAt;
    uint256 updatedAt;
}
```

### Sensor
```solidity
struct Sensor {
    uint256 id;
    uint256 businessUnitId;
    string deviceId;
    string name;
    string equipmentType;
    string location;
    int16 minTemp;
    int16 maxTemp;
    bool isActive;
    uint256 createdAt;
}
```

### Reading
```solidity
struct Reading {
    uint256 id;
    uint256 sensorId;
    string deviceId;
    int16 temperature;  // Scaled by 10 (55 = 5.5°C)
    uint16 humidity;
    bool online;
    uint256 timestamp;
}
```

## 📚 API Reference

### KoilenRegistry Contract

#### `registerClient()`
Register a new client in the system (gasless operation).

```solidity
function registerClient(
    address _wallet,
    string memory _businessName,
    string memory _email,
    string memory _phoneNumber,
    uint256 _nonce,
    bytes memory _signature,
    uint256 _priorityFeeEVVM,
    uint256 _nonceEVVM,
    bool _priorityFlagEVVM,
    bytes memory _signatureEVVM
) external
```

**Parameters:**
- `_wallet`: Client wallet address (will be used for authentication)
- `_businessName`: Name of the business/company
- `_email`: Business contact email
- `_phoneNumber`: Business contact phone number
- `_nonce`: Async nonce for service signature (anti-replay)
- `_signature`: EIP-191 signature of service payload
- `_priorityFeeEVVM`: Priority fee for EVVM transaction (usually 0)
- `_nonceEVVM`: EVVM payment nonce (sync or async based on flag)
- `_priorityFlagEVVM`: true = async nonce, false = sync nonce
- `_signatureEVVM`: EIP-191 signature of EVVM payment payload

**Returns:** Client ID (emitted in event)

**Service Signature Format:**
```
<evvmId>,registerClient,<businessName>,<email>,<phoneNumber>,<nonce>
```

**Example:**
```
1083,registerClient,Koilen Technologies,contact@koilen.com,+52 55 1234 5678,0
```

---

#### `createBusinessUnit()`
Create a new business unit/location (gasless operation).

```solidity
function createBusinessUnit(
    address _wallet,
    string memory _name,
    string memory _location,
    string memory _businessType,
    string memory _contactName,
    string memory _contactPhone,
    string memory _contactEmail,
    uint256 _nonce,
    bytes memory _signature,
    uint256 _priorityFeeEVVM,
    uint256 _nonceEVVM,
    bool _priorityFlagEVVM,
    bytes memory _signatureEVVM
) external
```

**Parameters:**
- `_wallet`: Client wallet address (must be registered)
- `_name`: Name of the business unit/location
- `_location`: Physical address (e.g., "Av. Reforma 123, CDMX")
- `_businessType`: Type of business (e.g., "restaurant", "supermarket")
- `_contactName`: Contact person name
- `_contactPhone`: Contact phone number
- `_contactEmail`: Contact email
- `_nonce`: Async nonce for service signature
- `_signature`: Service signature
- `_priorityFeeEVVM`: EVVM priority fee
- `_nonceEVVM`: EVVM nonce
- `_priorityFlagEVVM`: Nonce type flag
- `_signatureEVVM`: EVVM signature

**Returns:** Business Unit ID (emitted in event)

---

#### `registerSensor()`
Register a new IoT sensor (gasless operation).

```solidity
function registerSensor(
    address _wallet,
    uint256 _businessUnitId,
    string memory _deviceId,
    string memory _name,
    string memory _equipmentType,
    string memory _location,
    int16 _minTemp,
    int16 _maxTemp,
    uint256 _nonce,
    bytes memory _signature,
    uint256 _priorityFeeEVVM,
    uint256 _nonceEVVM,
    bool _priorityFlagEVVM,
    bytes memory _signatureEVVM
) external
```

**Parameters:**
- `_wallet`: Client wallet address
- `_businessUnitId`: ID of the business unit where sensor is located
- `_deviceId`: Unique device ID from IoT sensor
- `_name`: Sensor name/description
- `_equipmentType`: Type of equipment (e.g., "cooler", "freezer")
- `_location`: Specific location within business unit
- `_minTemp`: Minimum temperature threshold (scaled by 10: -50 = -5.0°C)
- `_maxTemp`: Maximum temperature threshold (scaled by 10: 80 = 8.0°C)
- `_nonce`: Service nonce
- `_signature`: Service signature
- `_priorityFeeEVVM`: EVVM fee
- `_nonceEVVM`: EVVM nonce
- `_priorityFlagEVVM`: Nonce flag
- `_signatureEVVM`: EVVM signature

**Returns:** Sensor ID (emitted in event)

---

#### View Functions

```solidity
function getClient(uint256 clientId) external view returns (Client memory)
function getBusinessUnit(uint256 businessUnitId) external view returns (BusinessUnit memory)
function getSensor(uint256 sensorId) external view returns (Sensor memory)
function getClientBusinessUnits(uint256 clientId) external view returns (uint256[] memory)
function getBusinessUnitSensors(uint256 businessUnitId) external view returns (uint256[] memory)
```

---

### SensorDataRegistry Contract

#### `logReading()`
Log a sensor reading (gasless operation).

```solidity
function logReading(
    address _wallet,
    uint256 _sensorId,
    string memory _deviceId,
    int16 _temperature,
    uint16 _humidity,
    bool _online,
    uint256 _timestamp,
    uint256 _nonce,
    bytes memory _signature,
    uint256 _priorityFeeEVVM,
    uint256 _nonceEVVM,
    bool _priorityFlagEVVM,
    bytes memory _signatureEVVM
) external
```

**Parameters:**
- `_wallet`: Client wallet address
- `_sensorId`: Sensor ID from KoilenRegistry
- `_deviceId`: Device ID (must match sensor's deviceId)
- `_temperature`: Temperature reading scaled by 10 (55 = 5.5°C, -100 = -10.0°C)
- `_humidity`: Humidity percentage (0-100)
- `_online`: Sensor online status
- `_timestamp`: Unix timestamp of the reading
- `_nonce`: Service nonce
- `_signature`: Service signature
- `_priorityFeeEVVM`: EVVM fee
- `_nonceEVVM`: EVVM nonce
- `_priorityFlagEVVM`: Nonce flag
- `_signatureEVVM`: EVVM signature

**Returns:** Reading ID (emitted in event)

**Service Signature Format:**
```
<evvmId>,logReading,<sensorId>,<deviceId>,<temperature>,<humidity>,<online>,<timestamp>,<nonce>
```

---

#### View Functions

```solidity
function getReading(uint256 readingId) external view returns (Reading memory)
function getSensorReadings(uint256 sensorId, uint256 limit) external view returns (Reading[] memory)
```

**Note:** `getSensorReadings` returns the most recent readings up to the specified limit.

## 🛠️ Development

### Project Structure
```
Testnet-Contracts/
├── src/
│   ├── contracts/
│   │   └── koilen/
│   │       ├── KoilenRegistry.sol
│   │       └── SensorDataRegistry.sol
│   └── library/
│       └── EvvmService.sol
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RegisterClient.jsx
│   │   │   ├── CreateBusinessUnit.jsx
│   │   │   ├── RegisterSensor.jsx
│   │   │   ├── LogReading.jsx
│   │   │   └── SensorData.jsx
│   │   ├── hooks/
│   │   │   ├── useWallet.js
│   │   │   └── useKoilenContracts.js
│   │   ├── contracts/
│   │   │   ├── KoilenRegistry.js
│   │   │   └── SensorDataRegistry.js
│   │   └── config/
│   │       └── blockchain.js
│   └── package.json
├── script/
│   └── DeployKoilenServices.s.sol
└── README.md
```

### Adding New Features

#### 1. Add Contract Function
```solidity
// In KoilenRegistry.sol or SensorDataRegistry.sol
function newFunction(
    address _wallet,
    // ... parameters
    uint256 _nonce,
    bytes memory _signature,
    uint256 _priorityFeeEVVM,
    uint256 _nonceEVVM,
    bool _priorityFlagEVVM,
    bytes memory _signatureEVVM
) external {
    // Validate service signature
    validateServiceSignature(
        "newFunction",
        string.concat(
            Strings.toString(param1), ",",
            param2, ",",
            Strings.toString(_nonce)
        ),
        _signature,
        _wallet
    );
    
    // Verify nonce
    verifyAsyncServiceNonce(_wallet, _nonce);
    
    // Request payment
    requestPay(
        _wallet,
        _priorityFeeEVVM,
        _nonceEVVM,
        _priorityFlagEVVM,
        _signatureEVVM
    );
    
    // Your logic here
}
```

#### 2. Add Hook Function
```javascript
// In useKoilenContracts.js
const newFunction = async (param1, param2) => {
  try {
    const walletAddress = await signer.getAddress();
    
    // 1. Service signature
    const serviceParams = [param1.toString(), param2];
    const { nonce: serviceNonce, payload: servicePayload } = 
      await getEvvmPayload('newFunction', serviceParams);
    const signature = await signer.signMessage(servicePayload);
    
    // Alert between signatures
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('¡Primera firma lista! Ahora viene la segunda...');
    
    // 2. Payment signature
    const { nonce: evvmNonce, payload: paymentPayload } = 
      await getEvvmPaymentPayload(walletAddress, contractAddress, "0x0...", 0, 0);
    const signatureEVVM = await signer.signMessage(paymentPayload);
    
    // 3. Send transaction
    const tx = await contract.newFunction(
      walletAddress, param1, param2,
      serviceNonce, signature,
      0, evvmNonce, true, signatureEVVM
    );
    
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

#### 3. Add Page Component
```jsx
// In frontend/src/pages/NewFeature.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useKoilenContracts } from '../hooks/useKoilenContracts';

function NewFeature() {
  const navigate = useNavigate();
  const { isConnected, signer } = useWallet();
  const { newFunction } = useKoilenContracts(signer);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await newFunction(param1, param2);
      alert('Success!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default NewFeature;
```

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
forge test

# Run specific test
forge test --match-test testRegisterClient

# Run with gas report
forge test --gas-report

# Run with verbosity
forge test -vvv
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📝 License

This project uses EVVM contracts which are licensed under EVVM-NONCOMMERCIAL-1.0.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/mexiweb3/KoilenScrollTestnet/issues)
- Documentation: This README

## 🎯 Roadmap

### Completed ✅
- [x] Client registration with EVVM gasless
- [x] Business unit creation with EVVM gasless
- [x] Sensor registration with EVVM gasless
- [x] Reading logging with EVVM gasless
- [x] Dashboard with overview
- [x] Sensor details page
- [x] Frontend integration with MetaMask

### Planned 🚧
- [ ] Bulk reading registration
- [ ] Reading history visualization
- [ ] Temperature alerts and notifications
- [ ] Analytics dashboard
- [ ] Export data functionality
- [ ] Mobile app integration
- [ ] Multi-language support

## 📸 Screenshots

### Dashboard
The main dashboard provides an overview of all registered clients, business units, and sensors.

![Dashboard Overview](./docs/images/dashboard.png)

**Features:**
- Client count and list
- Business units overview
- Registered sensors count
- Quick action buttons
- Recent activity

### Register Client
Simple form to register a new client with gasless transactions.

![Register Client Form](./docs/images/register-client.png)

**Process:**
1. Fill business information
2. Sign service authorization
3. Sign payment authorization
4. Transaction confirmed (gasless!)

### Sensor Details
Detailed view of individual sensor with readings history and location context.

![Sensor Details Page](./docs/images/sensor-details.png)

**Information Displayed:**
- Client and business unit context
- Sensor specifications
- Latest reading with visual indicators
- Reading history table
- Temperature/humidity trends

### Log Reading
Interface for logging sensor readings with real-time validation.

![Log Reading Form](./docs/images/log-reading.png)

**Features:**
- Business unit and sensor selection
- Temperature input with validation
- Humidity percentage input
- Online status toggle
- Automatic timestamp

> **Note:** Screenshots are illustrative. The actual UI may have minor differences based on the current version.

## 📊 Verified Transactions

Example transactions on Scroll Sepolia demonstrating gasless operations:

### Contract Deployments

**KoilenRegistry Contract:**
- Contract: [0x605d618A3D3ece7aAe6820007a5bF81649632077](https://sepolia.scrollscan.com/address/0x605d618A3D3ece7aAe6820007a5bF81649632077)
- Verified: ✅ Source code verified on ScrollScan
- Features: Client, BusinessUnit, and Sensor registration

**SensorDataRegistry Contract:**
- Contract: [0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268](https://sepolia.scrollscan.com/address/0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268)
- Verified: ✅ Source code verified on ScrollScan
- Features: Sensor reading logging and history

### EVVM Instance

**EVVM Contract:**
- Contract: [0x97f35683957475Fd1548463923EC2111E19a9fCb](https://sepolia.scrollscan.com/address/0x97f35683957475Fd1548463923EC2111E19a9fCb)
- EVVM ID: **1083**
- Token: KOIL (Principal Token)
- Status: ✅ Active and operational

### Example Operations

**Client Registration:**
- Operation: Gasless client registration via EVVM
- Gas Cost: **0 ETH** (gasless!)
- View example transactions on ScrollScan

**Business Unit Creation:**
- Operation: Gasless business unit creation
- Gas Cost: **0 ETH** (gasless!)
- View example transactions on ScrollScan

**Sensor Registration:**
- Operation: Gasless sensor registration
- Gas Cost: **0 ETH** (gasless!)
- View example transactions on ScrollScan

**Reading Logged:**
- Operation: Gasless sensor reading logging
- Gas Cost: **0 ETH** (gasless!)
- View example transactions on ScrollScan

---

**All transactions are completely gasless thanks to EVVM ID 1083!** 🎉

Users only need to sign messages with their wallet - no ETH required for gas fees.
