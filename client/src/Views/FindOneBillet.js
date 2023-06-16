import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommentFormComponent from '../components/CommentFormComponent';
import PopupComponent from '../components/PopupComponent';

const showCountOfSuspendBilletIfOwner = (TrueValue, currentUser, otherUser) => {
    return !TrueValue.isSuspended && (currentUser === otherUser);
}

const showCountComments = (TrueValue, titleBillet) => {
    return (
        <h1>{
            (TrueValue.comments > 0)
            ? `${TrueValue.comments} `
            + (
                (TrueValue.comments > 1)
                ? "comments" : "comment"
            ) + ` on ${titleBillet}: ` : 
            (
                <>
                    No comments yet ...
                    <img
                        src="https://cdn3.emoji.gg/emojis/6757_Sadge.png"
                        width="128px"
                        height="86px"
                        alt="Sadge"
                    />
                    -Sadge
                </>
            )
        }</h1>
    );
}

const FindOneBillet = (props) => {
    const Navigate = useNavigate();
    const objCurrentUser = sessionStorage.getItem("user").split("\"");
    const currentUser = objCurrentUser[3];
    const otherUser = props.user;
    const billetFields = [];
    const billetComments = [];

	const idBillet = props.idBillet;
	const titleBillet = props.titleBillet;

    const [oneBillet, setOneBillet] = useState([]);
	const [isOnShow, setShow] = useState(false);
	const [comment, setComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isBilletSuspended, setBilletSuspended] = useState(false);

    const togglePopup = () => {
		setIsOpen(!isOpen);
	}

    const handleChangeComment = (event) => {
		setComment(event.target.value);
	}

    const handleBilletSuspension = () => {
		setBilletSuspended(!isBilletSuspended);
        setTimeout(() => {
            Navigate(`/${currentUser}`);
        }, 3000);
	}

	useEffect(() => {
		fetchOneBillet(otherUser, idBillet);
	}, [otherUser, idBillet]);

    const suspendBillet = async (otherUser, id) => {
        try {
            const res = await fetch(`http://localhost:4242/api/billets/${otherUser}/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: idBillet,
                        userLogin: otherUser,
                        title: titleBillet,
                        isSuspended: true
                    }
                )
            });
            const data = res.json();
            if (parseInt(data.matchedCount) === 1) {
                handleBilletSuspension(true);
                togglePopup();
            }
        } catch (error) {
            console.log(error.message)
        }
    };

	const fetchOneBillet = (otherUser, id) => {
		fetch(`http://localhost:4242/api/billets/${otherUser}/${id}`, {
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
				const billetsArray = data.data;
                if (!billetsArray.isSuspended) {
                    setOneBillet(billetsArray);
                }
			})
			.catch(error => console.log(error));
	};

    const PreferedTitle = {
        _id: "",
        id: "",
        userLogin: "Author",
        title: "Title",
        textBody: "Content",
        description: "Description"
    }

    const TrueValue = {
        _id: "",
        id: "",
        userLogin: "",
        title: "",
        textBody: "",
        description: "",
        comments: 0
    }

    for (const key in oneBillet) {
        TrueValue[key] = oneBillet[key];
        if (key === "_id"
        || key === "id"
        || key === "title"
        || key === "isSuspended"
        || key === "comments") continue;
        billetFields.push(
            <li key={"li-key" + key} className='mt-1'>
                <h2 className='card-title'>{PreferedTitle[key]}</h2>
                <p>{oneBillet[key]}</p>
            </li>
        );
    }

    for (const key in oneBillet) {
        if (key === "comments") TrueValue[key] = oneBillet.comments.length;
    }

    const handleRemoveComment = async (targetLogin, commentToDelete) => {
        try {
            const id = idBillet
            const res = await fetch(`http://localhost:4242/api/billets/${otherUser}/${id}/comment`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: idBillet,
                        userLogin: targetLogin,
                        comment: commentToDelete,
                        title: titleBillet
                    }
                )
            });
            const data = await res.json();
            if (parseInt(data.matchedCount) === 1) {
                
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleAddComment = async () => {
        try {
            if (comment === "") {
                return;
            }
            const id = idBillet
            const res = await fetch(`http://localhost:4242/api/billets/${otherUser}/${id}/comment/add`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: idBillet,
                        userLogin: currentUser,
                        title: titleBillet,
                        commentBoy: currentUser,
                        comment: comment
                    }
                )
            });
            const data = await res.json();
            
            if (!data === false) {
                setComment("");
                togglePopup();
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const getComs = () => {
        const comments = oneBillet.comments;
        for (const key in comments) {
            const element = comments[key];
            billetComments.push(
                <li className='mb-1 card' key={element.comment + key}>
                    {/* <h2 className='mb-1'>{(element.commentBoy ===  undefined ? "It's still calm, unless ..." : (currentUser === element.commentBoy ? "You said :" : `${element.commentBoy} said:` ))   }</h2> */}
                    <h2 className='mb-1'>
                        {(currentUser === element.commentBoy
                        ? "You said:"
                        : `${element.commentBoy} said:`)}
                    </h2>
                    <p className='mb-1'>{element.comment}</p>
                    {((element.commentBoy === currentUser) || (currentUser === otherUser)) &&
                    <button
                        className='btn-line-error text-hover-white font-weight-600'
                        onClick={() => handleRemoveComment(element.commentBoy, element.comment)}>
                        Remove comment
                    </button>
                    }
                </li>
            );
        }
    }    

    getComs();

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <h1>Title: {titleBillet}</h1>
                        <div className='card-body'>
                            <ul>{billetFields}</ul>
                            {isOpen && <PopupComponent alertType="success"
                                    content={ <><p>You've just posted a new comment on {`${otherUser}'s billet!`}!</p>
                                    <br/><small>Close this to refresh the page.</small></> }
                                    handleClose={togglePopup}
                                    callback={() => window.location.reload()}
                                />
                            }
                            {isBilletSuspended && <PopupComponent alertType="success"
                                    content={ <><p>You've suspended this billet: {`${titleBillet}`}!</p>
                                    <br/><small>You will be redirected to your blog</small></> }
                                    handleClose={togglePopup}
                                    callback={handleBilletSuspension}
                                />
                            }
                        {
                            showCountOfSuspendBilletIfOwner(TrueValue, currentUser, otherUser)
                            && (<button className='btn-line-error text-hover-white mt-2 ml-1 mb-1 font-weight-600' onClick={() => suspendBillet(otherUser, idBillet)}>Delete billet</button>)
                        }
                            <Link to={`/${otherUser}`} className='btn-gray mt-2 ml-1 mb-1'>Go back</Link>
                            <button className='btn-gray mt-2 ml-1 mb-1' onClick={() => setShow(!isOnShow)}>
                                {isOnShow ? "Close" : "Add a new comment" }
                            </button>
                            {isOnShow && <CommentFormComponent submit={handleAddComment} HComment={handleChangeComment} VComment={comment} />}
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card'>
                        {showCountComments(TrueValue, titleBillet)}
                        <div className='card-body'>
                            <ul>
                            {billetComments}
                            </ul>
                        
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FindOneBillet;
