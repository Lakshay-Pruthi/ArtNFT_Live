// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Data{
    struct NFT{
        string title;
        string _url;
    }    

    mapping(address=>NFT[]) public database;


    function uploadNFT(address _user,string memory _title, string memory _url) public {
        NFT memory nft = NFT(_title,_url);
        database[_user].push(nft);
    }

    function getDatabaseLength(address _user) public view returns(uint){
        return database[_user].length;
    }


}