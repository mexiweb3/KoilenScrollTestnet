#!/bin/bash

# Koilen Web3 Deployment Script
# Deploys KoilenRegistry and SensorDataRegistry to Scroll Sepolia

echo "🚀 Koilen Web3 Deployment Script"
echo "================================="
echo ""

# Add Foundry to PATH
export PATH="$PATH:$HOME/.foundry/bin"

# Check if forge is available
if ! command -v forge &> /dev/null; then
    echo "❌ Error: Foundry not found"
    echo "Please install Foundry first"
    exit 1
fi

echo "📦 Compiling contracts..."
forge build --skip '*/StakeOne.sol' --skip '*/StakeExact.sol'

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed"
    exit 1
fi

echo "✅ Compilation successful!"
echo ""

echo "🔐 Deploying to Scroll Sepolia..."
echo "Network: Scroll Sepolia (Chain ID: 534351)"
echo "RPC: https://sepolia-rpc.scroll.io/"
echo ""

# Deploy using the script
forge script script/DeployKoilen.s.sol \
  --rpc-url https://sepolia-rpc.scroll.io/ \
  --account defaultKey \
  --broadcast \
  --legacy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Save the contract addresses above!"
echo "You'll need to update them in frontend/src/config/blockchain.js"
