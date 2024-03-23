import connectMongo from '../../utils/connectMongo';
import Transaction from '../../models/Transaction';
import User from '../../models/User'

export default async function userTransactionsHandler(req, res) {
    const { username } = req.query;

    try {
        await connectMongo();
        const transactions = await Transaction.find({ $or: [{ sender: username }, { receiver: username }] });
        console.log(transactions)
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
