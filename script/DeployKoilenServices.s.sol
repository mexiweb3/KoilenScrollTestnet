// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {KoilenRegistry} from "../src/contracts/koilen/KoilenRegistry.sol";
import {SensorDataRegistry} from "../src/contracts/koilen/SensorDataRegistry.sol";

contract DeployKoilenServices is Script {
    function run() public {
        // Scroll Sepolia addresses
        address evvmAddress = 0x97f35683957475Fd1548463923EC2111E19a9fCb;
        address stakingAddress = 0x8291228ac301E8FCFc4773062453c7731E84BeDf;

        vm.startBroadcast();

        KoilenRegistry koilenRegistry = new KoilenRegistry(evvmAddress, stakingAddress);
        SensorDataRegistry sensorDataRegistry = new SensorDataRegistry(evvmAddress, stakingAddress);

        vm.stopBroadcast();

        console2.log("KoilenRegistry deployed at:", address(koilenRegistry));
        console2.log("SensorDataRegistry deployed at:", address(sensorDataRegistry));
    }
}
