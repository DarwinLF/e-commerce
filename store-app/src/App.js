import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from "./components/layout";
import Home from "./components/home";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index path='/' element={<Home/>}/>
            <Route index path='/Login' element={<Login setToken={setToken}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    );
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/preferences' element={<Preferences/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
