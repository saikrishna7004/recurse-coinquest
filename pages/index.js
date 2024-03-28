import { useState } from 'react';
import QRCode from 'qrcode.react';
import Head from 'next/head';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [coins, setCoins] = useState(null);
    const [qrValue, setQRValue] = useState('');

    const handleSubmit = async () => {
        if (rollNumber.trim() !== '') {
            try {
                const response = await fetch(`/api/coins/roll/${rollNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    setCoins(data.coins);
                    generateQRCode();
                } else {
                    throw new Error('Failed to fetch user coins');
                }
            } catch (error) {
                console.error('Error fetching user coins:', error);
                if (error.message !== 'Failed to fetch user coins') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch user coins',
                    });
                } else {
                    setCoins(0);
                    generateQRCode();
                }
            }
        }
    };    

    const generateQRCode = () => {
        setQRValue(rollNumber);
    };

    return (
        <div className="container text-center">
            <Head>
                <title>Home - CoinQuest</title>
            </Head>
            <h3 className="my-4">Enter Roll Number</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="input"
                    placeholder="Enter Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                />
            </div>
            <button className="button" onClick={handleSubmit}>Submit</button>
            {coins !== null && ( // Render coins only if it's not null
                <div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <span className="d-flex align-items-center justify-content-end">Coins :</span>
                        </div>
                        <div className="col-6">
                            <span className="d-flex align-items-center justify-content-start">
                                <img src="/gold.svg" alt="Coins" height={25} />
                                <span className="ms-1">{coins}</span>
                            </span>
                        </div>
                    </div>
                    <div className="row my-4 justify-content-center">
                        <div className="col-md-4">
                            <QRCode style={{ border: '3px solid white' }} value={qrValue} renderAs="svg" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
