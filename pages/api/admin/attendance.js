import connectMongo from '../../../utils/connectMongo';
import Attendance from '../../../models/Attendance';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../models/User';

export default async function attendanceHandler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    console.log(session?.user?.username)
    
    if (!session || !session.user || !session.user.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        const { username, eventId } = req.body;

        if (!username || !eventId) {
            return res.status(400).json({ error: 'Username and event ID are required' });
        }

        await connectMongo();

        try {
            const existingAttendance = await Attendance.findOne({ questId: username, eventId });
            if (existingAttendance) {
                return res.status(400).json({ error: 'User has already attended this event' });
            }

            const newAttendance = new Attendance({ questId: username, eventId });
            await newAttendance.save();

            res.status(201).json({ message: 'Attendance marked successfully' });
        } catch (error) {
            console.error('Error marking attendance:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
