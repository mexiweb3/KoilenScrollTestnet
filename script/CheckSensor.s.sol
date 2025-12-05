// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/contracts/koilen/KoilenRegistry.sol";

contract CheckSensor is Script {
    function run() public view {
        address registryAddr = 0x605d618A3D3ece7aAe6820007a5bF81649632077;
        KoilenRegistry registry = KoilenRegistry(registryAddr);
        
        // Check sensor 1
        try registry.getSensor(1) returns (KoilenRegistry.Sensor memory sensor) {
            console.log("=== SENSOR 1 ===");
            console.log("ID:", sensor.id);
            console.log("Business Unit ID:", sensor.businessUnitId);
            console.log("Device ID:", sensor.deviceId);
            console.log("Name:", sensor.name);
            console.log("Location:", sensor.location);
            
            // Get business unit
            try registry.getBusinessUnit(sensor.businessUnitId) returns (KoilenRegistry.BusinessUnit memory bu) {
                console.log("\n=== BUSINESS UNIT", sensor.businessUnitId, "===");
                console.log("Name:", bu.name);
                console.log("Client ID:", bu.clientId);
                
                // Get client
                try registry.getClient(bu.clientId) returns (KoilenRegistry.Client memory client) {
                    console.log("\n=== CLIENT", bu.clientId, "===");
                    console.log("Business Name:", client.businessName);
                    console.log("Email:", client.email);
                } catch {
                    console.log("ERROR: Could not get client", bu.clientId);
                }
            } catch {
                console.log("ERROR: Could not get business unit", sensor.businessUnitId);
            }
        } catch {
            console.log("ERROR: Sensor 1 not found");
        }
        
        console.log("\n\n");
        
        // Check sensor 2
        try registry.getSensor(2) returns (KoilenRegistry.Sensor memory sensor) {
            console.log("=== SENSOR 2 ===");
            console.log("ID:", sensor.id);
            console.log("Business Unit ID:", sensor.businessUnitId);
            console.log("Device ID:", sensor.deviceId);
            console.log("Name:", sensor.name);
        } catch {
            console.log("ERROR: Sensor 2 not found");
        }
    }
}
