import { useNavigate } from 'react-router-dom';
import NavbarBtnComponent from './NavbarBtnComponent';

const Navbar = () => {
    const Navigate = useNavigate();
    let status;

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:4242/api/users/logout", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem('status', data.status)
                sessionStorage.setItem('user', [""])
                Navigate(`/`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    status = sessionStorage.getItem('status');
    
    return (
        <div className='navbar navbar-gray-dark-5 mb-3 pt-2 pb-2'>
            <div className='container'>
                <ul className='display-f'>
                    <NavbarBtnComponent title="Home" link="/" status={status} target={status === "guest" ? "guest" : "LOGGED"} />
                    <NavbarBtnComponent title="Login" link="/login" status={status} target="guest" />
                    <NavbarBtnComponent title={status === "guest" ? "Register" : "Profile"} link={status === "guest" ? "/register" : "/profile"} status={status} target={status === "guest" ? "guest" : "LOGGED"} />
                    <NavbarBtnComponent title="Logout" link={"#"} status={status} target="LOGGED" callBack={logout} />
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
