import User from '../../../../models/User';
import connectMongo from '../../../../utils/connectMongo';

export default async function coinsHandler(req, res) {
    const { id } = req.query;

    await connectMongo();

    if (!id) return res.status(404).json({ error: 'Empty Roll Number' });

    try {
        const user = await User.findOne({ username: id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ coins: user.coins });
    } catch (error) {
        console.error('Error fetching user coins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
