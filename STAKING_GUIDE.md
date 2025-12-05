# Staking Guide - KoilenScrollTestnet

Complete guide to staking on your EVVM instance and earning KOIL rewards.

---

## 📋 Overview

**Staking Contract:** [`0x8291228ac301E8FCFc4773062453c7731E84BeDf`](https://sepolia.scrollscan.com/address/0x8291228ac301E8FCFc4773062453c7731E84BeDf)

**Current Staking Price:** 5,083 KOIL per stake
**Your Role:** Golden Fisher (unrestricted staking privileges)
**Era Tokens Available:** 1,016,666,666.5 KOIL (reward pool)

---

## 🎯 Understanding EVVM Staking

### What is Staking?

In EVVM, staking allows you to:
- Lock KOIL tokens in the staking contract
- Earn era-based rewards
- Participate in network governance
- Validate operations

### Three Types of Staking

1. **Golden Staking** 👑
   - For: Golden Fisher (YOU!)
   - Requirements: None (unrestricted)
   - Benefits: Can stake any amount without restrictions
   - Function: `goldenStaking()`

2. **Presale Staking** 🎟️
   - For: Whitelisted presale addresses
   - Requirements: Must be added to presale list
   - Function: `presaleStaking()`

3. **Public Staking** 🌍
   - For: Anyone
   - Requirements: Minimum stake amount
   - Function: `publicStaking()`

---

## 👑 Golden Staking (Your Privilege)

As the Golden Fisher, you have special staking rights with no restrictions.

### Current Status

```bash
# Check your admin role
cast call 0x8291228ac301E8FCFc4773062453c7731E84BeDf \
  "getGoldenFisher()(address)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Expected: 0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf
```

### Check Your Staking Status

```bash
export PATH="$PATH:$HOME/.foundry/bin"

# Check your current stake
cast call 0x8291228ac301E8FCFc4773062453c7731E84BeDf \
  "getUserAmountStaked(address)(uint256)" \
  0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf \
  --rpc-url https://sepolia-rpc.scroll.io/

# Check your KOIL balance
cast call 0x97f35683957475Fd1548463923EC2111E19a9fCb \
  "getBalance(address,address)(uint256)" \
  0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf \
  0x0000000000000000000000000000000000000001 \
  --rpc-url https://sepolia-rpc.scroll.io/
```

---

## 🚀 How to Stake (Golden Staking)

### Understanding the Function

```solidity
function goldenStaking(
    bool isStaking,        // true = stake, false = unstake
    uint256 amountOfStaking,  // amount to stake/unstake
    bytes memory signature_EVVM  // signature for EVVM operations
) external;
```

### Important Notes

⚠️ **Bootstrap Problem**: You currently have 0 KOIL tokens. As the Golden Fisher, you may need to:

1. **Mint initial tokens** - Use admin functions to mint tokens to your address
2. **Use golden staking directly** - Golden stakers may bypass balance checks
3. **Receive tokens through EVVM pay** - Someone can send you tokens

### Check Admin Functions

```bash
# Check if you're the admin
cast call 0x97f35683957475Fd1548463923EC2111E19a9fCb \
  "getCurrentAdmin()(address)" \
  --rpc-url https://sepolia-rpc.scroll.io/

# Expected: 0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf
```

---

## 💰 Getting Your First KOIL Tokens

Since you're starting with 0 KOIL, here are ways to get tokens:

### Option 1: Admin Minting (If Available)

Check if admin can add balance:

```bash
# The EVVM contract has addAmountToUser function
# As admin, you can call this

cast send 0x97f35683957475Fd1548463923EC2111E19a9fCb \
  "addAmountToUser(address,address,uint256)" \
  0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf \
  0x0000000000000000000000000000000000000001 \
  10000000000000000000000 \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --password
```

**Parameters:**
- User address: `0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf`
- Token address: `0x0000000000000000000000000000000000000001` (KOIL)
- Amount: `10000000000000000000000` (10,000 KOIL with 18 decimals)

### Option 2: Earn Through Operations

EVVM rewards operations with KOIL:
- **Reward per operation**: 5 KOIL
- **Available through**: Payments, swaps, name registrations

### Option 3: Receive via EVVM Pay

Someone can send you KOIL using the `pay()` function.

---

## 📊 Checking Staking Information

### View Functions

```bash
export PATH="$PATH:$HOME/.foundry/bin"
RPC="https://sepolia-rpc.scroll.io/"
STAKING="0x8291228ac301E8FCFc4773062453c7731E84BeDf"
YOUR_ADDRESS="0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf"

# Get staking price
cast call $STAKING "priceOfStaking()(uint256)" --rpc-url $RPC

# Get your staked amount
cast call $STAKING "getUserAmountStaked(address)(uint256)" $YOUR_ADDRESS --rpc-url $RPC

# Get unlock time for staking
cast call $STAKING "getTimeToUserUnlockStakingTime(address)(uint256)" $YOUR_ADDRESS --rpc-url $RPC

# Get unlock time for full unstaking
cast call $STAKING "getTimeToUserUnlockFullUnstakingTime(address)(uint256)" $YOUR_ADDRESS --rpc-url $RPC

# Get your staking history size
cast call $STAKING "getSizeOfAddressHistory(address)(uint256)" $YOUR_ADDRESS --rpc-url $RPC

# Get seconds to unlock staking
cast call $STAKING "getSecondsToUnlockStaking()(uint256)" --rpc-url $RPC

# Get seconds to unlock full unstaking
cast call $STAKING "getSecondsToUnlockFullUnstaking()(uint256)" --rpc-url $RPC
```

---

## 🔍 Staking Transaction Example

Once you have KOIL tokens, here's how to stake:

### Step 1: Prepare Signature

The `goldenStaking` function requires an EVVM signature. This is complex and typically handled by the EVVM SDK or frontend.

**Using Foundry Script (Advanced):**

Create a script file `script/StakeAsGolden.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

interface IStaking {
    function goldenStaking(
        bool isStaking,
        uint256 amountOfStaking,
        bytes memory signature_EVVM
    ) external;
}

contract StakeAsGolden is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        IStaking staking = IStaking(0x8291228ac301E8FCFc4773062453c7731E84BeDf);

        // Stake 5,083 KOIL (minimum stake amount)
        uint256 stakeAmount = 5083000000000000000000;

        // For golden fisher, signature might be empty or minimal
        bytes memory signature = "";

        staking.goldenStaking(
            true,        // isStaking = true
            stakeAmount, // amount
            signature    // signature
        );

        vm.stopBroadcast();
    }
}
```

**Run the script:**
```bash
forge script script/StakeAsGolden.s.sol:StakeAsGolden \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --broadcast \
  --account defaultKey
```

---

## 📈 Earning Rewards

### How Rewards Work

- **Era-based system**: Rewards distributed over eras
- **Total reward pool**: 1,016,666,666.5 KOIL
- **Reward per operation**: 5 KOIL
- **Staking increases**: Your share of operation rewards

### Claiming Rewards

Check the `gimmeYiel` function:

```bash
# This function is called to claim your staking yield
cast send 0x8291228ac301E8FCFc4773062453c7731E84BeDf \
  "gimmeYiel(address)(bytes32,address,uint256,uint256,uint256)" \
  0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --password
```

---

## 🛡️ Unstaking

When you want to unstake your KOIL:

### Check Unlock Times

```bash
# Check when you can unstake
cast call 0x8291228ac301E8FCFc4773062453c7731E84BeDf \
  "getTimeToUserUnlockFullUnstakingTime(address)(uint256)" \
  0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf \
  --rpc-url https://sepolia-rpc.scroll.io/
```

### Unstake (When Unlocked)

```bash
# Use goldenStaking with isStaking = false
# Similar to staking but with isStaking parameter as false
```

---

## 🧪 Testing Staking Locally

### Using Foundry Tests

Create `test/Staking.t.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";

interface IStaking {
    function getUserAmountStaked(address) external view returns (uint256);
    function priceOfStaking() external pure returns (uint256);
    function getGoldenFisher() external view returns (address);
}

interface IEvvm {
    function getBalance(address, address) external view returns (uint256);
}

contract StakingTest is Test {
    IStaking staking = IStaking(0x8291228ac301E8FCFc4773062453c7731E84BeDf);
    IEvvm evvm = IEvvm(0x97f35683957475Fd1548463923EC2111E19a9fCb);
    address goldenFisher = 0xa1fa6f037cac8ffc0be322ad2abf2c4a33989bbf;
    address koilToken = 0x0000000000000000000000000000000000000001;

    function setUp() public {
        vm.createSelectFork("https://sepolia-rpc.scroll.io/");
    }

    function testCheckGoldenFisher() public view {
        assertEq(staking.getGoldenFisher(), goldenFisher);
    }

    function testCheckStakingPrice() public view {
        uint256 price = staking.priceOfStaking();
        console.log("Staking price:", price);
        assertGt(price, 0);
    }

    function testCheckUserStake() public view {
        uint256 staked = staking.getUserAmountStaked(goldenFisher);
        console.log("Golden Fisher staked:", staked);
    }

    function testCheckUserBalance() public view {
        uint256 balance = evvm.getBalance(goldenFisher, koilToken);
        console.log("Golden Fisher KOIL balance:", balance);
    }
}
```

**Run tests:**
```bash
forge test --match-contract StakingTest -vv
```

---

## 📚 Additional Resources

### Contract Addresses

- **EVVM**: `0x97f35683957475Fd1548463923EC2111E19a9fCb`
- **Staking**: `0x8291228ac301E8FCFc4773062453c7731E84BeDf`
- **KOIL Token**: `0x0000000000000000000000000000000000000001`

### Explorer Links

- [EVVM on ScrollScan](https://sepolia.scrollscan.com/address/0x97f35683957475Fd1548463923EC2111E19a9fCb)
- [Staking on ScrollScan](https://sepolia.scrollscan.com/address/0x8291228ac301E8FCFc4773062453c7731E84BeDf)

### Documentation

- [Main Deployment Guide](./DEPLOYMENT.md)
- [Setup Guide](./SETUP.md)
- [EVVM Documentation](https://github.com/EVVM-org/Testnet-Contracts)

---

## 🐛 Troubleshooting

### "Insufficient Balance" Error

If you get this error when trying to stake:
1. Check your KOIL balance (should be > staking price)
2. Use admin function to add balance if needed
3. Or wait for operation rewards to accumulate

### "Invalid Signature" Error

Golden Fisher signatures might need special handling:
1. Try empty signature: `bytes("")`
2. Use the EVVM SDK for proper signature generation
3. Check if golden fisher has signature bypass

### Transaction Reverts

Common causes:
- Not enough KOIL balance
- Staking/unstaking timelock not expired
- Incorrect function parameters
- Network issues

---

## 🎯 Quick Start Checklist

- [ ] Verify you're the Golden Fisher
- [ ] Check staking price
- [ ] Get initial KOIL tokens (via admin minting)
- [ ] Perform golden staking
- [ ] Check your staked amount
- [ ] Monitor rewards accumulation
- [ ] Test unstaking (when needed)

---

## 💡 Pro Tips

1. **Start Small**: Test with minimum stake amount first
2. **Monitor Gas**: Scroll Sepolia is cheap, but watch gas prices
3. **Track History**: Use `getAddressHistory` to see your staking history
4. **Use SDK**: For production, use the EVVM SDK for easier integration
5. **Set Reminders**: Track unlock times for unstaking

---

**Generated with [Claude Code](https://claude.com/claude-code)**

*Last Updated: December 4, 2025*
