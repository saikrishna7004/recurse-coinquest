// pages/api/solvedTreasures.js

import connectMongo from '../../utils/connectMongo';
import Hint from '../../models/Hint';

export default async function handler(req, res) {
    await connectMongo();

    try {
        const solvedTreasures = await Hint.find({ solvedBy: { $ne: null } }).populate('solvedBy', 'username name');
        return res.status(200).json(solvedTreasures);
    } catch (error) {
        console.error('Error fetching solved treasures:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
