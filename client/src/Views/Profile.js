import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavbarBtnComponent from '../components/NavbarBtnComponent';

const Profile = () => {
    let objCurrentUser = sessionStorage.getItem("user");
	objCurrentUser = objCurrentUser.split("\"");
	let currentUser = objCurrentUser[3];
    const [billets, setBillets] = useState([]);
    let countBillet;

    useEffect(() => {
		fetchBillets(currentUser);
	}, [currentUser]);

	const fetchBillets = (user) => {
		fetch(`http://localhost:4242/api/billets/${user}`, {
			method: "GET",
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to fetch billets");
				}
				return response.json();
			})
			.then(data => {
				const billetsArray = Object.values(data.data);
				if (!billetsArray.isSuspended) {
                    setBillets(billetsArray);
				}
			})
			.catch(error => console.log(error));
        };

    countBillet = billets.length

    if (currentUser === "") {
        return (<Link to="/">You should go back to the Home page</Link>);
    } else {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-xl-12'>
                        <div className='card p-4'>
                            <h1 className='mt-1'>Welcome to your profile { currentUser } !</h1>
                            <hr />
                            <p className='mt-1 font-size-md font-weight-500'>{ (countBillet !== undefined && countBillet > 0) ? ((`You currently have ${billets.length} `) + (billets.length > 1 ? "billets" : "billet")) + " on your blog!" : "Why not givin' a  try at creating your first billet ?"}</p>
                            <ul className='mt-1'>
                                <NavbarBtnComponent title="My blog" link={"/" + currentUser} status={null} target={null} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;