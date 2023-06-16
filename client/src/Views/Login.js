import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from '../components/LoginFormComponent';

const Login = () => {
    const [loginLogin, setLoginLogin] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const Navigate = useNavigate();

    const handleChangeLoginLogin = (event) => {
        setLoginLogin(event.target.value);
    }
    const handleChangeLoginPassword = (event) => {
        setLoginPassword(event.target.value);
    }

    const handleSubmitLogin = async () => {
        try {
            const res = await fetch("http://localhost:4242/api/users/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    login: loginLogin,
                    password: loginPassword
                })
            });
            const data = await res.json();
            if (data.status === "LOGGED") {
                setTimeout(() => {
                    sessionStorage.setItem('status', data.status);
                    const user = {login: data.user.login, email: data.user.email}
                    console.log(user);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    Navigate(`/`);
                }, 1500);
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='container'>
            <LoginFormComponent
                HLogin={handleChangeLoginLogin}
                VLogin={loginLogin}
                HPassword={handleChangeLoginPassword}
                VPassword={loginPassword}
                submit={handleSubmitLogin}
            />
        </div>
    );
}

export default Login;