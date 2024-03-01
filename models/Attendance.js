// models/Attendance.js

import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

export default Attendance;
