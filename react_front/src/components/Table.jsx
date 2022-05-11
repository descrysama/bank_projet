const Table = () => {
    return (
        <table class="table table-hover">
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
                <tr>
                    <th scope="row">Default</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td><i class="fa-solid fa-trash"></i></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;