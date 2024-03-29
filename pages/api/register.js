import connectMongo from '../../utils/connectMongo';
import User from '../../models/User';

export default async function registerHandler(req, res) {
    if (req.method === 'POST') {
        try {

            await connectMongo();
            const { username, name, password, year, section, mobile, ideathonParticipant } = req.body;

            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const newUser = new User({
                username,
                name,
                password,
                year,
                section,
                mobile,
                ideathonParticipant,
                questId: 100
            });

            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
