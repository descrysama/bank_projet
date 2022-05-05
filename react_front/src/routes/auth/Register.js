import axios from 'axios';
import { useState } from 'react';

const registerURL = 'http://127.0.0.1:8000/api/users';

const Register = () => {

  const [Status, setStatus] = useState();

  const SubmitHandler = (e) => {
    e.preventDefault();

    axios.post(registerURL, {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }).then((response) => setStatus(response.data)).catch(function(error) {console.log(error)});
  }

    return (
        <div className="d-flex w-100 justify-content-center align-items-center text-center p-3 flex-column">
            <h1>Register</h1>
             <form className="w-50" onSubmit={(e) => SubmitHandler(e)}>
             <h1>{Status}</h1>
              <div className="form-group p-5 w-100">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="username" name="username" placeholder="SuperUtilisateur" required/>
                    <label htmlFor="floatingInput">Pseudonyme</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email"  name="email" placeholder="name@example.com" required/>
                    <label htmlFor="floatingInput">Adresse Mail</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="mot de passe" required/>
                    <label htmlFor="password">Mot de passe</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" placeholder="confirmez le mot de passe" required/>
                    <label htmlFor="confirm-password">Confirmez mot de passe</label>
                  </div>
                  <button type="submit" className="btn btn-primary m-2">Inscription</button>
                </div>
             </form>
        </div>
    )
}

export default Register;