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
    function pay(
        address to_address,
        string memory to_identity,
        address token,
        uint256 amount,
        uint256 priorityFee,
        uint256 nonce,
        bool priority,
        address executor,
        bytes memory signature
    ) external returns (bytes32);
    function getNextCurrentSyncNonce(address) external view returns (uint256);
}

contract StakeOne is Script {
    IStaking staking = IStaking(0x8291228ac301E8FCFc4773062453c7731E84BeDf);
    IEvvm evvm = IEvvm(0x97f35683957475Fd1548463923EC2111E19a9fCb);
    address goldenFisher = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;
    address koilToken = 0x0000000000000000000000000000000000000001;

    function run() external {
        // Get the private key from --sender or derive from msg.sender
        // When using --account, the key is handled internally by forge
        uint256 privateKey = vm.envOr("PRIVATE_KEY", uint256(0));

        // Start broadcast - if PRIVATE_KEY not set, use --account method
        if (privateKey == 0) {
            vm.startBroadcast();
            privateKey = uint256(keccak256(abi.encodePacked(msg.sender))); // Won't work for signing, need actual key
        } else {
            vm.startBroadcast(privateKey);
        }

        console.log("=== Staking 1 Token ===\n");

        // Get current nonce
        uint256 currentNonce = evvm.getNextCurrentSyncNonce(goldenFisher);
        console.log("Current Sync Nonce:", currentNonce);

        // Calculate amount for 1 stake
        uint256 stakingPrice = staking.priceOfStaking();
        uint256 numberOfStakes = 1;
        uint256 totalAmount = numberOfStakes * stakingPrice;

        console.log("Staking Price:", stakingPrice);
        console.log("Number of Stakes:", numberOfStakes);
        console.log("Total Amount Needed:", totalAmount);

        // Check balance
        uint256 balanceBefore = evvm.getBalance(goldenFisher, koilToken);
        console.log("KOIL Balance Before:", balanceBefore);

        uint256 stakedBefore = staking.getUserAmountStaked(goldenFisher);
        console.log("Staked Amount Before:", stakedBefore);

        require(balanceBefore >= totalAmount, "Insufficient KOIL balance");
        console.log("\nYou have enough KOIL!\n");

        // Create signature for pay() - using current nonce
        bytes32 payMessageHash = keccak256(abi.encodePacked(
            goldenFisher,              // from
            address(staking),          // to_address
            "",                        // to_identity (empty)
            koilToken,                 // token
            totalAmount,               // amount (5083000000000000000000)
            uint256(0),                // priorityFee
            currentNonce,              // nonce (use current sync nonce)
            false,                     // priority
            address(staking)           // executor
        ));

        bytes32 payEthSignedMessageHash = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            payMessageHash
        ));

        // Sign using the broadcaster key (from --account flag)
        (uint8 v1, bytes32 r1, bytes32 s1) = vm.sign(payEthSignedMessageHash);
        bytes memory paySignature = abi.encodePacked(r1, s1, v1);

        console.log("=== Step 1: Calling pay() ===");
        console.log("Transferring", totalAmount, "KOIL to staking contract");
        console.log("Using nonce:", currentNonce);

        // Call pay() to transfer tokens
        evvm.pay(
            address(staking),    // to_address
            "",                  // to_identity
            koilToken,           // token
            totalAmount,         // amount
            0,                   // priorityFee
            currentNonce,        // nonce
            false,               // priority
            address(staking),    // executor
            paySignature         // signature
        );

        console.log("pay() successful!\n");

        console.log("=== Step 2: Calling goldenStaking() ===");
        console.log("Staking", numberOfStakes, "token");

        // Call goldenStaking with same signature
        staking.goldenStaking(
            true,              // isStaking
            numberOfStakes,    // amountOfStaking (1 - without decimals)
            paySignature       // signature_EVVM
        );

        console.log("goldenStaking() successful!\n");

        // Check results
        uint256 balanceAfter = evvm.getBalance(goldenFisher, koilToken);
        uint256 stakedAfter = staking.getUserAmountStaked(goldenFisher);

        console.log("=== After Staking ===");
        console.log("KOIL Balance After:", balanceAfter);
        console.log("Staked Amount After:", stakedAfter);

        console.log("\n=== Summary ===");
        console.log("KOIL Spent:", balanceBefore - balanceAfter);
        console.log("New Stakes Added:", stakedAfter - stakedBefore);
        console.log("New Sync Nonce:", evvm.getNextCurrentSyncNonce(goldenFisher));
        console.log("\nSuccess! You are now staking!");

        vm.stopBroadcast();
    }
}
