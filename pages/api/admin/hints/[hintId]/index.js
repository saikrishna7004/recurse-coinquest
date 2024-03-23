import connectMongo from '../../../../../utils/connectMongo';
import Hint from '../../../../../models/Hint';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function hintDeleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    console.log(session?.user?.username)
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'DELETE') {
        const { hintId } = req.query;
        await connectMongo();

        try {
            await Hint.findOneAndDelete({ hintId });
            res.status(200).json({ message: 'Hint deleted successfully' });
        } catch (error) {
            console.error('Error deleting hint:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
