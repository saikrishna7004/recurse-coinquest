import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Events = () => {
    const { data: session, status } = useSession();
    const [events, setEvents] = useState([]);
    // const [attendedEvents, setAttendedEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
        // if (status === 'authenticated') {
        //     fetchAttendance();
        // }
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // const fetchAttendance = async () => {
    //     try {
    //         const response = await fetch(`/api/attendance?id=${session.user.username}`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setAttendedEvents(data);
    //             console.log(data)
    //         } else {
    //             console.error('Failed to fetch attendance');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching attendance:', error);
    //     }
    // };

    return (
        <div className="container">
            <Head>
                <title>Side Quests - CoinQuest</title>
            </Head>
            <h1 className="my-4">Side Quests</h1>
            {session && session.user && session.user.admin && session?.user?.username === '21BD1A050K' && (
                <div className='mb-4 pb-2 ps-1'>
                    <Link href='/admin/events' className="button mb-4">Add Event</Link>
                </div>
            )}
            <div className="my-4 row">
                {events.map(event => (
                    <div key={event._id} className="col-md-4 mb-4">
                        <div className="card text-white" style={{ background: 'black', borderRadius: '0', border: '1px solid white' }}>
                            <div className="card-body">
                                <h4 className="card-title pb-3">{event.name}</h4>
                                <p className="card-text">Venue: {event.venue}</p>
                                {/* {status === 'authenticated' && attendedEvents.find(item => item == event.eventId) && (
                                    <p className="card-text" style={{ color: 'green' }}>Attended</p>
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
