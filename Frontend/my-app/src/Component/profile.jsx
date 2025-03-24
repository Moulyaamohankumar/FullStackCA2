import React, { useEffect, useState } from 'react'
import { fetchUserProfile } from './fetchUserProfile';

function Profile() {
    const [Details, setDetails] = useState({});
    const [Address, setAddress] = useState([]);

    useEffect(() => {
        fetchUserProfile("xyz@gmail.com").then((data) => {
            if (data) {
                setDetails(data.user);
                setAddress(data.address);
            }
        });
    }, []);

    return (
        <div>
            <div>
                <h1>Profile</h1>
                {Details.avatarurl && <img src={Details.avatarurl} alt="Avatar" />}
            </div>
            <div>
                <h2>{Details.name}</h2>
                <p>{Details.email}</p>
                <p>{Details.phone}</p>
            </div>
            <div>
                <p>{Details.address}</p>
            </div>
        </div>
    );
}

export default Profile;