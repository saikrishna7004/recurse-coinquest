import connectMongo from '../../../utils/connectMongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../../models/User';

export default async function hintDeleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    console.log(session?.user?.username)

    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    await connectMongo();

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
