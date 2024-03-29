import User from '../../../models/User';
import Transaction from '../../../models/Transaction';
import connectMongo from '../../../utils/connectMongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const updateCoinsHandler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }    

    await connectMongo();

    if (req.method === 'POST') {
        const { username, coins } = req.body;

        try {
            let user = await User.findOne({ username });

            if (!user) {
                user = new User({
                    username,
                    coins: Number(coins)
                });
            } else {
                user.coins += Number(coins);
            }

            await user.save();

            const transaction = new Transaction({
                sender: session.user.username,
                receiver: username,
                amount: Number(coins),
                balance: user.coins
            });
            await transaction.save();

            return res.status(200).json({ message: 'User coins updated successfully' });
        } catch (error) {
            console.error('Error updating user coins:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default updateCoinsHandler;
