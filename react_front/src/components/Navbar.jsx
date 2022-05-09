import { NavLink, Link, useNavigate } from "react-router-dom";
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';



const Navbar = ({isAuth}) => {
    let navigate = useNavigate();
    
    const Logout = () => {
        localStorage.removeItem('session_token');
        navigate('/login');
        window.location.reload();

    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Budget_logo.svg/1200px-Budget_logo.svg.png" style={{width:"10rem"}} alt="" /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
            {isAuth == true ? 
            
            <>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/transactions">Transactions</NavLink>
                    </li>   
                </ul>
                <ul className="w-100 d-flex justify-content-end align-items-center m-0">
                    <li className="btn btn-secondary m-2" onClick={Logout}>Logout</li>
                </ul>
            </>
            

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
