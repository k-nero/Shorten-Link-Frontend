import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import React, {useState} from "react";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/dashboard" element={<Dashboard />} />*/}
          <Route path="/user" element={<Form />} />
        </Routes>
      </BrowserRouter>
  );
}

function Form() {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

   return(
       <div>
           <img className="wave" src="/images/wave.png" alt=""/>
           <div className="container">
               <div className="img"></div>
               <div className="login-content">
         <div>
             {
                 currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
             }
         </div>
               </div>
           </div>
       </div>
   )
}
export default App;
