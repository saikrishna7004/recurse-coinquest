import connectMongo from '../../../utils/connectMongo';
import Treasure from '../../../models/Treasure';

export default async function treasureHuntHandler(req, res) {
    if (req.method === 'POST') {
        const { riddles } = req.body;
        await connectMongo();

        try {
            const newTreasureHuntSet = new Treasure({
                riddles,
                enabled: false,
            });

            await newTreasureHuntSet.save();

            res.status(201).json({ message: 'Treasure hunt set uploaded and enabled successfully' });
        } catch (error) {
            console.error('Error uploading treasure hunt set:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
