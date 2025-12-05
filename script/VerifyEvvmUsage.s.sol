// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

interface IEvvm {
    function getServiceNonce(uint256 evvmId, address user) external view returns (uint256);
    function getPaymentNonce(address user) external view returns (uint256);
}

contract VerifyEvvmUsage is Script {
    function run() public view {
        // EVVM contract on Scroll Sepolia
        address evvmContract = 0x0b89F648EEcCc574a9b7449B5242103A6C7e0eE4;
        IEvvm evvm = IEvvm(evvmContract);
        
        // Your wallet address
        address userWallet = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;
        
        // Check nonces for EVVM ID 1083
        uint256 serviceNonce = evvm.getServiceNonce(1083, userWallet);
        uint256 paymentNonce = evvm.getPaymentNonce(userWallet);
        
        console.log("=== EVVM ID 1083 Verification ===");
        console.log("User Wallet:", userWallet);
        console.log("Service Nonce (EVVM 1083):", serviceNonce);
        console.log("Payment Nonce:", paymentNonce);
        console.log("");
        
        if (serviceNonce > 0) {
            console.log("SUCCESS: Service has been used", serviceNonce, "times with EVVM ID 1083");
        } else {
            console.log("WARNING: No service usage detected for EVVM ID 1083");
        }
        
        if (paymentNonce > 0) {
            console.log("SUCCESS: Payment nonce is", paymentNonce, "- transactions have been processed");
        }
    }
}
