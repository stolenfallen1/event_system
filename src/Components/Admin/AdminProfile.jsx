import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Styles/admin.css';

const Modal = () => {
    const [admins, setAdmins] = useState([]);
    const [adminUsername, setAdminUsername] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:4000/readAdmin')
            .then((response) => {
                setAdmins(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const storedAdminUsername = localStorage.getItem('adminUsername');
        if (storedAdminUsername) {
            setAdminUsername(storedAdminUsername);
        }
    }, []);

    const admin = admins.find((admin) => admin.username === adminUsername);


    return (
        <>
            <div className="admin-profile">
                <div className="adminmodal-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className='round-image' src='https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg' />
                                <h1>ADMINISTRATOR</h1>
                                {admin && (
                                    <form onSubmit>
                                        <label htmlFor="fullname">Fullname</label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={admin.fullname}
                                        />

                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={admin.username}
                                        />

                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={admin.password}
                                        />
                                    </form>
                                )}
                                <div className='admin-btn'>
                                    <button className='submit-btn' type='submit'>Update</button>
                                    <Link to='/Admin'>
                                        <button className='cancel-btn' type='Cancel'>Cancel</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
