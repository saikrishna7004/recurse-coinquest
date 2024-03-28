// pages/api/events/index.js
import Event from '../../models/Events';
import connectMongo from '../../utils/connectMongo';

connectMongo();

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const events = await Event.find({});
                res.status(200).json(events);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'POST':
            try {
                const newEvent = new Event(req.body);
                await newEvent.save();
                res.status(201).json(newEvent);
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json(updatedEvent);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                console.log(id)
                await Event.findByIdAndDelete(id);
                res.status(200).json({ message: 'Event deleted successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.status(405).json({ error: 'Method Not Allowed' });
            break;
    }
}
