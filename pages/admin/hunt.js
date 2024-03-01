import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AdminHintList = () => {
    const [hints, setHints] = useState([]);
    const [newHint, setNewHint] = useState({ hintId: '', answer: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        fetchHints();
    }, []);

    const fetchHints = async () => {
        try {
            const response = await fetch('/api/admin/hints');
            if (response.ok) {
                const data = await response.json();
                setHints(data);
            } else {
                console.error('Failed to fetch hints');
                setErrorMessage('Failed to fetch hints');
            }
        } catch (error) {
            console.error('Error fetching hints:', error);
            setErrorMessage('Internal server error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHint({ ...newHint, [name]: value });
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Unauthorized
        </div>;
    }

    const handleAddHint = async () => {
        try {
            const response = await fetch('/api/admin/hints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHint),
            });
            if (response.ok) {
                const data = await response.json();
                setHints([...hints, data]);
                Swal.fire('Success', 'Hint added successfully', 'success');
            } else {
                const data = await response.json();
                console.error('Failed to add hint:', data.error);
                Swal.fire('Error', 'Failed to add hint', 'error');
            }
        } catch (error) {
            console.error('Error adding hint:', error);
            Swal.fire('Error', 'Internal server error', 'error');
        }
    };

    const handleDeleteHint = async (hintId) => {
        try {
            const response = await fetch(`/api/admin/hints/${hintId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setHints(hints.filter(hint => hint.hintId !== hintId));
                Swal.fire('Success', 'Hint deleted successfully', 'success');
            } else {
                const data = await response.json();
                console.error('Failed to delete hint:', data.error);
                Swal.fire('Error', 'Failed to delete hint', 'error');
            }
        } catch (error) {
            console.error('Error deleting hint:', error);
            Swal.fire('Error', 'Internal server error', 'error');
        }
    };

    return (
        <div className="container">
            <h2 className='my-4'>Add New Hint</h2>
            <div className="mb-3">
                <input
                    type="text"
                    id="hintId"
                    name="hintId"
                    value={newHint.hintId}
                    onChange={handleInputChange}
                    className="input me-3"
                    placeholder='Hint ID'
                    required
                />
                <input
                    type="text"
                    id="answer"
                    name="answer"
                    value={newHint.answer}
                    onChange={handleInputChange}
                    className="input me-3"
                    placeholder='Answer'
                    required
                />
        <button className="button" onClick={handleAddHint}>Add Hint</button>
            </div>
            <h2 className='my-4'>Hint List</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Hint ID</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hints.map((hint, index) => (
                        <tr key={index}>
                            <td>{hint.hintId}</td>
                            <td>{hint.answer}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteHint(hint.hintId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {!hints.length && <tr><td colSpan="3">No Hints</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHintList;
