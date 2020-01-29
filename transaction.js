
class Transaction {

    constructor(fromAddress, toAdress, amount)
    {
        this.amount = amount;
        this.fromAddress = fromAddress;
        this.toAdress = toAdress;
    }
}

module.exports.Transaction = Transaction;