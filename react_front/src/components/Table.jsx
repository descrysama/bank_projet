import { useState } from "react";

const Table = ({operations}) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Montant</th>
                <th scope="col">Type D'operation</th>
                <th scope="col">Compte</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {operations.map((operation) => 
                    <tr>
                        <td style={operation.amount < 0 ? {color: 'red'} : {color: '#1FA519'}}>{operation.amount}€</td>
                        <td>{operation.operation_type}</td>
                        <td>{operation.account_number}</td>
                        <td>{operation.operation_detail}</td>
                        <td><i className="fa-solid fa-trash"></i></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table;
