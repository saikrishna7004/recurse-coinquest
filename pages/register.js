// pages/register.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        year: '',
        questId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'username' ? value.toUpperCase() : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User registered successfully.',
                });
                // Redirect or show success message
                router.push('/login?next=/');
            } else {
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `Registration failed: ${data.error}`,
                });
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    if (!session || !session.user.admin) {
        return <div className='container text-center'>
            Disabled for now.
        </div>;
    }

    return (
        <div className='container text-center'>
            <h1>Register</h1>
            <form className='my-3' onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className='input'
                        placeholder='Roll Number'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className='input'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className='input'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="questId"
                        name="questId"
                        className='input'
                        placeholder='Quest ID'
                        value={formData.questId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <select
                        id="year"
                        name="year"
                        className='input'
                        value={formData.year}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <button className='button my-3' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
