// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
