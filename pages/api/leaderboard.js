import User from '../../models/User';

export default async function leaderboardHandler(req, res) {
    try {
        const users = await User.find({}, 'name username coins').sort({ coins: -1, updatedAt: 1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
