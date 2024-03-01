import { useState } from 'react';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const TreasureHuntPage = () => {
    const [code, setCode] = useState('');
    const [hintId, setHintId] = useState('');
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/hunt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, hintId, username: session.user._id }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                Swal.fire('Congratulations!', 'You have successfully solved the riddle!', 'success');
            } else {
                Swal.fire('Incorrect!', data.error, 'error');
            }
        } catch (error) {
            console.error('Error validating treasure hunt code:', error);
            Swal.fire('Error', 'Internal server error', 'error');
        }
    };

    if (!session) {
        return <div className='container text-center'>Please log in to access this page</div>;
    }

    return (
        <div className='container text-center'>
            <Head>
                <title>Treasure Hunt - CoinQuest</title>
            </Head>
            <h2>Treasure Hunt</h2>
            <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                    <input
                        type="text"
                        id="hintId"
                        value={hintId}
                        onChange={(e) => setHintId(e.target.value)}
                        className="input"
                        placeholder='Enter the Hint ID'
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="input"
                        placeholder='Enter the code'
                        required
                    />
                </div>
                <button type="submit" className="button my-4">Submit</button>
            </form>
            {success && <Confetti />}
        </div>
    );
};

export default TreasureHuntPage;
