import { getSession } from 'next-auth/react';
import User from '../../../models/User';

const updateCoinsHandler = async (req, res) => {
    // const session = await getSession({ req });

    // if (!session || !session.user || !session.user.isAdmin) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }

    if (req.method === 'POST') {
        const { questId, coins } = req.body;

        try {
            const user = await User.findOne({ questId });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.coins = coins;
            await user.save();

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
