const {Blockchain} = require('./blockchain');
const {Transaction} = require('./transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let bc = new Blockchain();

        /********TEST MINING BLOCKS ************/
// console.log("Mining block 1....");
// bc.addBlock(new Block("24/1/2020", { amount : 10}));

// console.log("Mining block 2....");
// bc.addBlock(new Block("24/1/2020", { amount : 1}));

// console.log(JSON.stringify(bc, null, 4));
       
        /********TEST CREATING TRANSACTIONS ************/
// bc.addTransaction(new Transaction('address1', 'address2', 100));
// bc.addTransaction(new Transaction('address2', 'address1', 50));

        /********TEST MINING AND RECEIVING REWARD ************/
// console.log("\n Starting the miner.....");
// bc.minePendingTransantions("sana-address");

// console.log("\n My balance is : ", bc.getBalanceOfAddress("sana-address"));

// console.log("\n Starting the miner again.....");
// bc.minePendingTransantions("sana-address");

// console.log("\n My balance is : ", bc.getBalanceOfAddress("sana-address"));

        /********TEST SIGNING TRANSACTIONS ************/
const myKey = ec.keyFromPrivate('fd47ca36a6c6824ec42c06388d967074385a27b381ea5f5f68eceee4e3082d48');
const myWalletAddress = myKey.getPublic('hex');

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
bc.addTransaction(tx1);

console.log("\n Starting the miner.....");
bc.minePendingTransantions(myWalletAddress);

console.log("\n My balance is : ", bc.getBalanceOfAddress(myWalletAddress));

bc.minePendingTransantions(myWalletAddress);
console.log("\n My balance is : ", bc.getBalanceOfAddress(myWalletAddress));
