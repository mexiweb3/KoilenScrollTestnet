#!/bin/bash

export PATH="$PATH:$HOME/.foundry/bin"

echo "This script requires you to enter your password for the defaultKey account."
echo ""

# Run forge script with --account flag which handles the keystore internally
forge script script/StakeOne.s.sol:StakeOne \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --broadcast \
  --account defaultKey \
  -vvv

