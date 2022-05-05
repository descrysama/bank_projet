

const Login = ({Status}) => {

    

    return (
        <div className="d-flex w-100 justify-content-center align-items-center text-center p-3 flex-column">
            <h1>Login</h1>
            {Status ? <h2>OkayMan</h2> : null}
            <div className="form-group p-5 w-50">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                  <label htmlFor="floatingInput">Adresse Mail</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="mot de passe" required/>
                  <label htmlFor="floatingPassword">Mot de passe</label>
                </div>
                <button type="submit" className="btn btn-primary m-2">Connexion</button>
              </div>
        </div>
    )
}

export default Login;