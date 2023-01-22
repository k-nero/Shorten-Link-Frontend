import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";

function App()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            {/*<Route path="/user" element={<Form setToken={setToken} />} />*/}
        </Routes>
    );
}

export default App;
