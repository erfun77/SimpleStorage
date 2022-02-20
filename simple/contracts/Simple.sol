// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Simple{

    uint256 sotredData;

    function set(uint256 x)public{
        sotredData = x;
    }

    function get() public  view returns (uint256) {
        return sotredData;
    }
}

