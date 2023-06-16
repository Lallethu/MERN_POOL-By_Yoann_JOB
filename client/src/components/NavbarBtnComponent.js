const NavbarBtnComponent = (props) => {
    return (
        <li className="mr-1">
            {
                (props.status === props.target)
                && (
                    <a className="btn-gray text-black font-weight-600" href={props.link} onClick={props.callBack}>
                        {props.title}
                    </a>
                )
            }
        </li>
    );
}

export default NavbarBtnComponent;