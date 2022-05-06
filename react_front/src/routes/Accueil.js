import { useNavigate } from "react-router-dom";

const Accueil = () => {

    let navigate = useNavigate();
    navigate('/login');
}

export default Accueil;