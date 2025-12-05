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
}

contract StakeExact is Script {
    IStaking staking = IStaking(0x8291228ac301E8FCFc4773062453c7731E84BeDf);
    IEvvm evvm = IEvvm(0x97f35683957475Fd1548463923EC2111E19a9fCb);
    address goldenFisher = 0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF;
    address koilToken = 0x0000000000000000000000000000000000000001;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        console.log("=== Staking 6969 Stakes ===");

        // Calculate exact amount needed
        uint256 stakingPrice = staking.priceOfStaking();
        uint256 numberOfStakes = 6969;
        uint256 totalAmount = numberOfStakes * stakingPrice;

        console.log("Staking Price:", stakingPrice);
        console.log("Number of Stakes:", numberOfStakes);
        console.log("Total Amount Needed:", totalAmount);

        // Check balance before
        uint256 balanceBefore = evvm.getBalance(goldenFisher, koilToken);
        console.log("KOIL Balance Before:", balanceBefore);

        uint256 stakedBefore = staking.getUserAmountStaked(goldenFisher);
        console.log("Staked Amount Before:", stakedBefore);

        require(balanceBefore >= totalAmount, "Insufficient KOIL balance");
        console.log("\nYou have enough KOIL to stake!");

        // Step 1: Create signature for pay() function
        bytes32 payMessageHash = keccak256(abi.encodePacked(
            goldenFisher,              // from
            address(staking),          // to_address
            "",                        // to_identity (empty)
            koilToken,                 // token
            totalAmount,               // amount (35423427000000000000000000)
            uint256(0),                // priorityFee
            uint256(0),                // nonce
            false,                     // priority
            address(staking)           // executor
        ));

        bytes32 payEthSignedMessageHash = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            payMessageHash
        ));

        (uint8 v1, bytes32 r1, bytes32 s1) = vm.sign(deployerPrivateKey, payEthSignedMessageHash);
        bytes memory paySignature = abi.encodePacked(r1, s1, v1);

        console.log("\n=== Step 1: Calling pay() ===");
        console.log("Transferring", totalAmount, "KOIL to staking contract");

        // Call pay() to transfer tokens to staking contract
        evvm.pay(
            address(staking),    // to_address
            "",                  // to_identity (empty)
            koilToken,           // token
            totalAmount,         // amount
            0,                   // priorityFee
            0,                   // nonce
            false,               // priority
            address(staking),    // executor
            paySignature         // signature
        );

        console.log("pay() successful!");

        console.log("\n=== Step 2: Calling goldenStaking() ===");
        console.log("Staking amount:", numberOfStakes, "stakes");

        // Step 2: Call goldenStaking with the same signature
        // The frontend reuses the same signature for both calls
        staking.goldenStaking(
            true,              // isStaking
            numberOfStakes,    // amountOfStaking (6969 - without decimals)
            paySignature       // signature_EVVM (reuse same signature)
        );

        console.log("goldenStaking() successful!");

        // Check balance after
        uint256 balanceAfter = evvm.getBalance(goldenFisher, koilToken);
        console.log("\n=== After Staking ===");
        console.log("KOIL Balance After:", balanceAfter);

        uint256 stakedAfter = staking.getUserAmountStaked(goldenFisher);
        console.log("Staked Amount After:", stakedAfter);

        console.log("\n=== Summary ===");
        console.log("KOIL Spent:", balanceBefore - balanceAfter);
        console.log("New Stakes:", stakedAfter - stakedBefore);
        console.log("Success!");

        vm.stopBroadcast();
    }
}
