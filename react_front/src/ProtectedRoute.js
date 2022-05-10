import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const token = localStorage.getItem('session_token');


const ProtectedRoute = ({children}) => {
    
    const [isAuth, setIsAuth] = useState();
    
    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_URL}user/${token}`).then((response) => response.data.status == true ? setIsAuth(response.data.status) : null);
    })



    if (children.type.name != 'Login' && children.type.name != 'Register') {
        return isAuth ? children : <Navigate to="/login" />;
    } else {
        return isAuth == true ? <Navigate to="/transactions" /> : children;
    }
}

export default ProtectedRoute;