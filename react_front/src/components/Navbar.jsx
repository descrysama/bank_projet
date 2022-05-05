import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';



const Navbar = () => {

    const [isAuth, setisAuth] = useState(false);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" >Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
            {isAuth == true ? 
            
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/transactions">Transactions</NavLink>
                </li>   
            </ul>
            : null}
            {isAuth == false ?
            
            <ul className="w-100 d-flex justify-content-end align-items-center m-0">
                <Link className="btn btn-secondary m-2" to="/login">Login</Link>
                <Link className="btn btn-secondary m-2" to="/register">Register</Link>
            </ul>

            : null}
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
