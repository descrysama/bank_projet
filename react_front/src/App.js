import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Transactions from "./routes/Transactions";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import { useState } from "react";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
    <Navbar isAuth={isAuth}/>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
        <Route path="" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
