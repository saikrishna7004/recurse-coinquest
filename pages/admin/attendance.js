import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

const UpdateAttendance = () => {
    const [eventId, setEventId] = useState('');
    const [username, setUsername] = useState('');
    const [acknowledged, setAcknowledged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventId, username }),
            });
            if (response.ok) {
                setAcknowledged(true);
                setErrorMessage('');
            } else {
                const data = await response.json();
                setAcknowledged(false);
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
            setAcknowledged(false);
            setErrorMessage('Internal server error');
        }
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Unauthorized
        </div>;
    }

    return (
        <div className='container text-center'>
            <Head>
                <title>Update Attendance - CoinQuest</title>
            </Head>
            <h2>Update Event Attendance</h2>
            {acknowledged && <p style={{ color: 'green' }}>Attendance for Roll No. {username} has been updated successfully.</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <input
                        type='text'
                        id='eventId'
                        className='input'
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        placeholder='Event ID'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type='text'
                        id='username'
                        className='input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toUpperCase())}
                        placeholder='Roll No.'
                        required
                    />
                </div>
                <button type='submit' className='button'>Update Attendance</button>
            </form>
        </div>
    );
};

export default UpdateAttendance;
