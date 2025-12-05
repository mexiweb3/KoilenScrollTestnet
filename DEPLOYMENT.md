# KoilenScrollTestnet EVVM Deployment Documentation

## 📋 Overview

This document provides complete documentation for the deployment of **KoilenScrollTestnet**, an EVVM (EVM Virtualization) instance deployed on Scroll Sepolia testnet.

**EVVM ID:** `1082`
**Network:** Scroll Sepolia (Chain ID: 534351)
**Token Symbol:** KOIL
**Deployment Date:** December 4, 2025

---

## 🎯 What is EVVM?

EVVM (EVM Virtualization) is an infraless blockchain virtualization solution that solves scalability and chain fragmentation by allowing you to create virtual blockchains deployed as smart contracts on existing EVM-compatible networks.

### Key Features:
- **Virtual Blockchain**: Full blockchain functionality as smart contracts
- **Native Token**: Custom token (KOIL) for the ecosystem
- **Staking System**: Era-based rewards and golden staking
- **Name Service**: On-chain domain registration
- **Treasury**: Decentralized fund management
- **P2P Swap**: Peer-to-peer token exchange

---

## 🏗️ Architecture

### Deployed Contracts

| Contract | Address | Purpose |
|----------|---------|---------|
| **EVVM Core** | [`0x97f35683957475Fd1548463923EC2111E19a9fCb`](https://sepolia.scrollscan.com/address/0x97f35683957475Fd1548463923EC2111E19a9fCb) | Main EVVM contract handling token minting, transfers, and core logic |
| **Staking** | [`0x8291228ac301E8FCFc4773062453c7731E84BeDf`](https://sepolia.scrollscan.com/address/0x8291228ac301E8FCFc4773062453c7731E84BeDf) | Manages staking operations and era rewards |
| **Estimator** | [`0x08cb050641b028a4467438e76546270Fe195F4cB`](https://sepolia.scrollscan.com/address/0x08cb050641b028a4467438e76546270Fe195F4cB) | Estimates gas costs and operation fees |
| **NameService** | [`0xC63F7bF078f84Fc2af163dEADDFbb0223DC9F416`](https://sepolia.scrollscan.com/address/0xC63F7bF078f84Fc2af163dEADDFbb0223DC9F416) | Handles domain name registration and management |
| **Treasury** | [`0x8fbc0B5bfa930d7B24CE99cF23F122958e3b43FD`](https://sepolia.scrollscan.com/address/0x8fbc0B5bfa930d7B24CE99cF23F122958e3b43FD) | Manages ecosystem funds and distributions |
| **P2PSwap** | [`0xd74B1BF6579ec20a55c62b5a3a91886F8eB52856`](https://sepolia.scrollscan.com/address/0xd74B1BF6579ec20a55c62b5a3a91886F8eB52856) | Enables peer-to-peer token swaps |

### Contract Verification

✅ All contracts are **verified on ScrollScan** with source code publicly available.

---

## 🔧 Deployment Process

### Prerequisites Installed

1. **Node.js & npm** (v18.20.4)
   - Package manager for JavaScript dependencies

2. **Foundry** (v1.5.0)
   - `forge`: Solidity compiler and testing framework
   - `cast`: Command-line tool for Ethereum interactions

3. **Git & Submodules**
   - Repository management
   - Dependencies: LayerZero v2, Axelar GMP, Solady

### Environment Setup

**RPC Configuration:**
```env
RPC_URL_SCROLL_SEPOLIA="https://sepolia-rpc.scroll.io/"
```

**API Keys:**
- Etherscan API for contract verification
- Configured in `.env` (not committed to repository)

### Deployment Steps

1. **Repository Setup**
   ```bash
   git clone https://github.com/EVVM-org/Testnet-Contracts
   cd Testnet-Contracts
   git submodule update --init --recursive
   npm install
   ```

2. **Wallet Configuration**
   ```bash
   cast wallet import defaultKey --interactive
   # Imported: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
   ```

3. **Configuration Files**

   **`input/address.json`**
   ```json
   {
     "admin": "0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF",
     "goldenFisher": "0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF",
     "activator": "0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF"
   }
   ```

   **`input/evvmBasicMetadata.json`**
   ```json
   {
     "EvvmName": "KoilenScrollTestnet",
     "principalTokenName": "KOIL",
     "principalTokenSymbol": "KOIL"
   }
   ```

   **`input/evvmAdvancedMetadata.json`**
   ```json
   {
     "totalSupply": "2033333333000000000000000000",
     "eraTokens": "1016666666500000000000000000",
     "reward": "5000000000000000000"
   }
   ```

4. **Deployment Execution**
   ```bash
   export PATH="$PATH:$HOME/.foundry/bin"
   npm run wizard
   ```

   **Wizard Configuration:**
   - Network: Custom RPC URL
   - RPC: `https://sepolia-rpc.scroll.io/`
   - Chain ID: 534351 (Scroll Sepolia)
   - Wallet: defaultKey
   - Auto-verification: Enabled

---

## 💰 Token Economics

### KOIL Token Configuration

| Parameter | Value |
|-----------|-------|
| **Total Supply** | 2,033,333,333 KOIL |
| **Era Tokens (Staking Pool)** | 1,016,666,666.5 KOIL |
| **Reward per Operation** | 5 KOIL |
| **Decimals** | 18 |

### Distribution Model
- **50%** allocated to era rewards (staking)
- **50%** available for ecosystem operations

---

## 📊 Deployment Statistics

### Gas Costs

| Contract | Gas Used | Cost (ETH) |
|----------|----------|------------|
| Staking | 3,071,279 | 0.000048157986 |
| EVVM | 2,933,833 | 0.000046002818 |
| P2PSwap | 3,565,521 | 0.000055907754 |
| NameService | 3,778,893 | 0.000059253450 |
| Estimator | 964,341 | 0.000015120971 |
| Treasury | 444,150 | 0.000006964319 |
| **Total** | **14,941,230** | **0.000234280100** |

**Average Gas Price:** 0.015680108 gwei
**Total Deployment Cost:** ~$0.90 USD (at time of deployment)

### Deployment Blocks

- **Block Range:** 15290185 - 15290187
- **Network:** Scroll Sepolia
- **Date:** December 4, 2025
- **Time:** ~22:49 UTC

---

## 🔑 Admin Configuration

### Administrative Addresses

All administrative roles are currently assigned to:
```
0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
```

### Roles & Permissions

1. **Admin**
   - System governance
   - Parameter updates
   - Emergency controls

2. **Golden Fisher**
   - Unrestricted golden staking privileges
   - Special sudo-like account
   - Single account per deployment

3. **Activator**
   - System activation rights
   - Feature enablement

---

## 🌐 Network Information

### Scroll Sepolia Testnet

| Parameter | Value |
|-----------|-------|
| **Chain ID** | 534351 |
| **RPC URL** | https://sepolia-rpc.scroll.io/ |
| **Block Explorer** | https://sepolia.scrollscan.com/ |
| **Native Token** | ETH (Sepolia) |
| **Faucet** | https://sepolia.scroll.io/faucet |

### Alternative RPC Endpoints

```
https://scroll-sepolia.blockpi.network/v1/rpc/public
https://scroll-testnet-public.unifra.io
https://rpc.ankr.com/scroll_sepolia_testnet
```

---

## 🚀 Quick Start Guide

### Interacting with Your EVVM

#### Using Cast (Foundry)

**Check KOIL Balance:**
```bash
cast call 0xD192A9753fAd5f5D899bD475Fd2e4054c2dECAEe \
  "balanceOf(address)(uint256)" \
  YOUR_ADDRESS \
  --rpc-url https://sepolia-rpc.scroll.io/
```

**Get EVVM Name:**
```bash
cast call 0xD192A9753fAd5f5D899bD475Fd2e4054c2dECAEe \
  "getEvvmName()(string)" \
  --rpc-url https://sepolia-rpc.scroll.io/
```

#### Using Web3.js/Ethers.js

```javascript
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://sepolia-rpc.scroll.io/');
const evvmAddress = '0xD192A9753fAd5f5D899bD475Fd2e4054c2dECAEe';

// Read EVVM name
const evvmAbi = ['function getEvvmName() view returns (string)'];
const evvm = new ethers.Contract(evvmAddress, evvmAbi, provider);
const name = await evvm.getEvvmName();
console.log('EVVM Name:', name); // "KoilenScrollTestnet"
```

### Using the EVVM SDK

Install the SDK:
```bash
npm install @evvm/testnet-contracts
```

Import and use:
```javascript
import { Evvm, Staking } from '@evvm/testnet-contracts';

// Connect to your EVVM instance
const evvm = new Evvm(
  '0xD192A9753fAd5f5D899bD475Fd2e4054c2dECAEe',
  provider
);

// Interact with staking
const staking = new Staking(
  '0xc3c21D70C34fBc14Ad43bFc833c482B8EF58BdE2',
  provider
);
```

---

## 📁 Repository Structure

```
KoilenScrollTestnet/
├── src/
│   ├── contracts/         # Solidity smart contracts
│   │   ├── evvm/         # EVVM core contract
│   │   ├── staking/      # Staking & Estimator
│   │   ├── nameService/  # Domain name system
│   │   ├── treasury/     # Treasury management
│   │   └── p2pSwap/      # P2P exchange
│   ├── interfaces/       # Contract interfaces
│   └── library/          # Helper libraries
├── script/               # Deployment scripts
├── input/                # Configuration files
│   ├── address.json
│   ├── evvmBasicMetadata.json
│   └── evvmAdvancedMetadata.json
├── lib/                  # External dependencies
│   ├── LayerZero-v2/
│   ├── axelar-gmp-sdk-solidity/
│   └── solady/
├── test/                 # Contract tests
└── foundry.toml          # Foundry configuration
```

---

## 🔐 Security Considerations

### Best Practices Implemented

✅ **All contracts verified** on ScrollScan
✅ **Multi-signature recommended** for production admin
✅ **Private keys secured** in Foundry keystore
✅ **Environment variables** excluded from repository
✅ **Audited dependencies** (LayerZero, Axelar, Solady)

### Security Recommendations

1. **Multi-Sig Wallet**: Consider using a multi-signature wallet for admin operations in production
2. **Timelock**: Implement timelock for critical parameter changes
3. **Regular Audits**: Schedule periodic security audits
4. **Access Control**: Review and limit admin privileges
5. **Monitoring**: Set up monitoring for contract events and transactions

---

## 🧪 Testing

### Running Tests

```bash
# Compile contracts
forge build

# Run all tests
forge test

# Run with verbosity
forge test -vvv

# Run specific test
forge test --match-test testStaking
```

### Test Coverage

```bash
forge coverage
```

---

## 📚 Additional Resources

### Documentation

- **EVVM Documentation**: https://github.com/EVVM-org/Testnet-Contracts/tree/main/README.md
- **Scroll Documentation**: https://docs.scroll.io/
- **Foundry Book**: https://book.getfoundry.sh/

### Contract ABIs

ABIs for all deployed contracts are available in:
```
out/{ContractName}.sol/{ContractName}.json
```

### Block Explorers

- **Scroll Sepolia**: https://sepolia.scrollscan.com/
- **EVVM Contract**: https://sepolia.scrollscan.com/address/0xd192a9753fad5f5d899bd475fd2e4054c2decaee
- **Staking Contract**: https://sepolia.scrollscan.com/address/0xc3c21d70c34fbc14ad43bfc833c482b8ef58bde2

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "RPC Error"**
```bash
# Solution: Use alternative RPC endpoint
export RPC_URL_SCROLL_SEPOLIA="https://scroll-sepolia.blockpi.network/v1/rpc/public"
```

**Issue: "Insufficient Funds"**
```bash
# Solution: Get testnet ETH from faucet
# Visit: https://sepolia.scroll.io/faucet
```

**Issue: "Contract Verification Failed"**
- Ensure Etherscan API key is correct in `.env`
- Wait a few minutes and retry verification
- Check compiler version matches (0.8.30)

---

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `forge test`
5. Submit a pull request

### Code Standards

- Solidity style guide: Follow official Solidity conventions
- Comments: Document all public functions
- Testing: Maintain >80% test coverage

---

## 📞 Support & Contact

### Links

- **Repository**: https://github.com/mexiweb3/KoilenScrollTestnet
- **EVVM Docs**: https://github.com/EVVM-org/Testnet-Contracts
- **Scroll Testnet**: https://sepolia.scroll.io/

### Issues

Report issues on GitHub: https://github.com/mexiweb3/KoilenScrollTestnet/issues

---

## 📜 License

This project inherits the license from EVVM-org/Testnet-Contracts.

See [LICENSE](./LICENSE) for details.

---

## 🎯 Next Steps

1. **Explore Contracts**: Review deployed contracts on ScrollScan
2. **Test Interactions**: Try staking, transfers, and name registration
3. **Build dApps**: Create applications using the EVVM SDK
4. **Monitor Activity**: Track transactions and events
5. **Scale**: Consider deploying on mainnet when ready

---

## 📊 Deployment Summary

```
╔════════════════════════════════════════════════════════════╗
║         KoilenScrollTestnet EVVM Deployment                ║
╠════════════════════════════════════════════════════════════╣
║ EVVM ID:           1082                                    ║
║ Network:           Scroll Sepolia (534351)                 ║
║ Token:             KOIL                                    ║
║ Total Contracts:   6                                       ║
║ Total Gas:         14,941,230                              ║
║ Total Cost:        0.000234 ETH                            ║
║ Status:            ✅ Verified & Live                      ║
╚════════════════════════════════════════════════════════════╝
```

---

**Generated with [Claude Code](https://claude.com/claude-code)**

*Last Updated: December 4, 2025*
