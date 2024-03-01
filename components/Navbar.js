import Link from 'next/link';
import NavLink from './NavLink';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    useEffect(() => {
        require("bootstrap/js/dist/collapse");
    }, []);

    const [coins, setCoins] = useState(0);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const navRef = useRef(null);

    const router = useRouter();
    const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (status !== 'loading') fetchCoins();
    // }, [status]);

    // const fetchCoins = async () => {
    //     try {
    //         const response = await fetch(`/api/coins/${session?.user?._id}`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setCoins(data.coins);
    //         } else {
    //             console.error('Failed to fetch user coins');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user coins:', error);
    //     }
    // };

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    useEffect(() => {
        if (navRef.current) {
            navRef.current.classList.toggle('show', !isNavCollapsed);
        }
    }, [isNavCollapsed]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link href="/" className="navbar-brand"><img src="/recurse logo white.png" alt="Recurse Logo" height={50} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} ref={navRef}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink href="/" className="nav-link">Home</NavLink>
                            </li>
                            {/* {session && <>
                                <li className="nav-item">
                                    <NavLink href="/hunt" className="nav-link">Hunt</NavLink>
                                </li></>} */}
                            {session && session.user.admin && <>
                                <li className="nav-item">
                                    <NavLink href="/admin/update-coins" className="nav-link">Update Coins</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href="/admin/attendance" className="nav-link">Attendance</NavLink>
                                </li>
                            </>}
                            {/* <li className="nav-item">
                                <NavLink href="/events" className="nav-link">Side Quest</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="/leaderboard" className="nav-link">Leaderboard</NavLink>
                            </li> */}
                        </ul>
                    </div>
                    <div className='me-4 my-2'>
                        {session?.user.name} {session?.user.admin ? 'Admin' : ''}
                    </div>
                    {status != "loading" && !session && <div className="nav-item me-4">
                        <NavLink className="nav-link" href={(router.asPath.indexOf('/login') > -1) ? router.asPath : ("/login?next=" + router.asPath)}>Login</NavLink>
                    </div>}
                    {session && <div className="nav-item me-4">
                        <NavLink className="nav-link" href="/api/auth/signout" onClick={(e) => {
                            e.preventDefault()
                            signOut({ redirect: false })
                        }}>Logout</NavLink>
                    </div>}
                </div>
            </nav>
            {/* <span className="coin-count">
                <img src="/gold.svg" alt="Coins" height={25} style={{ marginRight: '10px' }} />
                <p>{coins}</p>
            </span> */}
        </>
    );
};

export default Navbar;
