import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children}, {isAuth}) => {
    if (children.type.name != 'Login' && children.type.name != 'Register') {
        return isAuth === true ? children : <Navigate to="/login" />;
    } else {
        return isAuth === true ? <Navigate to="/transactions" /> : children;
    }
}

export default ProtectedRoute;