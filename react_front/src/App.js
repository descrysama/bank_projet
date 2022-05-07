import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Transactions from "./routes/Transactions";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import { useEffect, useState } from "react";
import Dashboard from "./routes/dashboard/dashboard";


function App() {

  const [isLoggedIn, setisLoggedIn] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}user/${localStorage.getItem('session_token')}`).then((response) => {
      setisLoggedIn(response.data.status);
      
  });
  }, [])

  return (
    <BrowserRouter>
    <Navbar isAuth={isLoggedIn}/>
      <Routes>
          <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
        <Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        <Route path="" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
