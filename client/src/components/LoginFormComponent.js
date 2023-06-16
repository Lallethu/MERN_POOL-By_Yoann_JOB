const LoginFormComponent = (props) => {
    return (
        <div className='card d-flex'>
            <h1 className='card-title'>Login Form</h1>
            <div className="form-group card-body d-flex">
                <div className="form-floating mb-2">
                    <label htmlFor="login">Login</label><br/>
                    <input type="text" className="form-control p-1 mb-1" placeholder="Theodort" name="login" onChange={props.HLogin} value={props.VLogin}/>
                </div>
                <div className="form-floating mb-2">
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" className="form-control p-1 mb-1" placeholder="Password" name="password" onChange={props.HPassword} value={props.VPassword}/>
                </div>
                <button type="submit" className="btn btn-gray" onClick={props.submit}>Log me in!</button>
            </div>
        </div>
    );
}

export default LoginFormComponent;