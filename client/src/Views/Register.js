import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterFormComponent from '../components/RegisterFormComponent';

const Register = () => {
    const [registerLogin, setRegisterLogin] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
    const Navigate = useNavigate();

    const handleChangeRegisterLogin = (event) => {
        setRegisterLogin(event.target.value);
    }
    const handleChangeRegisterEmail = (event) => {
        setRegisterEmail(event.target.value);
    }
    const handleChangeRegisterPassword = (event) => {
        setRegisterPassword(event.target.value);
    }
    const handleChangeRegisterPasswordConfirm = (event) => {
        setRegisterPasswordConfirm(event.target.value);
    }

    const handleSubmitRegister = async () => {
        try {
            const res = await fetch("http://localhost:4242/api/users/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    login: registerLogin,
                    email: registerEmail,
                    password: registerPassword,
                    passwordConfirm: registerPasswordConfirm
                })
            });
            const data = await res.json();
            if (res.ok) {
                setTimeout(() => {
                    console.log(data);
                    sessionStorage.setItem('status', 'guest')
                    Navigate(`/login`);
                }, 1000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='container'>
            <RegisterFormComponent 
                HLogin={handleChangeRegisterLogin}
                VLogin={registerLogin}
                HEmail={handleChangeRegisterEmail}
                VEmail={registerEmail}
                HPassword={handleChangeRegisterPassword}
                VPassword={registerPassword}
                HPasswordConfirm={handleChangeRegisterPasswordConfirm}
                VPasswordConfirm={registerPasswordConfirm}
                submit={handleSubmitRegister}
            />
        </div>
    );
}

export default Register;