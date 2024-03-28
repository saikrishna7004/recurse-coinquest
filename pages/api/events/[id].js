// pages/api/events/index.js
import Event from '../../../models/Events';
import connectMongo from '../../../utils/connectMongo';

connectMongo();

export default async function handler(req, res) {
    switch (req.method) {
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
