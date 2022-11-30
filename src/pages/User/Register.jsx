import "./style.css";
import {useEffect, useState} from "react";
import effect from "./effect";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Login(props)
{
    let navigate = useNavigate();

    useEffect(() => {
        effect();
    }, []);

    const [inputs, setInputs] = useState({
        confirmPassword: null,
        email: null,
        password: null,
        username: null,
        phone: null
    });
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    const handleSubmit = () => {

        if (inputs.confirmPassword === inputs.password)
        {
            async function handleFetch()
            {
                setLoading(true);
                await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputs)
                }).then(res => res.json()).then(data => {
                    setLoading(false);
                    if(data.status === "success")
                    {
                        return navigate('/user', {replace: true});
                    }
                    else
                    {
                        setError(data.message);
                    }
                });
            }
            handleFetch().then(() => {
            });
        }
        else
        {
            setError("Passwords do not match");
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    if (loading)
    {
        return <div>Loading...</div>
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
                    <input autoComplete="false" type="text" className="input" name="username" value={inputs.username} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-div one">
                <div className="i">
                    <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="div">
                    <h5>Email</h5>
                    <input autoComplete="false" type="text" className="input" name="email" value={inputs.email} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-div one">
                <div className="i">
                    <i className="fa-regular fa-phone"></i>
                </div>
                <div className="div">
                    <h5>Phone</h5>
                    <input autoComplete="false" type="text" className="input" name="phone" value={inputs.phone} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-div pass">
                <div className="i">
                    <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                    <h5>Password</h5>
                    <input autoComplete="true" type="password" className="input" name="password" value={inputs.password} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-div pass">
                <div className="i">
                    <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                    <h5>Re-Enter Password</h5>
                    <input autoComplete="false" type="password" className="input" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange}/>
                </div>
            </div>
            <Link to={"/login"}>Already have an account?</Link>
            <a href="#" onClick={() => props.onFormSwitch("login")}>Sign in</a>
            <input type="submit" className="btn" value="Sign up"/>
            <p className="messages">{error}</p>
        </form>
    );
}

export default Login;
