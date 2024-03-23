import { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number
    }
}, { timestamps: true });

const Transaction = models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
