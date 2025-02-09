// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CounterToken is ERC20, Ownable {

    constructor(address initialOwner) ERC20("Counter Token", "Counter") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        _transferOwnership(newOwner);
    }
}
