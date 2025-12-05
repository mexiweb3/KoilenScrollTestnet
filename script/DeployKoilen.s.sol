// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {KoilenRegistry} from "../src/contracts/koilen/KoilenRegistry.sol";
import {SensorDataRegistry} from "../src/contracts/koilen/SensorDataRegistry.sol";

/**
 * @title DeployKoilen
 * @dev Deployment script for Koilen IoT monitoring system
 * @notice Deploys KoilenRegistry and SensorDataRegistry contracts
 */
contract DeployKoilen is Script {

    KoilenRegistry public koilenRegistry;
    SensorDataRegistry public sensorDataRegistry;

    function run() public {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying Koilen contracts...");
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy KoilenRegistry
        console.log("\n1. Deploying KoilenRegistry...");
        koilenRegistry = new KoilenRegistry();
        console.log("KoilenRegistry deployed at:", address(koilenRegistry));

        // Deploy SensorDataRegistry
        console.log("\n2. Deploying SensorDataRegistry...");
        sensorDataRegistry = new SensorDataRegistry();
        console.log("SensorDataRegistry deployed at:", address(sensorDataRegistry));

        // Authorize KoilenRegistry to write to SensorDataRegistry (optional)
        console.log("\n3. Setting up permissions...");
        // Uncomment if you want KoilenRegistry to auto-log readings
        // sensorDataRegistry.authorizeWriter(address(koilenRegistry));
        // console.log("KoilenRegistry authorized as writer");

        vm.stopBroadcast();

        console.log("\n========================================");
        console.log("Deployment Summary");
        console.log("========================================");
        console.log("KoilenRegistry:", address(koilenRegistry));
        console.log("SensorDataRegistry:", address(sensorDataRegistry));
        console.log("========================================");
        console.log("\nSave these addresses to your frontend config!");
    }
}
