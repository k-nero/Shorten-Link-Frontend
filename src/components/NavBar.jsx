import {Avatar, Menu} from "antd";
import {Link} from "react-router-dom";
import useToken from "../hook/useToken";
import {useEffect, useState} from "react";
import React from "react";
import PropTypes from "prop-types";
import fetchJson from "../Util/fetchJson";

NavBar.propTypes = {
	selectedKeys: PropTypes.array.isRequired
};

async function fetchUserInfo(token)
{
	try
	{
		let res = await fetchJson("http://localhost:5000/api/users/getUserInfo", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": "Bearer " + token,
			}
		});
		return res.json();
	}
	catch (e)
	{

	}
}
function NavBar(props)
{
	const [userInfo, setUserInfo] = useState({});
	const {token} = useToken();
	useEffect(() =>
	{
		if(!token)
		{
			return;
		}
		fetchUserInfo(token).then((res) =>
		{
			if(res.error)
			{
				localStorage.removeItem("token");
				window.location.reload();
			}
			if(localStorage.getItem("userInfo") !== res.data.username)
			{
				localStorage.setItem("userInfo", res.data.username);
			}
			setUserInfo(res.data.username.charAt(0).toUpperCase());
		});
	}, [token]);

	function handleClick()
	{
		localStorage.removeItem("token");
		window.location.reload();
	}
	return(
		<div className="navBar" style={{maxWidth:"80%", margin:"auto", display: "flex"}}>
			<Menu mode="horizontal" style={{minWidth:"800px"}}  defaultSelectedKeys={props.selectedKeys} items={
				[
					{
						label: <Link to={"/"}>Home</Link>,
						key: "home"
					},
					{
						label: <Link to={"/dashboard"}>Dashboard</Link>,
						key: "dashboard"
					},
					{
						label: "Contact",
						key: "contact"
					}
				]
			}></Menu>
			<Menu
				mode={"horizontal"}
				style={{alignSelf:"center", marginLeft:"auto"}}
				items={
					[
						{
							label: <Avatar>{userInfo.toString()}</Avatar>,
							key: "user",
							children: [
								{
									label: "Profile",
									key: "profile"
								},
								{
									label: "Dashboard",
									key: "dashboard",
								},
								{
									label: "Logout",
									key: "logout",
									onClick: handleClick
								}
							]
						}
					]
				}
			></Menu>
		</div>
	);
}

export default NavBar;
