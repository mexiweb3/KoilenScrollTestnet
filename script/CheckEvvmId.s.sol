// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

interface IEvvm {
    function getEvvmID() external view returns (uint256);
}

contract CheckEvvmId is Script {
    function run() public view {
        address evvmAddr = 0x97f35683957475Fd1548463923EC2111E19a9fCb;
        uint256 id = IEvvm(evvmAddr).getEvvmID();
        console.log("EVVM ID:", id);
    }
}
