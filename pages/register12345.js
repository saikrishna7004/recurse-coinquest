// pages/register.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const router = useRouter();

    const sections = [
        'CSE A',
        'CSE B',
        'CSE C',
        'CSE D',
        'CSE E',
        'CSE F',
        'CSE G',
        'CSM A',
        'CSM B',
        'CSM C',
        'IT A',
        'IT B',
        'CSD',
    ];

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        year: '',
        section: '',
        mobile: '',
        ideathonParticipant: false
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
        console.log(formData)
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response)
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

    return (
        <div className='container text-center'>
            <Head>
                <title>Register - CoinQuest</title>
            </Head>
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
                <div>
                    <select
                        id="section"
                        name="section"
                        className='input'
                        value={formData.section}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Section</option>
                        {sections.map((section, index) => (
                            <option key={index} value={section}>{section}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className='input'
                        placeholder='Mobile'
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <div>
                    <label htmlFor="ideathonParticipant">Choose one: &nbsp;</label><br />
                    <select
                        id="ideathonParticipant"
                        name="ideathonParticipant"
                        className='input'
                        value={formData.ideathonParticipant}
                        onChange={handleChange}
                        required
                    >
                        <option value={true}>Code Auction+Side Quest+Hunt</option>
                        <option value={false}>Side Quest+Treasure Hunt</option>
                    </select>
                </div> */}
                <button className='button my-3' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
