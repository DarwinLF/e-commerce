import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
import Layout from "./components/layout";
import Home from "./components/home";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }  
  />
}

function PublicRoute({component: Component, isAuthenticated, restricted, ...rest}) {
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && restricted ? (
        <Redirect to="/home" />
      ) : (
        <Component {...props} />
      )
    }  
  />
}

function App() {
  const isAuthenticated = false;

  <Router>
      <Switch>
        <PublicRoute
          restricted={false}
          isAuthenticated={isAuthenticated}
          component={LoginForm}
          path="/login"
          exact
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          component={Dashboard}
          path="/home"
          exact
        />
      </Switch>
    </Router>
}

export default App;
