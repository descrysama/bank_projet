import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

let token = localStorage.getItem('session_token');

const Settings = () => {

    const [plafond, setPlafond] = useState(0);
    const [Loading, setLoading] = useState(true);
    const [accountNumber, setAccountNumber] = useState();
    const [Status, setStatus] = useState();
    let navigate = useNavigate();

    if (token) {
        axios.get(`${process.env.REACT_APP_API_URL}user/checkaccount/${token}`)
        .then((response) => {
            setPlafond(response.data.spent_limit);
            setAccountNumber(response.data.account_number);
            setLoading(false);
        });
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (e.target.spent_limit.value) {
          axios.post(`${process.env.REACT_APP_API_URL}user/updateaccount/${token}`, {
            spent_limit: e.target.spent_limit.value
          });
          navigate('/transactions');
          setStatus();
        } else {
          // ERROR
          setStatus('Erreur Formulaire');
        }
    }

    return (
        <div className="d-flex flex-column w-100 justify-content-center align-items-center text-center p-5">
            {Loading == true ?
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
            :
                accountNumber ?
                <>
                    <h1>Settings</h1>
                    <div className="w-50 row">
                    {Status != null ? <Alert alert={Status}/> : null}
                        <h3>Plafond Actuel : {plafond}€</h3>
                        <form onSubmit={(e) => SubmitHandler(e)}>
                            <input type="text" className="form-control m-2" name="spent_limit" aria-describedby="emailHelp" placeholder="Plafond"></input>
                            <button type="submit" className="btn btn-success m-2">Valider</button>
                        </form>
                    </div>
                </>
                :
                <h3>Veuillez Créer un compte dans l'espace <Link to="/transactions" style={{color: "purple"}}>Transactions.</Link></h3>

            }
        </div>
    )
}

export default Settings;