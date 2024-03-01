import { useState } from 'react';
import { useSession } from 'next-auth/react';

const UpdateCoinsPage = () => {
    const [username, setUsername] = useState('');
    const [coins, setCoins] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { data: session } = useSession();

    const handleUpdateCoins = async () => {
        try {
            const response = await fetch('/api/admin/update-coins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, coins }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error updating user coins:', error);
            setError('Internal server error');
        }
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Unauthorized
        </div>;
    }

    return (
        <div className='container text-center'>
            <h1>Update User Coins</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='mt-3'>
                <input className='input' type="text" name='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value.toUpperCase())} />
            </div>
            <div>
                <input className='input' type="number" name='coins' placeholder="Coins" value={coins} onChange={(e) => setCoins(e.target.value)} />
            </div>
            <button className='button my-3' onClick={handleUpdateCoins}>Update Coins</button>
        </div>
    );
};

export default UpdateCoinsPage;
