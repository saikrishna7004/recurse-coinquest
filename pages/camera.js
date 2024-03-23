import React, { useEffect, useRef, useState } from 'react';
import QrReader from 'modern-react-qr-reader';

const Home = (props) => {
    const [data, setData] = useState('No result');
    const audioRef = useRef(null);
    const [scannedNumbers, setScannedNumbers] = useState(new Set());
    const [facingMode, setFacingMode] = useState('environment');
    const [key, setKey] = useState(0);

    const playScannerSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        console.log(userAgent)
        if (userAgent.includes('mobi')) {
            console.log("env")
            setFacingMode('environment');
        } else {
            console.log("user")
            setFacingMode('user');
        }
        setKey(prevKey => prevKey + 1);
    }, []);

    return (
        <>
            <QrReader
                key={key}
                onScan={async (result) => {
                    if (!!result) {
                        console.log(result)
                        setData(result);
                        try{
                            const roll = await JSON.parse(result)
                            setScannedNumbers(new Set([...scannedNumbers, roll?.htno]))
                        }
                        catch(e){
                            setScannedNumbers(new Set([...scannedNumbers, result]))
                        }
                        playScannerSound();
                    }
                }}
                onError={()=>{}}
                style={{ maxWidth: '500px', margin: 'auto' }} 
                constraints={{ facingMode }}
            />
            <audio ref={audioRef} src={'/scanner-sound.mp3'} />
            <p className='container my-3'>Scanned: {data}</p>
            <p className='container my-3'>Scanned List:</p>
            <ul>
                {[...scannedNumbers].map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>
        </>
    );
};
export default Home;
