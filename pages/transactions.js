import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const UserTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        fetchUserTransactions(session?.user?.username);
    }, [session]);

    const fetchUserTransactions = async (username) => {
        try {
            const response = await fetch(`/api/userTransactions?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                console.error('Failed to fetch user transactions');
            }
        } catch (error) {
            console.error('Error fetching user transactions:', error);
        }
    };

    const renderTransactionType = (transaction) => {
        if (transaction.sender === session?.user?.username && transaction.receiver === session?.user?.username) {
            return <span>Self</span>;
        } else if (transaction.sender === session?.user?.username) {
            return <span style={{ color: 'red' }}>Debited</span>;
        } else if (transaction.receiver === session?.user?.username) {
            return <span style={{ color: 'green' }}>Credited</span>;
        }
    };

    return (
        <div className='container my-4'>
            <h2 className='my-4'>User Transactions for {session?.user?.username}</h2>
            <div style={{overflow: 'auto'}}>
                <table className='table table-dark table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Type</th>
                            <th>Coins</th>
                            <th>Balance</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.sender}</td>
                                <td>{transaction.receiver}</td>
                                <td>{renderTransactionType(transaction)}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.balance}</td>
                                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTransactions;
