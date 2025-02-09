// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "./Registry.sol";
import "./CounterToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CounterGame is Ownable{
 
    Registry public registry;

    mapping(uint256 => address) public roundWinner;
    mapping( address=> uint256) public userPoints;
    uint256 public currentRound;
    uint256 public currentCount;


   constructor(address initialOwner) Ownable(msg.sender) {}

    function setRegistry(address _registry) public onlyOwner {
        registry = new Registry(_registry);
    }

    function increment() public {
        currentCount++;

        if(currentCount >= 10) {
            currentCount = 0;
            roundWinner[currentRound] = msg.sender;
            currentRound++;
            userPoints[msg.sender]++;
            return;
        }

    }
    
}
