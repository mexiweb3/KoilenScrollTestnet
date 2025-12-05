// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/contracts/koilen/KoilenRegistry.sol";

contract DebugRegisterClient is Script {
    function run() public {
        address registryAddr = 0x605d618A3D3ece7aAe6820007a5bF81649632077;
        KoilenRegistry registry = KoilenRegistry(registryAddr);
        
        // Decoded from transaction data
        address wallet = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;
        string memory businessName = "Mexi";
        string memory email = "m@mexi.wtf";
        string memory phoneNumber = "69";
        uint256 nonce = 0x325a07f4; // From tx data
        bytes memory signature = hex"0eb5491ac09c3e4c85f5166e543ea23376b92313fa41c991a96a1e18436b0edd2cd9a9831334b840f3ec218432c4f118ba3e285530fe338af6f8a116210ce5701c";
        uint256 priorityFeeEVVM = 0;
        uint256 nonceEVVM = 0x30602c82;
        bool priorityFlagEVVM = true;
        bytes memory signatureEVVM = hex"00cc5369637695e49f217edbc7c69da517347586955b24cc143ec76fbf77970d185c220e811f3aa69f8c93de3bdff49241a40b253f9ace528c498eec36dcee7c1b";
        
        console.log("Attempting to call registerClient...");
        console.log("Wallet:", wallet);
        console.log("Business Name:", businessName);
        
        // Try to call and see what reverts
        try registry.registerClient(
            wallet,
            businessName,
            email,
            phoneNumber,
            nonce,
            signature,
            priorityFeeEVVM,
            nonceEVVM,
            priorityFlagEVVM,
            signatureEVVM
        ) returns (uint256 clientId) {
            console.log("SUCCESS! Client ID:", clientId);
        } catch Error(string memory reason) {
            console.log("REVERT with reason:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("REVERT with low-level data:");
            console.logBytes(lowLevelData);
        }
    }
}
