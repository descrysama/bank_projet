

const Register = () => {
    return (
        <div className="d-flex w-100 justify-content-center align-items-center text-center p-3 flex-column">
            <h1>Register</h1>
            <div className="form-group p-5 w-50">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="username" placeholder="SuperUtilisateur" required/>
                  <label for="floatingInput">Pseudonyme</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" required/>
                  <label for="floatingInput">Adresse Mail</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" className="form-control" id="password" name="password" placeholder="mot de passe" required/>
                  <label for="password">Mot de passe</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" className="form-control" id="confirm-password" name="password_confirmation" placeholder="confirmez le mot de passe" required/>
                  <label for="confirm-password">Confirmez mot de passe</label>
                </div>
                <button type="submit" className="btn btn-primary m-2">Inscription</button>
              </div>
        </div>
    )
}

export default Register;