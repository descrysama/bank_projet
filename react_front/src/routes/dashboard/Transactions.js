import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";

let token = localStorage.getItem('session_token')

const Transactions = () => {

    const [solde, setSolde] = useState(0);
    const [accountNumber, setaccountNumber] = useState();
    const [accountStatus, setAccountStatus] = useState();



    const AccountChecker = () => {
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}user/getaccount/${token}`)
            .then((response) => {
                setAccountStatus(response.data.data);
                console.log(response.data.data);
            });
        }
    }

    useEffect(() => {
        AccountChecker();
    }, [])





    return (
        <div className="d-flex flex-column w-100 justify-content-center align-items-center text-center p-5">
            <h1>Compte : {accountNumber ? accountNumber : null}</h1>
            <h3 className={solde > 0 ? "text-success" : "text-danger"}><span className="text-dark">Solde :</span> {solde}€</h3>
            <div className="row">
                <button type="button" className="btn btn-success"><i className="fa-solid fa-plus"></i></button>
            </div>
            <Table/>
        </div>
    )
}

export default Transactions;