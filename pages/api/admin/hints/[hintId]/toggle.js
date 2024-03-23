import connectMongo from '../../../../../utils/connectMongo';
import Hint from '../../../../../models/Hint';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    console.log(session?.user?.username)
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { hintId } = req.query;

    try {
        await connectMongo();

        const hint = await Hint.findOne({hintId});

        if (!hint) {
            return res.status(404).json({ error: 'Hint not found' });
        }

        hint.enabled = !hint.enabled;
        await hint.save();

        return res.status(200).json(hint);
    } catch (error) {
        console.error('Error toggling hint status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
