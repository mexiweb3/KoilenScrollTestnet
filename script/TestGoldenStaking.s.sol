// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

interface IStaking {
    function goldenStaking(
        bool isStaking,
        uint256 amountOfStaking,
        bytes memory signature_EVVM
    ) external;

    function getUserAmountStaked(address) external view returns (uint256);
    function priceOfStaking() external pure returns (uint256);
}

interface IEvvm {
    function getBalance(address, address) external view returns (uint256);
    function recalculateReward() external;
}

contract TestGoldenStaking is Script {
    IStaking staking = IStaking(0x8291228ac301E8FCFc4773062453c7731E84BeDf);
    IEvvm evvm = IEvvm(0x97f35683957475Fd1548463923EC2111E19a9fCb);
    address goldenFisher = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;
    address koilToken = 0x0000000000000000000000000000000000000001;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        console.log("=== Before Staking ===");
        uint256 balanceBefore = evvm.getBalance(goldenFisher, koilToken);
        console.log("KOIL Balance:", balanceBefore);

        uint256 stakedBefore = staking.getUserAmountStaked(goldenFisher);
        console.log("Staked Amount:", stakedBefore);

        uint256 stakingPrice = staking.priceOfStaking();
        console.log("Staking Price:", stakingPrice);

        // Check if we have enough balance
        require(balanceBefore >= stakingPrice, "Insufficient KOIL balance to stake");
        console.log("You have enough KOIL to stake!");

        // Perform golden staking
        console.log("\n=== Attempting Golden Staking ===");

        // Create the message hash for EVVM pay signature
        bytes32 messageHash = keccak256(abi.encodePacked(
            goldenFisher,              // from
            address(staking),          // to
            "",                        // identity (empty)
            koilToken,                 // token
            stakingPrice,              // amount
            uint256(0),                // priorityFee
            uint256(0),                // nonce
            false,                     // priorityFlag
            address(staking)           // executor
        ));

        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            messageHash
        ));

        // Sign the message
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(deployerPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        staking.goldenStaking(
            true,              // isStaking
            stakingPrice,      // amountOfStaking
            signature          // signed message
        );

        console.log("\n=== After Staking ===");
        uint256 balanceAfter = evvm.getBalance(goldenFisher, koilToken);
        console.log("KOIL Balance:", balanceAfter);

        uint256 stakedAfter = staking.getUserAmountStaked(goldenFisher);
        console.log("Staked Amount:", stakedAfter);

        console.log("\n=== Success! ===");
        console.log("Tokens spent:", balanceBefore - balanceAfter);
        console.log("Tokens staked:", stakedAfter - stakedBefore);

        vm.stopBroadcast();
    }
}
