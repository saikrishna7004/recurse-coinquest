import connectMongo from '../../../utils/connectMongo';
import Treasure from '../../../models/Treasure';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function treasureHuntHandler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    console.log(session?.user?.username)
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

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
