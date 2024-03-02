// pages/api/attendance.js

import connectMongo from '../../utils/connectMongo';
import Attendance from '../../models/Attendance';

export default async function attendanceHandler(req, res) {
    if (req.method === 'GET') {
        await connectMongo();

        try {
            console.log(req.query.id, "id")
            const attendedEvents = await Attendance.find({ questId: req.query.id });

            const attendedEventIds = attendedEvents.map(attendance => attendance.eventId);

            res.status(200).json(attendedEventIds);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Handle invalid request method
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
