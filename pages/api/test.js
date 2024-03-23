// pages/api/protected-endpoint.js
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session)
  if (session) {
    // Process the request and return data for authorized users
    res.status(200).json({ message: 'Welcome, authorized user!', session });
  } else {
    // Handle unauthorized access attempts
    res.status(401).json({ error: 'Unauthorized access' });
  }
}
