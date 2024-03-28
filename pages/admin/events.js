import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        venue: ''
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
                    venue: ''
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

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchEvents();
                // Show success message using Swal2
                Swal.fire({
                    icon: 'success',
                    title: 'Event deleted successfully',
                });
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
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
                    <input type="text" placeholder='Name' className="input me-2" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <input type="text" placeholder='Venue' className="input me-2" id="venue" name="venue" value={formData.venue} onChange={handleInputChange} required />
                    <button type="submit" className="button">Add Event</button>
                </div>
            </form>
            <div style={{ overflow: 'auto' }} className='my-3'>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Venue</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event.name}</td>
                                <td>{event.venue}</td>
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
