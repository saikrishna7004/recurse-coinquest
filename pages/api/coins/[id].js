import User from '../../../models/User';

export default async function coinsHandler(req, res) {
    const { id } = req.query;
    console.log(id)
    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ coins: user.coins });
    } catch (error) {
        console.error('Error fetching user coins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
