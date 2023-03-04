import "./Home.css";
import {useState} from "react";
import useToken from "../../hook/useToken";
import NavBar from "../../components/NavBar";
import AlertComponent from "../../components/AlertComponent";
import React from "react";

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
			fetch("http://localhost:5000/api/shortener/short", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
				body: JSON.stringify(inputs)
			}).then((res) => {return res.json();}).then((res) => 
			{
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
		setInputs((values) => {return {...values, [name]: value};});
	}

	return (
		<div>
			<NavBar selectedKeys={["home"]}/>
			<div className="homeContainer">
				<div className="payment">
					<div className="">
						<div className="form__detail">
							<input className="Link" id="shotenLink" type="text" placeholder="" value={linkId} readOnly={true}/>
							<button className="btn btn--primary" onClick={() => {return navigator.clipboard.writeText(linkId);}}>Copy</button>
						</div>
					</div>
					<form className="form" onSubmit={handleSubmit}>
						<h2>Generate shorten link</h2>
						<div className="form__name form__detail">
							<label htmlFor="name">Original link</label>
							<ion-icon name="person-outline"></ion-icon>
							<textarea className="Link" placeholder="https://www.google.com" name="originalUrl" value={inputs.originalUrl} onChange={handleChange}/>
							<AlertComponent error={error}/>
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
