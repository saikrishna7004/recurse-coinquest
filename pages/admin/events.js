import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        coins: '',
        description: '',
        eventId: ''
    });
    const { data: session } = useSession();

    useEffect(() => {
        fetchEvents();
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

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchEvents();
                setFormData({
                    name: '',
                    duration: '',
                    coins: '',
                    description: '',
                    eventId: ''
                });
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Unauthorized
        </div>;
    }

    return (
        <div className="container">
            <Head>
                <title>Events Edit - CoinQuest</title>
            </Head>
            <h1 className="my-4">Admin Events</h1>
            <form className='my-3' onSubmit={handleAddEvent}>
                <div className="mb-3">
                    <input type="text" placeholder='ID' className="input me-2" id="eventId" name="eventId" value={formData.eventId} onChange={handleInputChange} required />
                    <input type="text" placeholder='Name' className="input me-2" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <input type="text" placeholder='Duration' className="input me-2" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required />
                    <input type="text" placeholder='Coins' className="input me-2" id="coins" name="coins" value={formData.coins} onChange={handleInputChange} required />
                    <br /><textarea  placeholder='Description' className="input" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                    <br /><button type="submit" className="button">Add Event</button>
                </div>
            </form>
            <div style={{overflow: 'auto'}} className='my-3'>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Coins</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.eventId}</td>
                            <td>{event.name}</td>
                            <td>{event.duration}</td>
                            <td>{event.coins}</td>
                            <td>{event.description}</td>
                            <td>
                                <button className='button' onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AdminEventsPage;
