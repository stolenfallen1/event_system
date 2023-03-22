import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import axios from 'axios';

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    const [admins, setAdmin] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/readAdmin')
            .then(response => {
                setAdmin(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button className="btn-1" onClick={openModal}>
                <FiSettings className="ricon" />
                Settings
            </button>
            {showModal ? (
                <div className="admin-profile">
                    <div className="adminmodal-content">
                        <button className="close" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <img className='round-image' src='https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg' />
                                    <h3 className='h33'>ADMINISTRATOR</h3>
                                    {admins.map((admin, index) => (
                                        <ul key={admin.id}>
                                            <li>{admin.fullname}</li>
                                            <li>{admin.username}</li>
                                            <li>{admin.password}</li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
