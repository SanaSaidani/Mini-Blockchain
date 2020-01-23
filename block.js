const SHA256 = require('crypto-js');


class Block {

    constructor(timeStamp, data, previousHash ='') 
    {
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash()
    {
        return SHA256(this.timeStamp + this.nonce + this.previousHash + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty)
    {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
        {
            this.nonce++;
            this.hash = this.calculateHash()
        }

        console.log("Block mined: " + this.hash);
    }
}