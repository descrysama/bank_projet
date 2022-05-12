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
  

  const [isAuth, setisAuth] = useState();
  axios.get(`${process.env.REACT_APP_API_URL}user/${token}`).then((response) => response.data.status ? setisAuth(response.data.status) : null);

  if (isAuth === true) {
    return (
      <BrowserRouter>
      <Navbar isAuth={isAuth}/>
        <Routes>
          <Route path='/login' element={<ProtectedRoute isAuth={isAuth}><Login /></ProtectedRoute>}></Route>
          <Route path='/register' element={<ProtectedRoute isAuth={isAuth}><Register /></ProtectedRoute>}></Route>
          <Route path='/transactions' element={<ProtectedRoute isAuth={isAuth}><Transactions /></ProtectedRoute>}></Route>
          <Route path='/settings' element={<ProtectedRoute isAuth={isAuth}><Settings /></ProtectedRoute>}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
