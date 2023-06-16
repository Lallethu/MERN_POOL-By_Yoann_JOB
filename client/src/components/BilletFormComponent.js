const BilletFormComponent = (props) => {
    return (
        <div className='card d-flex'>
            <h1 className='card-title'>Billet</h1>
            <div className="form-group card-body">
                <div className="form-floating mb-1">
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" className="form-control p-1" placeholder="Les orties, au four ou à la poêle ?" name="title" onChange={props.HTitle} value={props.VTitle}/>
                </div>
                <div className="form-floating mb-1">
                    <label htmlFor="textBody">Content for the billet</label><br/>
                    <input type="text" className="form-control p-1 mb-2" placeholder="En vrai regarde, au four ça cuit bien genre vraiment mais à la poêle tu gere mieux la cuisson avec epices!" name="textBody" onChange={props.HTextBody} value={props.VTextBody}/>
                </div>
                <div className="form-floating">
                    <label htmlFor="description">Description</label><br/>
                    <input type="text" className="form-control p-1 mb-1" placeholder="This is a very large description of what this field can be used for!" name="description" onChange={props.HDescription} value={props.VDescription}/>
                </div>
                <button type="submit" className="btn btn-gray mb-1 ml-1" onClick={props.submit}>Create my billet</button>
                <button type="button" className="btn btn-gray mb-1 ml-1" onClick={props.onClear}>Clear it</button>
            </div>
        </div>
    );
}

export default BilletFormComponent;