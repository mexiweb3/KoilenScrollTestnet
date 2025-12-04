# Setup Guide - KoilenScrollTestnet

This guide documents the complete setup and installation process for deploying an EVVM instance on Scroll Sepolia testnet.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installing Prerequisites](#installing-prerequisites)
3. [Repository Setup](#repository-setup)
4. [Environment Configuration](#environment-configuration)
5. [Wallet Setup](#wallet-setup)
6. [Deployment Process](#deployment-process)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## 💻 System Requirements

### Operating System
- Linux (Debian/Ubuntu recommended)
- macOS
- Windows (via WSL2)

### Minimum Requirements
- **RAM**: 4GB
- **Storage**: 2GB free space
- **Network**: Stable internet connection

### Required Software
- Node.js v18.x or higher
- npm v9.x or higher
- Git
- Foundry (forge & cast)

---

## 🔧 Installing Prerequisites

### Step 1: Install Node.js and npm

**On Debian/Ubuntu:**
```bash
sudo apt-get update
sudo apt-get install -y nodejs npm
```

**Verify installation:**
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show v9.x or higher
```

### Step 2: Install Foundry

Foundry is a toolkit for Ethereum development that includes `forge` (compiler) and `cast` (CLI tool).

**Installation (if curl is available):**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

**Installation (using wget - alternative method):**
```bash
# Download installer
wget -O foundryup-install.sh https://raw.githubusercontent.com/foundry-rs/foundry/master/foundryup/install

# Modify to use wget instead of curl
sed -i 's/curl -sSf -L/wget -q -O/g' foundryup-install.sh

# Run installer
bash foundryup-install.sh

# Add to PATH
export PATH="$PATH:$HOME/.foundry/bin"
echo 'export PATH="$PATH:$HOME/.foundry/bin"' >> ~/.bashrc
source ~/.bashrc
```

**Manual binary installation (if above fails):**
```bash
# Create Foundry directory
mkdir -p $HOME/.foundry/bin
cd $HOME/.foundry/bin

# Download latest release
wget https://github.com/foundry-rs/foundry/releases/download/v1.5.0/foundry_v1.5.0_linux_amd64.tar.gz

# Extract binaries
tar -xzf foundry_v1.5.0_linux_amd64.tar.gz
rm foundry_v1.5.0_linux_amd64.tar.gz

# Add to PATH
export PATH="$PATH:$HOME/.foundry/bin"
echo 'export PATH="$PATH:$HOME/.foundry/bin"' >> ~/.bashrc
```

**Verify Foundry installation:**
```bash
forge --version  # Should show: forge Version: 1.5.0-v1.5.0
cast --version   # Should show: cast Version: 1.5.0-v1.5.0
```

### Step 3: Install Git (if not already installed)

```bash
sudo apt-get install -y git
git --version
```

---

## 📦 Repository Setup

### Step 1: Download Repository

**Option A: Using Git Clone (Recommended)**
```bash
git clone https://github.com/EVVM-org/Testnet-Contracts.git
cd Testnet-Contracts
```

**Option B: Download as ZIP**
```bash
wget https://github.com/EVVM-org/Testnet-Contracts/archive/refs/heads/main.zip
unzip main.zip
mv Testnet-Contracts-main Testnet-Contracts
cd Testnet-Contracts

# Initialize git repository
git init
git remote add origin https://github.com/EVVM-org/Testnet-Contracts.git
git fetch origin main
git reset --hard origin/main
```

### Step 2: Initialize Git Submodules

EVVM uses several external libraries that need to be downloaded:

```bash
git submodule update --init --recursive
```

This will download:
- **LayerZero v2**: Cross-chain messaging
- **Axelar GMP SDK**: Cross-chain communication
- **Solady**: Optimized Solidity libraries
- **OpenZeppelin Contracts**: Security-audited contract libraries

**Expected output:**
```
Submodule path 'lib/LayerZero-v2': checked out '4645b579...'
Submodule path 'lib/axelar-gmp-sdk-solidity': checked out '00682b6c...'
Submodule path 'lib/solady': checked out 'acd959aa...'
...
```

### Step 3: Install npm Dependencies

```bash
npm install
```

This installs:
- TypeScript compiler and tools
- Deployment wizard dependencies
- Testing utilities

**Expected output:**
```
added 293 packages, and audited 294 packages in 24s
```

---

## ⚙️ Environment Configuration

### Step 1: Create .env File

Copy the example environment file:

```bash
cp .env.example .env
```

### Step 2: Configure .env

Edit `.env` file with your configuration:

```bash
nano .env  # or use your preferred editor
```

**Required Configuration:**

```env
# Scroll Sepolia Testnet RPC URL
RPC_URL_SCROLL_SEPOLIA="https://sepolia-rpc.scroll.io/"

# Etherscan API Key for contract verification
# Get from: https://scrollscan.com/apis
ETHERSCAN_API=YOUR_API_KEY_HERE
```

### Step 3: Get Scroll Sepolia API Key

1. Visit: https://scrollscan.com/apis
2. Create an account if you don't have one
3. Generate a new API key
4. Copy the API key to your `.env` file

### Step 4: Get Testnet ETH

You need Scroll Sepolia ETH to pay for gas fees:

1. Visit: https://sepolia.scroll.io/faucet
2. Connect your wallet or enter your address
3. Request testnet ETH
4. Wait for confirmation (usually 30 seconds)

**Recommended amount:** At least 0.001 ETH for deployment

---

## 🔑 Wallet Setup

### Step 1: Prepare Your Private Key

You need a wallet with Scroll Sepolia testnet ETH. Have your private key ready (64 hex characters, without the `0x` prefix).

**⚠️ Security Warning:**
- Never share your private key
- Never commit private keys to git
- Use a dedicated testnet wallet
- For production, use hardware wallets or multi-sig

### Step 2: Import Wallet to Foundry

Foundry provides a secure keystore to encrypt and store your private key:

```bash
cast wallet import defaultKey --interactive
```

**You will be prompted for:**
1. **Private key**: Paste your private key (input is hidden)
2. **Password**: Create a strong password to encrypt the keystore
3. **Confirm password**: Re-enter the password

**Expected output:**
```
`defaultKey` keystore was saved successfully.
Address: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
```

**Important Notes:**
- Your keystore is saved at: `~/.foundry/keystores/defaultKey`
- You'll need to enter the password when deploying
- Your private key is encrypted with your password
- Keep your password safe!

### Step 3: Verify Wallet Balance

Check your wallet has sufficient Scroll Sepolia ETH:

```bash
cast balance YOUR_ADDRESS --rpc-url https://sepolia-rpc.scroll.io/
```

Replace `YOUR_ADDRESS` with the address shown after importing.

---

## 🚀 Deployment Process

### Step 1: Run the Deployment Wizard

The EVVM wizard will guide you through the deployment process:

```bash
export PATH="$PATH:$HOME/.foundry/bin"
npm run wizard
```

### Step 2: Configure Administrator Addresses

The wizard will ask for administrator addresses:

```
=== Administrator Configuration ===
? Admin address (0x...): 0xYourAddress
? Golden Fisher address (0x...): 0xYourAddress
? Activator address (0x...): 0xYourAddress
```

**Roles:**
- **Admin**: System governance and parameter updates
- **Golden Fisher**: Unrestricted staking privileges
- **Activator**: System activation rights

**Tip:** You can use the same address for all roles in testing.

### Step 3: Configure EVVM Metadata

**Basic Metadata:**
```
=== EVVM Metadata Configuration ===
? EVVM Name [EVVM]: KoilenScrollTestnet
? Principal Token Name [Mate token]: KOIL
? Principal Token Symbol [MATE]: KOIL
```

**Advanced Configuration:**
```
? Do you want to configure advanced metadata? yes
? Total Supply [2033333333000000000000000000]: (accept default or customize)
? Era Tokens [1016666666500000000000000000]: (accept default or customize)
? Reward per operation [5000000000000000000]: (accept default or customize)
```

**Default Values:**
- Total Supply: 2,033,333,333 tokens (50% for staking)
- Era Tokens: 1,016,666,666.5 tokens (staking pool)
- Reward: 5 tokens per operation

### Step 4: Review Configuration

The wizard displays a summary:

```
=== Configuration Summary ===
Admin: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
Golden Fisher: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
Activator: 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF
EVVM Name: KoilenScrollTestnet
Principal Token Name: KOIL
Principal Token Symbol: KOIL
...

? Is the data correct? yes
```

Carefully review and confirm.

### Step 5: Select Network

```
=== Network Selection ===
Available networks:
  eth    - Ethereum Sepolia
  arb    - Arbitrum Sepolia
  custom - Custom RPC URL

? Select network: Custom RPC URL
```

Select **Custom RPC URL** for Scroll Sepolia.

### Step 6: Enter Scroll RPC

```
=== Custom Network Configuration ===
? Enter RPC URL: https://sepolia-rpc.scroll.io/
```

### Step 7: Select Wallet

```
=== Wallet Selection ===
? Select wallet for deployment: defaultKey
```

Select the wallet you imported earlier.

### Step 8: Enter Keystore Password

```
Enter keystore password: [your password]
```

Enter the password you used when importing the wallet.

### Step 9: Wait for Deployment

The wizard will now:
1. ✅ Compile contracts (~10 seconds)
2. ✅ Deploy all contracts (~30 seconds)
3. ✅ Verify contracts on ScrollScan (~2 minutes)

**Expected console output:**
```
🚀 Starting deployment on custom network...
[⠒] Compiling...
Compiler run successful!

##### scroll-sepolia
✅  [Success] Hash: 0xdf2818f76...
Contract Address: 0xc3c21D70C34fBc14Ad43bFc833c482B8EF58BdE2
Block: 15290185

...

All (6) contracts were verified!
```

### Step 10: Note Your EVVM ID

At the end, you'll receive your EVVM ID:

```
EVVM ID Assigned: 1082
```

**Save this number!** You'll need it to interact with your EVVM instance.

---

## ✅ Verification

### Verify Deployment Success

After deployment, verify everything worked correctly:

**1. Check Contract on ScrollScan:**
```
Visit: https://sepolia.scrollscan.com/address/YOUR_EVVM_ADDRESS
```

You should see:
- ✅ Contract is verified (green checkmark)
- ✅ Source code is visible
- ✅ Recent transactions

**2. Read Contract Data:**

Using cast:
```bash
# Get EVVM name
cast call YOUR_EVVM_ADDRESS \
  "getEvvmName()(string)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Expected: "KoilenScrollTestnet"

# Get token symbol
cast call YOUR_EVVM_ADDRESS \
  "symbol()(string)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Expected: "KOIL"
```

**3. Check Deployment Files:**

Verify configuration files were created:
```bash
ls -la input/
# Should show:
# - address.json
# - evvmBasicMetadata.json
# - evvmAdvancedMetadata.json

cat input/address.json
# Should show your admin addresses
```

**4. Check Deployment Logs:**

```bash
ls -la broadcast/DeployTestnet.s.sol/534351/
# Should show deployment transaction logs
```

---

## 🐛 Troubleshooting

### Issue: "Command not found: forge"

**Solution:**
```bash
# Add Foundry to PATH
export PATH="$PATH:$HOME/.foundry/bin"

# Make permanent
echo 'export PATH="$PATH:$HOME/.foundry/bin"' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "Git submodule update failed"

**Solution:**
```bash
# Ensure you're in a git repository
git init
git remote add origin https://github.com/EVVM-org/Testnet-Contracts.git
git fetch origin main
git reset --hard origin/main

# Then retry submodules
git submodule update --init --recursive
```

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Retry installation
npm install
```

### Issue: "Insufficient funds for deployment"

**Solution:**
```bash
# Check balance
cast balance YOUR_ADDRESS --rpc-url https://sepolia-rpc.scroll.io/

# If balance is 0, get testnet ETH from faucet:
# https://sepolia.scroll.io/faucet
```

### Issue: "RPC connection failed"

**Solution:**
```bash
# Try alternative RPC endpoints in .env:
RPC_URL_SCROLL_SEPOLIA="https://scroll-sepolia.blockpi.network/v1/rpc/public"
# or
RPC_URL_SCROLL_SEPOLIA="https://scroll-testnet-public.unifra.io"
```

### Issue: "Contract verification failed"

**Causes:**
- Invalid Etherscan API key
- Network congestion
- Compiler version mismatch

**Solution:**
```bash
# 1. Verify API key in .env
nano .env  # Check ETHERSCAN_API

# 2. Wait and retry (verification happens automatically)
# 3. Manual verification:
forge verify-contract \
  YOUR_CONTRACT_ADDRESS \
  src/contracts/evvm/Evvm.sol:Evvm \
  --chain scroll-sepolia \
  --etherscan-api-key YOUR_API_KEY
```

### Issue: "Keystore password prompt doesn't appear"

**Solution:**
This means the wizard can't get interactive input. Run it manually:
```bash
cast wallet import defaultKey --interactive
# Enter private key and password when prompted
```

---

## 📝 Post-Deployment Checklist

After successful deployment:

- [ ] Save your EVVM ID
- [ ] Bookmark contract addresses on ScrollScan
- [ ] Backup configuration files (`input/*.json`)
- [ ] Document your admin password securely
- [ ] Test basic contract interactions
- [ ] Set up monitoring (optional)
- [ ] Push to GitHub (optional)

---

## 🎯 Next Steps

1. **Explore Your EVVM**
   ```bash
   # Read contract data
   cast call EVVM_ADDRESS "getEvvmName()(string)" \
     --rpc-url https://sepolia-rpc.scroll.io/
   ```

2. **Build Applications**
   - Use the EVVM SDK: `npm install @evvm/testnet-contracts`
   - Create dApps that interact with your contracts
   - Develop custom staking interfaces

3. **Push to GitHub**
   ```bash
   # Create new repository on GitHub
   # Then:
   git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git add .
   git commit -m "Initial deployment"
   git push -u origin master
   ```

4. **Monitor Activity**
   - Check transactions on ScrollScan
   - Set up event listeners
   - Track staking activity

---

## 📚 Additional Resources

### Documentation
- **EVVM Docs**: https://github.com/EVVM-org/Testnet-Contracts
- **Scroll Docs**: https://docs.scroll.io/
- **Foundry Book**: https://book.getfoundry.sh/

### Tools
- **ScrollScan**: https://sepolia.scrollscan.com/
- **Scroll Faucet**: https://sepolia.scroll.io/faucet
- **Chainlist**: https://chainlist.org/chain/534351

### Support
- **GitHub Issues**: https://github.com/EVVM-org/Testnet-Contracts/issues
- **Scroll Discord**: https://discord.gg/scroll

---

**Generated with [Claude Code](https://claude.com/claude-code)**

*Last Updated: December 4, 2025*
