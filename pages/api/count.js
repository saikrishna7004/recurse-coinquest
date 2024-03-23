import connectMongo from '../../utils/connectMongo';
import User from '../../models/User';

export default async function userCountsHandler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectMongo();

            const years = [1, 2, 3]; // Assuming 3 years for example
            const userCounts = [];

            for (const year of years) {
                const userCountsByYear = await User.aggregate([
                    {
                        $match: { year }
                    },
                    {
                        $group: {
                            _id: '$ideathonParticipant',
                            total: { $sum: 1 }
                        }
                    }
                ]);

                userCounts.push({ year, userCountsByYear });
            }

            return res.status(200).json({ userCounts });
        } catch (error) {
            console.error('Error fetching user counts:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
