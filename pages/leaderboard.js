import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/api/leaderboard');
            if (response.ok) {
                const data = await response.json();
                setLeaderboard(data);
            } else {
                console.error('Failed to fetch leaderboard');
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Leaderboard - CoinQuest</title>
            </Head>
            <h2 className="my-4">Leaderboard</h2>
            <div style={{overflow: 'auto'}}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Coins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.coins}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className='text-center'>
                                <td colSpan="4" className='text-center'>No Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
