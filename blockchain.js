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

    addTransaction(transaction)
    {
        if(!transaction.fromAddress || !transaction.toAddress)
            throw new Error('Tansaction must iclude from and to address');
        
        if(!transaction.isValide)
            throw new Error('Cannot add invalide transaction to chain');

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

            if(!currentBlock.hasValideTransactions())
                return false;
            if(currentBlock.hash !== currentBlock.calculateHash())
                return false;
            
            if(currentBlock.previousHash !== previousBlock.hash)
                return false;
            
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain; 
