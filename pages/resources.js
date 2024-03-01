import Head from 'next/head';
import React, { useState } from 'react';

const Resources = () => {
    // Sample data
    const resources = [
        { id: 1, title: 'HTML', image: 'https://logos-download.com/wp-content/uploads/2017/07/HTML5_badge.png', price: '10', offline: false },
        { id: 2, title: 'CSS', image: 'https://logospng.org/download/css-3/logo-css-3-1536.png', price: '15', offline: false },
        { id: 3, title: 'JavaScript', image: 'https://logosdownload.com/logo/javascript-logo-big.png', price: '20', offline: false },
        { id: 4, title: 'HTML', image: 'https://logos-download.com/wp-content/uploads/2017/07/HTML5_badge.png', price: '10', offline: false },
        { id: 5, title: 'CSS', image: 'https://logospng.org/download/css-3/logo-css-3-1536.png', price: '15', offline: false },
        { id: 6, title: 'JavaScript', image: 'https://logosdownload.com/logo/javascript-logo-big.png', price: '20', offline: false },
        { id: 7, title: 'HTML', image: 'https://logos-download.com/wp-content/uploads/2017/07/HTML5_badge.png', price: '10', offline: false },
        { id: 8, title: 'CSS', image: 'https://logospng.org/download/css-3/logo-css-3-1536.png', price: '15', offline: false },
        { id: 9, title: 'JavaScript', image: 'https://logosdownload.com/logo/javascript-logo-big.png', price: '20', offline: false },
        { id: 10, title: 'Other', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png', price: '25', offline: true }
    ];

    // State for R coins
    const [rCoins, setRCoins] = useState(100); // Assuming 100 R coins initially

    const [tab, setTab] = useState('online');
    const [cart, setCart] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    const onlineResources = resources.filter(resource => !resource.offline);
    const offlineResources = resources.filter(resource => resource.offline);

    const addToCart = (id, price) => {
        const selectedItem = resources.find(item => item.id === id);
        if (!cart.find(item => item.id === id) && rCoins >= price) {
            setCart([...cart, selectedItem]);
            setRCoins(prevCoins => prevCoins - price); // Deduct price from R coins
        }
    };

    const removeFromCart = (id, price) => {
        setCart(cart.filter(item => item.id !== id));
        setRCoins(prevCoins => prevCoins + price); // Add price back to R coins
    };

    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };

    const toggleCart = () => {
        setCartVisible(!cartVisible);
    };

    return (
        <div className="container">
            <Head>
                <title>Resources - CoinQuest</title>
            </Head>
            <h1 className="text-center">Resources</h1>
            <div className="tabs">
                <button className={(tab === 'online' ? 'active ' : '') + 'button mx-2'} onClick={() => setTab('online')}>Online</button>
                <button className={(tab === 'offline' ? 'active ' : '') + 'button mx-2'} onClick={() => setTab('offline')}>Offline</button>
                <button className="button mx-2" style={{float: 'inline-end'}} onClick={toggleCart}>Cart ({cart.length})</button>
                <div className="coins" style={{ alignItems: 'center', margin: '30px 10px', display: 'flex' }}>
                    <img src="/gold.svg" alt="Coins" height={25} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    <span>{rCoins} R Coins Left</span>
                </div>
            </div>
            <div className="resource-container">
                {tab === 'online' ? (
                    onlineResources.map((resource, index) => (
                        <div key={index} className="card text-white" style={{background: 'black', borderRadius: '0', border: '1px solid white'}}>
                            <div className="card-img" style={{height: '200px', marginBottom: '20px'}}>
                                <img src={resource.image} alt={resource.title} style={{height: '200px', objectFit: 'contain'}} />
                            </div>
                            <div className="text">
                                <h2>{resource.title}</h2>
                                <p>Price: {resource.price} R</p>
                                {isInCart(resource.id) ? (
                                    <div><button onClick={() => removeFromCart(resource.id, parseInt(resource.price))} className="button mx-1 my-3">Remove</button> &nbsp; Added ✔️</div>
                                ) : (
                                    <button onClick={() => addToCart(resource.id, parseInt(resource.price))} className="button mx-1 my-3" disabled={rCoins < parseInt(resource.price)}>Buy</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    offlineResources.map((resource, index) => (
                        <div key={index} className="card text-white" style={{background: 'black', borderRadius: '0', border: '1px solid white'}}>
                            <div className="card-img" style={{height: '200px', marginBottom: '20px'}}>
                                <img src={resource.image} alt={resource.title} style={{height: '200px', objectFit: 'contain'}} />
                            </div>
                            <div className="text">
                                <h2>{resource.title}</h2>
                                <p>Price: {resource.price} R</p>
                                <p>Managed Offline</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartVisible && (
                <div className="cart-backdrop" onClick={toggleCart}></div>
            )}
            {cartVisible && (
                <div className="cart-popup">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <h2 style={{ marginBottom: '0' }}>Cart</h2>
                        <button className="button" onClick={toggleCart}>X</button>
                    </div>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>{item.title}</p>
                                <p>Price: {item.price} R</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
