import connectMongo from '../../../../utils/connectMongo';
import Hint from '../../../../models/Hint';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function hintListHandler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    console.log(session?.user?.username)
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        await connectMongo();

        try {
            const hints = await Hint.find({}).populate({
                path: 'solvedBy',
                select: 'username name'
            });
            res.status(200).json(hints);
        } catch (error) {
            console.error('Error fetching hints:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        const { hintId, answer } = req.body;
        await connectMongo();

        try {
            const newHint = new Hint({ hintId, answer, enabled: false });
            await newHint.save();
            res.status(201).json(newHint);
        } catch (error) {
            console.error('Error adding hint:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
