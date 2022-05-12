import { useState } from "react";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children}) => {
    
    const [isAuth, setisAuth] = useState(children.props.isAuth);

    if (children.type.name != 'Login' && children.type.name != 'Register') {
        return isAuth === false ? children : <Navigate to="/login" />;
    } else {
        return isAuth === true ? <Navigate to="/transactions" /> : children;
    }
}

export default ProtectedRoute;