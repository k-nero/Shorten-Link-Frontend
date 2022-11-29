import "./style.css";
import {useEffect, useState} from "react";
import effect from "./effect";

function Login()
{
    const[display, setDisplay] = useState("none");
    const[state, setState] = useState("Sign in");
    const[changestate, setChangestate] = useState("Sign up");
    const[messages, setMessages] = useState("");

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        effect();
    }, []);

    const handleClick = (event) => {
        if(state === "Sign up")
        {
            setDisplay("none");
            setState("Sign in");
            setChangestate("Sign up");
        }
        else
        {
            setDisplay("");
            setState("Sign up");
            setChangestate("Sign in");
        }
    }

    const handleSubmit = (event) =>
    {
        if(inputs.confirmPassword !== inputs.password)
        {
            setMessages("Passwords do not match");
        }
    }
    return(
        <div>
            <img className="wave" src="/images/wave.png" alt=""/>
            <div className="container">
                <div className="img"></div>
                <div className="login-content">
                    <form onSubmit={handleSubmit}>
                        <embed type="" src="/images/kylin.svg"/>
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <h5>Username</h5>
                                <input autoComplete="false" type="text" className="input" name="username" value={inputs.username || ""} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="input-div one" style={{display:display}}>
                            <div className="i">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className="div">
                                <h5>Email</h5>
                                <input autoComplete="false" type="text" className="input" name="email" value={inputs.email || ""} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5>Password</h5>
                                <input autoComplete="true" type="password" className="input" name="password" value={inputs.password || ""} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="input-div pass" style={{display:display}}>
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5>Re-Enter Password</h5>
                                <input autoComplete="false" type="password" className="input" name="confirmPassword" value={inputs.confirmPassword || ""} onChange={handleChange}/>
                            </div>
                        </div>
                        <a >Forgot Password?</a>
                        <a href="#" onClick={handleClick}>{changestate}</a>
                        <input type="submit" className="btn" value={state}/>
                        <p className="messages">{messages}</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
