import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

const UserCounts = () => {
    const [userCounts, setUserCounts] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        fetchUserCounts();
    }, []);

    const fetchUserCounts = async () => {
        try {
            const response = await fetch('/api/count');
            if (response.ok) {
                const data = await response.json();
                setUserCounts(data.userCounts);
            } else {
                console.error('Failed to fetch user counts');
            }
        } catch (error) {
            console.error('Error fetching user counts:', error);
        }
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Unauthorized
        </div>;
    }

    return (
        <div className="container">
            <Head>
                <title>User Counts</title>
            </Head>
            <h1>User Counts</h1>
            <table className='table table-dark table-striped table-hover my-4' style={{maxWidth: '400px'}}>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Ideathon</th>
                        <th>Not</th>
                    </tr>
                </thead>
                <tbody>
                    {userCounts.map((yearData, index) => (
                        <tr key={index}>
                            <td>{yearData.year}</td>
                            <td>
                                {yearData.userCountsByYear.find(count => count._id === true)?.total || 0}
                            </td>
                            <td>
                                {yearData.userCountsByYear.find(count => count._id === false)?.total || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCounts;
