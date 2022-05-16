import { Button } from 'react-bootstrap';
import axios from 'axios';
import  {useState}  from 'react';
let token = localStorage.getItem('session_token');

const Table = ({operations, setOperations, solde, setSolde, sum, setSum}) => {

    const [Status] = useState();
    const [Alert] = useState(false);


    const DeleteTransaction = (id, i, amount) => {
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}transaction/delete/${token}/${id}`)
            let newOperations = [...operations];
            newOperations.splice(i, 1);
            setOperations(newOperations);
            setSolde(solde - amount);   
            setSum(sum - amount);
        }
    }


    return (
        <>
        <table className="table table-hover w-50">
        {Status != null ? <Alert alert={Alert}/> : null}
            <thead>
                <tr>
                <th scope="col">Montant</th>
                <th scope="col">Type D'operation</th>
                <th scope="col">N° de Compte</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {operations.length > 0 ?
                
                operations.map((operation, i) => 
                <tr key={i}>
                    <td style={operation.amount < 0 ? {color: 'red'} : {color: '#1FA519'}}>{operation.amount}€</td>
                    <td>{operation.operation_type}</td>
                    <td>{operation.account_number}</td>
                    <td>{operation.operation_detail}</td>
                    <td><Button onClick={() => {DeleteTransaction(operation.id, i, operation.amount)}} variant="outline-danger"><i className="fa-solid fa-trash"></i></Button></td>
                </tr>
            ): null}
            </tbody>
        </table>
        </>
    )
}

export default Table;