const CommentFormComponent = (props) => {
    return (
        <div className='card d-flex'>
            <h1 className='card-title'>Comment</h1>
            <input type="text" className="form-control p-1 mb-2" placeholder="Enter your comment..." name="comment" onChange={props.HComment} value={props.VComment}/>
            <button type="submit" className="btn-line-success mb-1 ml-1 font-weight-bolder" onClick={props.submit}>Add my comment!</button>
        </div>
    );
}

export default CommentFormComponent;