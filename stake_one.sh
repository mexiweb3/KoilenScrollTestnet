#!/bin/bash

export PATH="$PATH:$HOME/.foundry/bin"

EVVM="0x97f35683957475Fd1548463923EC2111E19a9fCb"
STAKING="0x8291228ac301E8FCFc4773062453c7731E84BeDf"
GOLDEN_FISHER="0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF"
KOIL_TOKEN="0x0000000000000000000000000000000000000001"
RPC="https://sepolia-rpc.scroll.io/"

echo "=== Checking Status ==="
echo -n "KOIL Balance: "
cast call $EVVM "getBalance(address,address)(uint256)" $GOLDEN_FISHER $KOIL_TOKEN --rpc-url $RPC

echo -n "Staked Amount: "
cast call $STAKING "getUserAmountStaked(address)(uint256)" $GOLDEN_FISHER --rpc-url $RPC

echo -n "Staking Price: "
cast call $STAKING "priceOfStaking()(uint256)" --rpc-url $RPC

echo -n "Current Nonce: "
cast call $EVVM "getNextCurrentSyncNonce(address)(uint256)" $GOLDEN_FISHER --rpc-url $RPC

echo ""
echo "=== Ready to stake 1 token (5,083 KOIL) ==="
echo "This script will:"
echo "1. Call pay() to transfer 5,083 KOIL to staking contract"
echo "2. Call goldenStaking() to stake 1 token"
echo ""
echo "Use forge script to execute with proper signatures."
