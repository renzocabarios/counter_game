// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "./Registry.sol";
import "./CounterToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CounterGame is Ownable {
    Registry public registry;

    mapping(uint256 => address) public roundWinner;
    mapping(address => uint256) public userPoints;
    uint public countLimit;
    uint256 public currentRound;
    int public currentCount;

    event IncrementCount(address user, int count, int round);
    event CreateRound(int countLimit, int round);

    constructor() Ownable(msg.sender) {
        countLimit = 7;

        currentRound++;

        emit CreateRound(int(countLimit), int(currentRound));
    }

    function setRegistry(address _registry) public onlyOwner {
        registry = Registry(_registry);
    }

    function increment(int value) public {
        if (value > int(countLimit)) {
            return;
        }

        emit IncrementCount(msg.sender, value, int(currentRound));

        int temp = currentCount + value;

        if (temp < int(countLimit)) {
            currentCount = (currentCount) - temp;
            return;
        }

        if (temp > int(countLimit)) {
            return;
        }

        currentCount = 0;
        roundWinner[currentRound] = msg.sender;
        currentRound++;
    }
}
