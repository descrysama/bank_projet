import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert';

const Login = () => {

    let navigate = useNavigate();
    const [Status, setStatus] = useState();
  
    const SubmitHandler = (e) => {
      e.preventDefault();
      if (e.target.email.value && e.target.password.value) {
        axios.post(`${process.env.REACT_APP_API_URL}login`, {
          email: e.target.email.value,
          password: e.target.password.value,
        }).then((response) => {
          if (response.status == 200) {
            localStorage.setItem('session_token', response.data.api_token);
            navigate('/transaction');
            window.location.reload();
          }
        }).catch((response) => {
          if (response.response.data.message) {
            setStatus(response.response.data.message);
          } else {
            setStatus("Email ou mot de passe incorrect");
          }
        })
      } else {
        // ERROR
        setStatus('Erreur Formulaire');
      }
      
      
    }

    return (
        <div className="d-flex w-100 justify-content-center align-items-center text-center p-3 flex-column">
            <h1>Login</h1>
            {Status != null ? <Alert alert={Status}/> : null}
            <form className="w-50" onSubmit={(e) => SubmitHandler(e)}>
            <div className="form-group p-5 w-100">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Adresse Mail</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="mot de passe" />
                    <label htmlFor="password">Mot de passe</label>
                  </div>
                  <button type="submit" className="btn btn-primary m-2">Connexion</button>
              </div>
            </form>
        </div>
    )
}

export default Login;