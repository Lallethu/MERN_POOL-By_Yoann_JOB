const RegisterFormComponent = (props) => {
    return (
        <div className='card d-flex'>
            <h2 className='card-title'>Register</h2>
            <div className="form-group card-body">
                <div className="form-floating mb-1">
                    <label htmlFor="login">Login</label><br/>
                    <input type="text" className="form-control p-1" placeholder="Theodort" name="login" onChange={props.HLogin} value={props.VLogin}/>
                </div>
                <div className="form-floating mb-1">
                    <label htmlFor="email">Email address</label><br/>
                    <input type="email" className="form-control p-1 mb-2" placeholder="Theodort@mail.com" name="email" onChange={props.HEmail} value={props.VEmail}/>
                </div>
                <div className="form-floating">
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" className="form-control p-1 mb-1" placeholder="Password" name="password" onChange={props.HPassword} value={props.VPassword}/>
                </div>
                <div className="form-floating">
                    <label htmlFor="passwordConfirm">Confirm password</label><br/>
                    <input type="password" className="form-control p-1 mb-2" placeholder="Repeat password" name="passwordConfirm" onChange={props.HPasswordConfirm} value={props.VPasswordConfirm}/>
                </div>
                <button type="submit" className="btn-gray mb-1 ml-1" onClick={props.submit}>Send my registration</button>
            </div>
        </div>
    );
}

export default RegisterFormComponent;