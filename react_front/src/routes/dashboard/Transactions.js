import Table from "../../components/Table";
import { useState } from "react";
import axios from "axios";
import Alert from '../../components/Alert';
import { useNavigate } from "react-router-dom";

let token = localStorage.getItem('session_token')

const Transactions = () => {

    const [Loading, setLoading] = useState(true);
    const [solde, setSolde] = useState(0);
    const [plafond, setPlafond] = useState(0);
    const [accountStatus, setAccountStatus] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [Status, setStatus] = useState();
    let navigate = useNavigate();

    if (token) {
        axios.get(`${process.env.REACT_APP_API_URL}user/checkaccount/${token}`)
        .then((response) => {
            setAccountStatus(response.data.data);
            setAccountNumber(response.data.account_number);
            setSolde(response.data.balance);
            setPlafond(response.data.spent_limit);
            setLoading(false);
            console.log(response.data.account_number)
        });
    }



    const SubmitHandler = (e) => {
        e.preventDefault();
        if (e.target.balance.value && e.target.spent_limit.value) {
          axios.post(`${process.env.REACT_APP_API_URL}user/createaccount/${token}`, {
            balance: e.target.balance.value,
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
        { Loading == true ?
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        :
            accountStatus == false ? 
                <div className="w-50 row">
                    <h3>Créer un compte :</h3>
                    {Status != null ? <Alert alert={Status}/> : null}
                    <form onSubmit={(e) => SubmitHandler(e)}>
                        <input type="text" className="form-control m-2" name="spent_limit" placeholder="Plafond"></input>
                        <input type="text" className="form-control m-2" name="balance" placeholder="Solde"></input>
                        <input type="submit" className="btn btn-success m-2"/>
                    </form>
                </div>
        :
        <>
            <h1>Compte : {accountNumber ? accountNumber : null}</h1>
            <h3 className={solde > 0 ? "text-success" : "text-danger"}><span className="text-dark">Solde :</span> {solde}€</h3>
            <h3><span className="text-dark">Plafond :</span> {plafond}€</h3>
            <div className="row">
                <button type="button" className="btn btn-success"><i className="fa-solid fa-plus"></i></button>
            </div>
        <Table/>
        </>

        }
        </div>
    )
}

export default Transactions;