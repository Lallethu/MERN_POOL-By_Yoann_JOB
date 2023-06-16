const BtnFindBlog = (props) => {
    const getBilletId = () => {
        sessionStorage.setItem("getOneBilletId", props.id)
        sessionStorage.setItem("getOneBilletTitle", props.billetTitle)
    };
    return (
        <>
            <a className="btn-gray text-black font-weight-600" href={props.link} onClick={getBilletId}>
                {props.title}
            </a>
        </>
    );
}

export default BtnFindBlog;