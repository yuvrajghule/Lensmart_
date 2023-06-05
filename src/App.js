import './App.css';
import LoginPage from "./Components/LoginPage"
import PrivatRoute from "./Components/PrivatRoute"
import Product from "./Components/Product"
import Home from "./Components/Home"
import Cart from "./Components/Cart"
import Orders from "./Components/Orders"
import RegisterPage from "./Components/RegisterPage"


import {Routes, Route} from "react-router-dom";
import NavBar from './Components/NavBar';
import { useState } from 'react';

function App() {
  const [Auth, setAuth]=useState(false);
  const [cart, setcart]=useState([]);
  const [order, setorder]=useState([]);

  const changeLog=()=>{
    setAuth(true)
  }
  const Logout=()=>{
    setAuth(false)
  }
  
  return (
      <Routes>
        <Route element={<PrivatRoute Auth={Auth}/>} >
        <Route path="home" element={<Home Logout={Logout} cart={cart} setcart={setcart}/>} />
        <Route path="cart" element={<Cart cart={cart} order={order} setorder={setorder} setcart={setcart}/>} />
        <Route path="orders" element={<Orders  order={order} setcart={setcart} />} />
      </Route>

      {/* <Route element={<PrivatRouteForAdmin Auth={Auth}/>} >
        <Route path="home" element={<AHome Logout={Logout} cart={cart} setcart={setcart}/>} />
        <Route path="cart" element={<Aorders cart={cart} order={order} setorder={setorder} setcart={setcart}/>} />
        <Route path="orders" element={<Orders  order={order} setcart={setcart} />} />
      </Route> */}

        <Route path="/" element={<LoginPage Auth={Auth} changeLog={changeLog}/>}/>
        <Route path="register" element={<RegisterPage />} />
      </Routes>
   
  );
}

export default App;
