import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert';



const Register = () => {
  let navigate = useNavigate();
  const [Status, setStatus] = useState();

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (e.target.username.value && e.target.email.value && e.target.password.value && e.target.password_confirmation.value) {
      axios.post(`${process.env.REACT_APP_API_URL}users`, {
        name: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value
      }).then((response) => {
        if (response.status == 201) {
          navigate('/login')
        }
      }).catch((error) => {
        setStatus(error.response.data.message);
      });
    } else {
      // ERROR
      setStatus('Erreur Formulaire');
    }
    
    
  }

    return (
        <div className="d-flex w-100 justify-content-center align-items-center text-center p-3 flex-column">
            <h1>Register</h1>
            {Status != null ? <Alert alert={Status}/> : null}
             <form className="w-50" onSubmit={(e) => SubmitHandler(e)}>
              <div className="form-group p-5 w-100">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="username" name="username" placeholder="SuperUtilisateur" />
                    <label htmlFor="floatingInput">Pseudonyme</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email"  name="email" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Adresse Mail</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="mot de passe" />
                    <label htmlFor="password">Mot de passe</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" placeholder="confirmez le mot de passe" />
                    <label htmlFor="confirm-password">Confirmez mot de passe</label>
                  </div>
                  <button type="submit" className="btn btn-primary m-2">Inscription</button>
                </div>
             </form>
        </div>
    )
}

export default Register;