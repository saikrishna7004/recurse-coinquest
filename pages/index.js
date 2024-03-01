import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Head from 'next/head';

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [coins, setCoins] = useState(0);
    const [qrValue, setQRValue] = useState('');

    useEffect(() => {
        if (status !== 'loading') {
            fetchCoins();
            generateQRCode();
        }
    }, [status]);

    const fetchCoins = async () => {
        try {
            const response = await fetch(`/api/coins/${session?.user?._id}`);
            if (response.ok) {
                const data = await response.json();
                setCoins(data.coins);
            } else {
                console.error('Failed to fetch user coins');
            }
        } catch (error) {
            console.error('Error fetching user coins:', error);
        }
    };

    const generateQRCode = () => {
        if (session?.user?.username) {
            setQRValue(session.user.username);
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div className='container text-center'>
                <Head>
                    <title>Home - CoinQuest</title>
                </Head>
                <h1>Welcome to the Recurse Coin Quest!</h1>
                <div className='my-4 py-3'>
                    <Link href="/register" className="button my-3 me-3">Register</Link>
                    <Link href="/login" className="button my-3 me-3">Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container text-center">
            <Head>
                <title>Home - CoinQuest</title>
            </Head>
            <h3 className="my-4">Welcome back, {session.user.name}!</h3>
            <div className="row mt-3">
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-end">Roll No. :</span>
                </div>
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-start">{session.user.username}</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-end">Quest ID :</span>
                </div>
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-start">{session.user.questId}</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-end">Year :</span>
                </div>
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-start">{session.user.year}</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-end">Coins :</span>
                </div>
                <div className="col-md-6">
                    <span className="d-flex align-items-center justify-content-start">
                        <img src="/gold.svg" alt="Coins" height={25} />
                        <span className="ms-1">{coins}</span>
                    </span>
                </div>
            </div>
            <div className="row mt-4 justify-content-center">
                <div className="col-md-4">
                    <QRCode style={{border: '3px solid white'}} value={qrValue} renderAs="svg" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
