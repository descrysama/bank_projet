import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from '../../components/Alert';

let token = localStorage.getItem('session_token')

const Transactions = () => {

    const [solde, setSolde] = useState(0);
    const [plafond, setPlafond] = useState(0);
    const [accountStatus, setAccountStatus] = useState([]);
    const [Status, setStatus] = useState();

    if (token) {
        axios.get(`${process.env.REACT_APP_API_URL}user/checkaccount/${token}`)
        .then((response) => {
            setAccountStatus(response.data.account_number);
            setSolde(response.data.balance);
            setPlafond(response.data.spent_limit);
            console.log(response.data)
        });
    }



    const SubmitHandler = (e) => {
        e.preventDefault();
        if (e.target.balance.value && e.target.spent_limit.value) {
          axios.post(`${process.env.REACT_APP_API_URL}user/createaccount/${token}`, {
            balance: e.target.balance.value,
            spent_limit: e.target.spent_limit.value
          });
          setStatus();
        } else {
          // ERROR
          setStatus('Erreur Formulaire');
        }
    }




    return (
        <div className="d-flex flex-column w-100 justify-content-center align-items-center text-center p-5">
        {accountStatus == false ? 
                <div className="w-50 row">
                    <h3>Créer un compte :</h3>
                    {Status != null ? <Alert alert={Status}/> : null}
                    <form onSubmit={(e) => SubmitHandler(e)}>
                        <input type="text" className="form-control m-2" name="spent_limit" aria-describedby="emailHelp" placeholder="Plafond"></input>
                        <input type="text" className="form-control m-2" name="balance" aria-describedby="emailHelp" placeholder="Solde"></input>
                        <input type="submit" className="btn btn-success m-2"/>
                    </form>
                </div>
        :
        <>
            <h1>Compte : {accountStatus ? accountStatus : null}</h1>
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