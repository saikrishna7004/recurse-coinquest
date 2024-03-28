// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
