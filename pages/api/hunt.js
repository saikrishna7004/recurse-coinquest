import connectMongo from '../../utils/connectMongo';
import Hint from '../../models/Hint';
import User from '../../models/User';

export default async function hintSubmissionHandler(req, res) {
    if (req.method === 'POST') {
        const { hintId, code, username } = req.body;
        await connectMongo();

        try {
            const existingHint = await Hint.findOne({ hintId });
            
            if (!existingHint) {
                return res.status(400).json({ error: 'Hint not found' });
            }

            if (!existingHint.enabled) {
                return res.status(400).json({ error: 'Hint not started' });
            }

            if (existingHint.solvedBy) {
                return res.status(400).json({ error: 'Hint already solved' });
            }

            if (existingHint.answer !== code) {
                return res.status(400).json({ error: 'Incorrect answer' });
            }

            existingHint.solvedBy = username;
            await existingHint.save();

            return res.status(200).json({ message: 'Hint solved successfully' });
        } catch (error) {
            console.error('Error submitting hint:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
