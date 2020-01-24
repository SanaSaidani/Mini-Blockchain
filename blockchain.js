const {Block} = require('./block');


class Blockchain {

    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock()
    {
        return new Block("21/1/2020", "Genesis Block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValide()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash())
                return false;
            
            if(currentBlock.previousHash !== previousBlock.hash)
                return false;
            
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain; 

// let bc = new Blockchain();

// console.log("Mining block 1....");
// bc.addBlock(new Block("24/1/2020", { amount : 10}));

// console.log("Mining block 2....");
// bc.addBlock(new Block("24/1/2020", { amount : 1}));

// console.log(JSON.stringify(bc, null, 4));