import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { data: session } = useSession();

    useEffect(() => {
        fetchLeaderboard(page);
    }, [page]);

    const fetchLeaderboard = async (pageNumber) => {
        try {
            const response = await fetch(`/api/leaderboard?page=${pageNumber}`);
            if (response.ok) {
                const { users, totalPages } = await response.json();
                setLeaderboard(users);
                setTotalPages(totalPages);
            } else {
                console.error('Failed to fetch leaderboard');
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    // if (!session || !session.user.admin) {
    //     return <div className='container text-center'>
    //         Unauthorized
    //     </div>;
    // }

    const paginationRange = Array.from(
        { length: Math.min(totalPages, 5) },
        (_, index) => page - 2 + index
    ).filter(pageNumber => pageNumber > 0 && pageNumber <= totalPages);

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
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Username</th>
                            <th scope="col">Coins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{((page - 1) * 10) + (index + 1)}</th>
                                    {/* <td>{user.name}</td> */}
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
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(1)}>First</button>
                    </li>
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page - 1)}><span aria-hidden="true">&laquo;</span></button>
                    </li>
                    {paginationRange.map(pageNumber => (
                        <li key={pageNumber} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                        </li>
                    ))}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)}><span aria-hidden="true">&raquo;</span></button>
                    </li>
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(totalPages)}>Last</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Leaderboard;
