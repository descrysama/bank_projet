import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./routes/Accueil";
import Transactions from "./routes/Transactions";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";

function App() {


  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Accueil />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
