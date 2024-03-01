import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const TreasureHunt = () => {
    const [solvedTreasures, setSolvedTreasures] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        fetchSolvedTreasures();
    }, []);

    const fetchSolvedTreasures = async () => {
        try {
            const response = await fetch('/api/solvedTreasures');
            if (response.ok) {
                const data = await response.json();
                setSolvedTreasures(data);
            } else {
                console.error('Failed to fetch solved treasures');
            }
        } catch (error) {
            console.error('Error fetching solved treasures:', error);
        }
    };

    return (
        <div className="container text-center">
            <Head>
                <title>Treasure Hunt - CoinQuest</title>
            </Head>
            <h3>Treasure Hunt Hints</h3>
            <div className="my-4">
                <p className="my-3">Hi, hunter! Welcome to the Treasure Hunt. </p>
                <p className="my-3">Check out for the hints posted in the below link frequently for finding the hints of treasure. </p>
                <p className="mt-3 mb-4">Find the QR and upload it in the space provided here.</p>
            </div>
            <div className="my-4 p-2">
                <Link className='button my-3 me-3' href='https://google.com' target="_blank">Check for Hints</Link>
                <Link className='button my-3 me-3' href='/code'>Enter the code</Link>
                {session && session.user && session.user.admin && <Link className='button my-3' href='/admin/hunt'>Edit Hints</Link>}
            </div>
            <div className="container my-4">
                <h4 className="my-4">Solved Treasures</h4>
                <div className="table-responsive my-4 ">
                    <table className="table table-dark" style={{maxWidth: '600px', margin: 'auto'}}>
                        <thead>
                            <tr>
                                <th>Hint ID</th>
                                <th>Username</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solvedTreasures.map((treasure, index) => (
                                <tr key={index}>
                                    <td className="text-center">{treasure.hintId}</td>
                                    <td className="text-center">{treasure.solvedBy.username}</td>
                                    <td className="text-center">{treasure.solvedBy.name}</td>
                                </tr>
                            ))}
                            {(!solvedTreasures || solvedTreasures.length==0) && <tr className="text-center"><td colSpan={3} className="text-center">No Treasure Found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TreasureHunt;
