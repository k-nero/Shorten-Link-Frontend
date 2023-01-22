import './Home.css';
import {useState} from "react";
import useToken from "../../hook/useToken";
import NavBar from "../../components/NavBar";

function Home()
{
    const {token} = useToken();
    const [error, setError] = useState("");
    const [linkId, setLinkId] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        originalUrl: undefined,
        description: undefined
    });

    function handleSubmit(event)
    {
        event.preventDefault();
        async function handleFetch()
        {
                setLoading(true);
                fetch('http://localhost:5000/api/shortener/short', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(inputs)
                }).then(res => res.json()).then(res => {
                    setLoading(false);
                    if(res.status === "success")
                    {
                        setLinkId("http://localhost:5000/" + res.data.urlId);
                    }
                    else
                    {
                        setError(res.message);
                    }
                });
        }
        handleFetch().then(() => {});
    }

    function handleChange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    let alerts = undefined;
    if(error)
    {
        alerts = <div className="alert">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3163 9.00362C11.8593 10.0175 11.1335 11.25 9.99343 11.25H2.00657C0.866539 11.25 0.140732 10.0175 0.683711 9.00362L4.67714 1.54691C5.24618 0.484362 6.75381 0.484362 7.32286 1.54691L11.3163 9.00362ZM5.06238 4.49805C5.02858 3.95721 5.4581 3.5 6 3.5C6.5419 3.5 6.97142 3.95721 6.93762 4.49805L6.79678 6.75146C6.77049 7.17221 6.42157 7.5 6 7.5C5.57843 7.5 5.22951 7.17221 5.20322 6.75146L5.06238 4.49805ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55229 5.44772 10 6 10C6.55228 10 7 9.55229 7 9C7 8.44772 6.55228 8 6 8Z" fill="#FF6A96"/>
                    </svg>
                    {error}
                </div>
    }
    return (
        <div>
            <NavBar selectedKeys={["home"]}/>
            <div className="homeContainer">
                <div className="payment">
                    <div className="">
                        <div className="form__detail">
                            <input className="Link" id="shotenLink" type="text" placeholder="" value={linkId} readOnly={true}/>
                            <button className="btn btn--primary" onClick={() => navigator.clipboard.writeText(linkId)}>Copy</button>
                        </div>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Generate shorten link</h2>
                        <div className="form__name form__detail">
                            <label htmlFor="name">Original link</label>
                            <ion-icon name="person-outline"></ion-icon>
                            <textarea className="Link" placeholder="https://www.google.com" name="originalUrl" value={inputs.originalUrl} onChange={handleChange}/>
                            {alerts ? alerts : ""}
                        </div>
                        <div className="form__number form__detail">
                            <label htmlFor="text">Name</label>
                            <ion-icon name="card-outline"></ion-icon>
                            <textarea className="Link" placeholder="Google search" name="description" value={inputs.description} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="btn btn--primary" id="generateBut">{loading ?  <div className="load"></div> : "Generate"}
                        </button>
                    </form>
                    <div className="payment__shadow-dots"></div>
                    <div className="payment__dots">
                        <svg width="65" height="115" viewBox="0 0 65 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="17.5" cy="2.5" r="2.5" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="2.5" r="2.5" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="2.5" r="2.5" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="2.5" r="2.5" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="12.5" r="2.5" transform="rotate(90 17.5 12.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="12.5" r="2.5" transform="rotate(90 32.5 12.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="12.5" r="2.5" transform="rotate(90 47.5 12.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="42.5" r="2.5" transform="rotate(90 17.5 42.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="62.5" r="2.5" transform="rotate(90 47.5 62.5)" fill="#E0ECF7"/>
                            <circle cx="62.5" cy="2.5" r="2.5" transform="rotate(90 62.5 2.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="82.5" r="2.5" transform="rotate(90 47.5 82.5)" fill="#E0ECF7"/>
                            <circle cx="62.5" cy="22.5" r="2.5" transform="rotate(90 62.5 22.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="42.5" r="2.5" transform="rotate(90 47.5 42.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="42.5" r="2.5" transform="rotate(90 32.5 42.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="62.5" r="2.5" transform="rotate(90 32.5 62.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="22.5" r="2.5" transform="rotate(90 17.5 22.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="22.5" r="2.5" transform="rotate(90 32.5 22.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="22.5" r="2.5" transform="rotate(90 47.5 22.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="52.5" r="2.5" transform="rotate(90 17.5 52.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="72.5" r="2.5" transform="rotate(90 17.5 72.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="72.5" r="2.5" transform="rotate(90 47.5 72.5)" fill="#E0ECF7"/>
                            <circle cx="62.5" cy="12.5" r="2.5" transform="rotate(90 62.5 12.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="92.5" r="2.5" transform="rotate(90 47.5 92.5)" fill="#E0ECF7"/>
                            <circle cx="62.5" cy="32.5" r="2.5" transform="rotate(90 62.5 32.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="52.5" r="2.5" transform="rotate(90 47.5 52.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="52.5" r="2.5" transform="rotate(90 32.5 52.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="32.5" r="2.5" transform="rotate(90 17.5 32.5)" fill="#E0ECF7"/>
                            <circle cx="32.5" cy="32.5" r="2.5" transform="rotate(90 32.5 32.5)" fill="#E0ECF7"/>
                            <circle cx="47.5" cy="32.5" r="2.5" transform="rotate(90 47.5 32.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="62.5" r="2.5" transform="rotate(90 17.5 62.5)" fill="#E0ECF7"/>
                            <circle cx="17.5" cy="82.5" r="2.5" transform="rotate(90 17.5 82.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="92.5" r="2.5" transform="rotate(90 2.5 92.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="112.5" r="2.5" transform="rotate(90 2.5 112.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="72.5" r="2.5" transform="rotate(90 2.5 72.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="82.5" r="2.5" transform="rotate(90 2.5 82.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="102.5" r="2.5" transform="rotate(90 2.5 102.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="12.5" r="2.5" transform="rotate(90 2.5 12.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="42.5" r="2.5" transform="rotate(90 2.5 42.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="22.5" r="2.5" transform="rotate(90 2.5 22.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="52.5" r="2.5" transform="rotate(90 2.5 52.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="32.5" r="2.5" transform="rotate(90 2.5 32.5)" fill="#E0ECF7"/>
                            <circle cx="2.5" cy="62.5" r="2.5" transform="rotate(90 2.5 62.5)" fill="#E0ECF7"/>
                        </svg>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Home;
