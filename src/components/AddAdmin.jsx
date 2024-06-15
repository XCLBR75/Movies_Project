
import React,{useState} from 'react'

function AddAdmin() {
    // eslint-disable-next-line no-undef
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post('/api/admins', { username, password });
    //         if (response.data.success) {
    //             alert('Admin added successfully!');
    //         } else {
    //             alert('Failed to add admin. Admin already exists.');
    //         }
    //     } catch (error) {
    //         console.error('There was an error adding the admin!', error);
    //     }
    //     setUsername('');
    //     setPassword('');
    // };

    return (
        <div>
            <h2>Add Admin</h2>
            {/* <form onSubmit={handleSubmit}> */}
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Admin</button>
            {/* </form> */}
        </div>
    );
}

export default AddAdmin
