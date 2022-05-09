import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Transactions from "./routes/dashboard/Transactions";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";


function App() {

  return (
    <BrowserRouter>
    <Navbar isAuth={true}/>
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
