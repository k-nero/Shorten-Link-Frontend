import "./style.css";
import {useEffect} from "react";
import effect from "./effect";

function Login()
{
    useEffect(() => {
        effect();
    }, []);

    return(
        <div>
            <img className="wave" src="/images/wave.png" alt=""/>
            <div className="container">
                <div className="img"></div>
                <div className="login-content">
                    <form>
                        <embed type="" src="/images/kylin.svg"/>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5>Username</h5>
                                    <input autoComplete="true" type="text" className="input" name="username"/>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Password</h5>
                                    <input autoComplete="true" type="password" className="input" name="password"/>
                                </div>
                            </div>
                            <a href="#">Forgot Password?</a>
                            <a href="/sign-up">Sign up</a>
                            <input type="submit" className="btn" value="Login"/>
                            <p className="messages"></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
