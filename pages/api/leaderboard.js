import User from '../../models/User';
import connectMongo from '../../utils/connectMongo';

export default async function leaderboardHandler(req, res) {
    await connectMongo();
    try {
        const users = await User.find({}, 'name username coins').sort({ coins: -1, updatedAt: 1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
