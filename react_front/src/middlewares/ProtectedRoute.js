import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const [isAuth, setIsAuth] = useState(false);

    const navigate = useNavigate();
    
    const token = localStorage.getItem('session_token');

    const checkAuth = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}user/${token}`).then((response) => setIsAuth(response.data.status));
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (token != null) {
            checkAuth();
        }
    }, [])

    if (children.type.name != 'Login') {
        console.log('ici')
        return isAuth == true ? children : navigate('/login');
        
    } else {
        return isAuth == true ? navigate('/dashboard') : children
    }
}

export default ProtectedRoute;