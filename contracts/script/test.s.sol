// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Registry} from "../src/Registry.sol";
import {CounterGame} from "../src/CounterGame.sol";
import {CounterToken} from "../src/CounterToken.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract MyScript is Script {
    function run() external {
       

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        uint64 nonce = vm.getNonce(deployerAddress);

        Registry registry = new Registry();
        console.log("Registry Address:", address(registry));
        vm.setNonce(deployerAddress, ++nonce); 


        CounterGame counterGame = new CounterGame();
        console.log("CounterGame Address:", address(counterGame));
        vm.setNonce(deployerAddress, ++nonce); 

        CounterToken counterToken = new CounterToken();
        console.log("CounterToken Address:", address(counterToken));
        vm.setNonce(deployerAddress, ++nonce); 

        registry.setContractAddress(bytes32(abi.encodePacked("Registry")), address(registry));
        console.log("Registry: Register Registry");
        vm.setNonce(deployerAddress, ++nonce); 

        registry.setContractAddress(bytes32(abi.encodePacked("CounterGame")), address(counterGame));
        console.log("Registry: Register CounterGame");
        vm.setNonce(deployerAddress, ++nonce); 

        registry.setContractAddress(bytes32(abi.encodePacked("CounterToken")), address(counterToken));
        console.log("Registry: Register CounterToken");
        vm.setNonce(deployerAddress, ++nonce); 

        counterToken.transferOwnership(address(counterGame));
        console.log("CounterToken: Transfer Ownserhip To CounterGame");
        vm.setNonce(deployerAddress, ++nonce); 

        counterGame.setRegistry(address(registry));
        console.log("CounterGame: Set Registry");
        vm.setNonce(deployerAddress, ++nonce); 

        vm.stopBroadcast();

       
    }
}
