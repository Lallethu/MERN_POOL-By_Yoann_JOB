import React, { useState, useEffect } from 'react';
import BilletFormComponent from '../components/BilletFormComponent';
import PopupComponent from '../components/PopupComponent';
import BilletType from '../components/BilletTypeComponent';

const getAllBillets = (isSame, otherUser, suspendedBillet, billets, Billet, nbrOfBillet) => {
	return (<div className='container card row'>
		<h1>{isSame ? "Your blog and billet(s)" : `Blog of ${otherUser} and his/her billet(s)`}</h1>
		<small>
			{(isSame) ? suspendedBillet > 0 
			? (
				<div className='alert-error mt-1 font-size-md font-weight-600'>
					{`You have ${suspendedBillet}`}
					{suspendedBillet > 1
					? "suspended billets!" : "suspended billet!"}</div>)
					: (<div className='alert-success mt-1 font-size-md font-weight-600'>
						<p>You don't have any suspended billets, welldone!</p>
						<p>{nbrOfBillet > 1 ? `${nbrOfBillet} billets supended` : `${nbrOfBillet} billet suspended`}</p>
					</div>)
					: "Here you are pleased to choose a billet onwich you can comments!"}
		</small>
		<ul>
			{billets.map(billet => (
				<Billet key={billet.id} {...billet} />
			))}
		</ul>
		<a href={`/profile`} className='btn-gray mt-2 ml-1 mb-1'>Go back to your proflie</a>
	</div>);
}

const UserBlog = (props) => {
	let objCurrentUser = sessionStorage.getItem("user");
	objCurrentUser = objCurrentUser.split("\"");
	let currentUser = objCurrentUser[3];
	let otherUser = props.user;
	let suspendedBillet = 0;

	const [billets, setBillets] = useState([]);
	const [isSame] = useState((currentUser === otherUser));

	const [billetTitle, setBilletTitle] = useState("");
	const [billetTextBody, setBilletTextBody] = useState("");
	const [billetDescription, setBilletDescription] = useState("");

	const [isOpen, setIsOpen] = useState(false);
 
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}

	const handleChangeBilletTitle = (event) => {
		setBilletTitle(event.target.value);
	}
	const handleChangeBilletTextBody = (event) => {
		setBilletTextBody(event.target.value);
	}
	const handleChangeBilletDescription = (event) => {
		setBilletDescription(event.target.value);
	}

	if (!currentUser === otherUser) {
		otherUser = props.user;
	}

	useEffect(() => {
		fetchBillets(otherUser);
	}, [otherUser]);

	const fetchBillets = (otherUser) => {
		fetch(`http://localhost:4242/api/billets/${otherUser}`, {
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

	const Billet = ({ id, title, textBody, userLogin, isSuspended }) => (
		<BilletType
			isSuspended={isSuspended}
			id={id}
			title={title}
			textBody={textBody}
			userLogin={userLogin}
			otherUser={otherUser}/>
	);

	for (const key in billets) {
		const element = billets[key];
		if (element.isSuspended) {
			suspendedBillet++;
		}
	}

	const BilletList = () => (
		getAllBillets(isSame, otherUser, suspendedBillet, billets, Billet, billets.length)
	);

	const handleSubmitBillet = async () => {
		try {
			const res = await fetch("http://localhost:4242/api/billets", {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userLogin: currentUser,
					title: billetTitle,
					textBody: billetTextBody,
					description: billetDescription
				})
			});
			const data = await res.json();
			if (data.data !== false) {
				togglePopup();
				clearBillet();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const clearBillet = () => {
		setBilletTitle("");
		setBilletTextBody("");
		setBilletDescription("");
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-6'>
					{BilletList()}
				</div>
				<div className='col-md-6'>
					{isSame && (
						<div className='container'>
							<div className='card'>
								{isOpen && <PopupComponent alertType="success"
									content={ <><p>Nice, you've just created a new billet with success!</p>
									<br/><small>Close this to refresh the page.</small></> }
									handleClose={togglePopup}
									callback={() => window.location.reload()}
								/>}
								<h1>Create a new Billet</h1>
								<BilletFormComponent
									HTitle={handleChangeBilletTitle}
									VTitle={billetTitle}
									HTextBody={handleChangeBilletTextBody}
									VTextBody={billetTextBody}
									HDescription={handleChangeBilletDescription}
									VDescription={billetDescription}
									submit={handleSubmitBillet}
									onClear={clearBillet}
									/>
							</div>
						</div>)
					}
				</div>
			</div>
		</div>
	);
}

export default UserBlog;
