import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Transactions from "./routes/dashboard/Transactions";
import Settings from "./routes/dashboard/Settings";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  
  const [isAuth, setisAuth] = useState();

  return (
    <BrowserRouter>
    <Navbar isAuth={isAuth}/>
      <Routes>
          <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
        <Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>}></Route>
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
