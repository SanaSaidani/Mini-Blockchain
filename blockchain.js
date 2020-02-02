const {Block} = require('./block');
const {Transaction} = require('./transaction');


class Blockchain {

    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock()
    {
        return new Block("21/1/2020", "Genesis Block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock)
    // {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTransantions(miningRewardAddress)
    {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address)
    {
        let balance = 0;

        for(const block of this.chain)
        {
            for(const trans of block.transactions)
            {
                if(trans.fromAddress === address)
                {
                    console.log("i'm here");
                    balance = balance - trans.amount;
                }
                
                if(trans.toAddress === address)
                {
                    balance = balance + trans.amount;
                }
            }      
        }

        return balance;
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

let bc = new Blockchain();

// console.log("Mining block 1....");
// bc.addBlock(new Block("24/1/2020", { amount : 10}));

// console.log("Mining block 2....");
// bc.addBlock(new Block("24/1/2020", { amount : 1}));

// console.log(JSON.stringify(bc, null, 4));

bc.createTransaction(new Transaction('address1', 'address2', 100));
bc.createTransaction(new Transaction('address2', 'address1', 50));

console.log("\n Starting the miner.....");
bc.minePendingTransantions("sana-address");

console.log("\n My balance is : ", bc.getBalanceOfAddress("sana-address"));

console.log("\n Starting the miner again.....");
bc.minePendingTransantions("sana-address");

console.log("\n My balance is : ", bc.getBalanceOfAddress("sana-address"));
