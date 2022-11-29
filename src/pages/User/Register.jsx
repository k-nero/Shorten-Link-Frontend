import "./style.css";
import {useEffect, useState} from "react";
import effect from "./effect";
import {Link} from "react-router-dom";

function Login(props)
{
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        effect();
    }, []);

    async function handleFetch()
    {
        let res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then(res => res.json());
        return (res);
    }

    const handleSubmit = (event) => {
        if (inputs.confirmPassword !== inputs.password)
        {
            const registerData = handleFetch();
            if(registerData.status === "success")
            {
                props.history.push('/login');
                console.log(registerData);
            }
        }
    }

    return (
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
            <div className="input-div one">
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
            <div className="input-div pass">
                <div className="i">
                    <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                    <h5>Re-Enter Password</h5>
                    <input autoComplete="false" type="password" className="input" name="confirmPassword" value={inputs.confirmPassword || ""} onChange={handleChange}/>
                </div>
            </div>
            <Link to={"/login"}>Already have an account?</Link>
            <a href="#" onClick={() => props.onFormSwitch("login")}>Sign in</a>
            <input type="submit" className="btn" value="Sign up"/>
            <p className="messages"></p>
        </form>
    );
}

export default Login;
