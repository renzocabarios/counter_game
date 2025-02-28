// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    mapping(bytes32 => address) public registry;
    event RegisterContract(bytes32 name, address contractAddress);

    constructor() Ownable(msg.sender) {}

    function setContractAddress(
        bytes32 _name,
        address _address
    ) public onlyOwner {
        registry[_name] = _address;
        emit RegisterContract(_name, _address);
    }

    function getContractAddress(bytes32 _name) public view returns (address) {
        require(registry[_name] != address(0), "Registry :: Address not found");
        return registry[_name];
    }
}
