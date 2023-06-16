import BtnFindBlog from "./BtnFindBlog";

const BilletType = (props) => {
	return (
        <div className='container'>
            {!props.isSuspended && (
                <li className="card" key={props.id}>
                    <div className="card-body mb-1">
                        <h2 className="card-title">{props.title}</h2>
                        <p>{props.textBody}</p>
                        <small>-{props.userLogin}</small>
                    </div>
                    <BtnFindBlog link={`/${props.otherUser}/${props.id}`} title={`See more details`} billetTitle={props.title} id={props.id} />
                </li>
            )}
	    </div>
    );
}

export default BilletType;