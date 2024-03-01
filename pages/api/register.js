import connectMongo from '../../utils/connectMongo';
import User from '../../models/User';

export default async function registerHandler(req, res) {
    if (req.method === 'POST') {
        try {

            const { username, name, password, year } = req.body;
            await connectMongo();

            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const newUser = new User({
                username: username,
                name,
                password,
                year,
                isAdmin: false,
                coins: 100,
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
