import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Transactions from "./routes/dashboard/Transactions";
import Settings from "./routes/dashboard/Settings";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import axios from 'axios';
import { useState } from "react";

let token = localStorage.getItem('session_token');

function App() {
  
  axios.get(`${process.env.REACT_APP_API_URL}user/${token}`).then((response) => response.data.status ? setisAuth(response.data.status) : null);
  const [isAuth, setisAuth] = useState(false);
  if (isAuth !== undefined) {
    return (
      <BrowserRouter>
      <Navbar isAuth={isAuth}/>
        <Routes>
          <Route path='/login' element={<ProtectedRoute><Login isAuth={isAuth}/></ProtectedRoute>}></Route>
          <Route path='/register' element={<ProtectedRoute><Register isAuth={isAuth}/></ProtectedRoute>}></Route>
          <Route path='/transactions' element={<ProtectedRoute><Transactions isAuth={isAuth}/></ProtectedRoute>}></Route>
          <Route path='/settings' element={<ProtectedRoute><Settings isAuth={isAuth}/></ProtectedRoute>}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
