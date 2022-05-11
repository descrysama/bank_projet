import { useState } from "react";

const Settings = () => {

    const [plafond, setPlafond] = useState(100);

    return (
        <div className="d-flex flex-column w-100 justify-content-center align-items-center text-center p-5">
            <h1>Settings</h1>
            <div className="w-50 row">
                <h3>Planfond Actuel : {plafond}€</h3>
                <form onSubmit={console.log}>
                    <input type="text" class="form-control m-2" name="plafond" aria-describedby="emailHelp" placeholder="Plafond"></input>
                    <button type="button" class="btn btn-success m-2">Valider</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;