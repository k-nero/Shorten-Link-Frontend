import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";

function getUserToken()
{
    const tokenString = sessionStorage.getItem('token');
    return  JSON.parse(tokenString);
}

function setUserToken(token)
{
    sessionStorage.setItem('token', JSON.stringify(token));
}

function App()
{
  return (
        <Routes>
          <Route path="/" element={<Home getToken={getUserToken} />} />
          <Route path="/dashboard" element={<Dashboard setToken={setUserToken} getToken={getUserToken} />} />
          {/*<Route path="/user" element={<Form setToken={setToken} />} />*/}
        </Routes>
  );
}

export default App;
