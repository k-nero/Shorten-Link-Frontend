import Login from "../User/Login";
import Register from "../User/Register";
import {useState} from "react";
import useToken from "../../hook/useToken";

function Form(props)
{
    const [currentForm, setCurrentForm] = useState('login');
    const [message, setMessage] = useState('');
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
                            currentForm === (props.state || 'login') ? <Login onFormSwitch={toggleForm} setToken={props.setToken} message={message} /> : <Register onFormSwitch={toggleForm} setMessage={setMessage} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
function Dashboard()
{
    const {token, setToken} = useToken();
    if(!token)
    {
        return (
            <Form setToken={setToken}/>
        );
    }
    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard;
