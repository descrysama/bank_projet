import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from '../../components/Alert';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

let token = localStorage.getItem('session_token')

const Transactions = () => {

    const [Loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [solde, setSolde] = useState(0);
    const [plafond, setPlafond] = useState(0);
    const [sum, setSum] = useState(0);
    const [accountStatus, setAccountStatus] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [Status, setStatus] = useState();
    const [operations, setOperations] = useState([]);


    const GetTransactions = () => {
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}transaction/getlist/${token}`)
            .then((response) => {
                setOperations(response.data.data);
                if (response.data.data.length > 0 ) {
                    let SumArray = [];
                response.data.data.map((operation) => {
                    let split = JSON.stringify(operation.amount).split('');
                    if (split[0] == '-'){
                        SumArray.push(operation.amount);
                    }
                });
                if (SumArray.length > 0) {
                    let Sum = SumArray.reduce((Prev,RnValue) => Prev + RnValue);
                    setSum(Sum);
                }
                }
                setLoading(false);
            })
        }
    }

    const CheckAccount = () => {
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}user/checkaccount/${token}`)
            .then((response) => {
                setAccountStatus(response.data.data);
                setAccountNumber(response.data.account_number);
                setSolde(response.data.balance);
                setPlafond(response.data.spent_limit);
            });
        }
    }

    useEffect(() => {
        CheckAccount();
        GetTransactions();
    }, []);



    const CreateAccountSubmit = (e) => {
        if (e.target.balance.value && e.target.spent_limit.value) {
          axios.post(`${process.env.REACT_APP_API_URL}user/createaccount/${token}`, {
            balance: e.target.balance.value,
            spent_limit: e.target.spent_limit.value
          });
          setStatus();
          
        } else {
            e.preventDefault();
          // ERROR
          setStatus('Erreur Formulaire');
        }
    }

    const AddOpeSubmit = async (e) => {
        e.preventDefault();
        if (e.target.operationtype.value && e.target.operationdetail.value && e.target.amount.value && e.target.operator.value) {
            if (e.target.operator.value != 'minus') {
                let response = await axios.post(`${process.env.REACT_APP_API_URL}transaction/store/${token}`, {
                    amount: e.target.amount.value,
                    operation_type: e.target.operationtype.value,
                    description: e.target.operationdetail.value,
                    operator: e.target.operator.value
                });
                setStatus();
                let newOperations = [...operations];
                newOperations.unshift(response.data.data);

                setOperations(newOperations);
                if (e.target.operator.value == 'minus') {
                    setSolde(parseInt(solde) - parseInt(e.target.amount.value));
                    setSum(parseInt(sum) - parseInt(e.target.amount.value));
                } else if (e.target.operator.value == 'plus') {
                    setSolde(parseInt(solde) + parseInt(e.target.amount.value));
                } else {
                    setSolde(parseInt(solde) + parseInt(e.target.amount.value));
                }
            } else if (Math.abs(sum) < plafond){
                let response = await axios.post(`${process.env.REACT_APP_API_URL}transaction/store/${token}`, {
                    amount: e.target.amount.value,
                    operation_type: e.target.operationtype.value,
                    description: e.target.operationdetail.value,
                    operator: e.target.operator.value
                });
                setStatus();
                let newOperations = [...operations];
                newOperations.unshift(response.data.data);

                setOperations(newOperations);
                if (e.target.operator.value == 'minus') {
                    setSolde(parseInt(solde) - parseInt(e.target.amount.value));
                    setSum(parseInt(sum) - parseInt(e.target.amount.value));
                } else if (e.target.operator.value == 'plus') {
                    setSolde(parseInt(solde) + parseInt(e.target.amount.value));
                } else {
                    setSolde(parseInt(solde) + parseInt(e.target.amount.value));
                }
            }else {
                setStatus('Plafond Atteint');
            }
          handleClose();
          
        } else {
            e.preventDefault();
          // ERROR
          setStatus('Erreur : Veuillez verifier votre formulaire.');
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
                    <form onSubmit={(e) => CreateAccountSubmit(e)}>
                        <input type="text" className="form-control m-2" name="spent_limit" placeholder="Plafond"></input>
                        <input type="text" className="form-control m-2" name="balance" placeholder="Solde"></input>
                        <input type="submit" className="btn btn-success m-2"/>
                    </form>
                </div>
        :
        <>
            {Status != null ? <Alert alert={Status}/> : null}
            <h1>Compte : {accountNumber ? accountNumber : null}</h1>
            <h3 className={solde >= 0 ? "text-success" : "text-danger"}><span className="text-dark">Solde :</span> {solde}€</h3>
            <h3><span className="text-dark">Plafond :</span> {plafond}€</h3>
            <h3><span className="text-dark">Total Dépenses :</span> {Math.abs(sum)}€</h3>
            <div className="row">
                <Button type="button" className="btn btn-success m-2" onClick={handleShow}>Opération <i className="fa-solid fa-plus"></i></Button>
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter une Operation</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => AddOpeSubmit(e)}>
                    <Modal.Body>
                        {Status != null ? <Alert alert={Status}/> : null}
                            <label htmlFor="amount" className="m-2">Montant :</label>
                            <input type="text" className="form-control mb-2" name="amount" placeholder="ex : 100"></input>
                            <label htmlFor="operationtype" className="m-2">Type d'opération :</label>
                            <select className="form-select mb-2" name="operationtype">
                                <option value="credit_card">Carte Bleue</option>
                                <option value="contactless_payment">Sans contact (Téléphone)</option>
                                <option value="bank_debit">Debit Bancaire (Prelevement)</option>
                            </select>
                            <label htmlFor="operationtype" className="m-2">Débit/Crédit :</label>
                            <select className="form-select mb-2" name="operator">
                                <option value="minus">Débit (-)</option>
                                <option value="plus">Crédit (+)</option>
                            </select>
                            <label htmlFor="operationdetail" className="m-2">Detail de l'opération :</label>
                            <input type="text" className="form-control mb-2" name="operationdetail" placeholder="ex : Uber Eats"></input>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                    <input type="submit" className="btn btn-success m-2" value={'Ajouter'}/>
                    </Modal.Footer>
                </form>
            </Modal>
            <Table operations={operations} setOperations={setOperations} solde={solde} setSolde={setSolde} sum={sum} setSum={setSum}/>
        </>

        }
        </div>
    )
}

export default Transactions;
