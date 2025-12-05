// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/contracts/koilen/KoilenRegistry.sol";

contract CheckRegistration is Script {
    function run() public view {
        address registryAddr = 0x605d618A3D3ece7aAe6820007a5bF81649632077;
        address userAddr = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;

        KoilenRegistry registry = KoilenRegistry(registryAddr);
        
        uint256 clientId = registry.walletToClientId(userAddr);
        console.log("Client ID for wallet", userAddr, ":", clientId);
        
        if (clientId > 0) {
            (uint256 id, address wallet, string memory businessName, string memory email, string memory phoneNumber, bool isActive, uint256 createdAt, uint256 updatedAt) = registry.clients(clientId);
            console.log("Client Name:", businessName);
            console.log("Client Email:", email);
        } else {
            console.log("Client not found.");
        }
    }
}
