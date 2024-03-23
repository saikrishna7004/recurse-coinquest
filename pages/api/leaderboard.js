import User from '../../models/User';
import connectMongo from '../../utils/connectMongo';

export default async function leaderboardHandler(req, res) {
    await connectMongo();
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const [users, totalCount] = await Promise.all([
            User.find({}, 'name username coins')
                .sort({ coins: -1, updatedAt: 1 })
                .skip(skip)
                .limit(pageSize),
            User.countDocuments()
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({ users, totalPages });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
