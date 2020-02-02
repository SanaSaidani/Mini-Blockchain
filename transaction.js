const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {

    constructor(fromAddress, toAddress, amount)
    {
        this.amount = amount;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey)
    {
        if(signingKey.getPublic('hex') !== this.fromAddress)
            return new Error('You cannot sign transactions for other wallets');

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValide()
    {
        if(this.fromAddress === null) 
            return true;
        
        if(!this.signature || this.signature.length === 0)
            return new Error('No signature in this transaction');
        
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }

}

module.exports.Transaction = Transaction;