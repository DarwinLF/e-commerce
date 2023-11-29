import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from "./components/layout";
import Home from "./components/home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Product from "./components/Product/product";
import Cart from "./components/Cart/Cart";

function App() {
  //const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Product' element={<Product/>}/>
          <Route path='/Cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );


  
}

export default App;
