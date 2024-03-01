// pages/api/attendance.js

import connectMongo from '../../../utils/connectMongo';
import Attendance from '../../../models/Attendance';

export default async function attendanceHandler(req, res) {
    if (req.method === 'POST') {
        const { questId, eventId } = req.body;

        if (!questId || !eventId) {
            return res.status(400).json({ error: 'Username and event ID are required' });
        }

        await connectMongo();

        try {
            const existingAttendance = await Attendance.findOne({ questId, eventId });
            if (existingAttendance) {
                return res.status(400).json({ error: 'User has already attended this event' });
            }

            const newAttendance = new Attendance({ questId, eventId });
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
