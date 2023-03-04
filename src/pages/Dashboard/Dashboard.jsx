import Login from "../User/Login";
import React from "react";
import Register from "../User/Register";
import {useEffect, useRef, useState} from "react";
import useToken from "../../hook/useToken";
import NavBar from "../../components/NavBar";
import {Button, Input, Table, Tooltip, Space, Popconfirm, message, Modal, Form} from "antd";
import {CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import { Typography } from "antd";
import Highlighter from "react-highlight-words";
import toCapitalizeFirstLetter from "../../Util/capitalizeFirstLetter";
import Loading from "../../components/Loading";
import PropTypes from "prop-types";
import fetchJson from "../../Util/fetchJson";
const { Title } = Typography;

UserForm.propTypes = {
	state: PropTypes.string,
	setToken: PropTypes.func.isRequired
};

function UserForm(props)
{
	const [currentForm, setCurrentForm] = useState("login");
	const [message, setMessage] = useState("");
	const toggleForm = (formName) =>
	{
		setCurrentForm(formName);
	};

	return(
		<div>
			<img className="wave" src="/images/wave.png" alt=""/>
			<div className="container">
				<div className="img"></div>
				<div className="login-content">
					<div>
						{
							currentForm === (props.state || "login") ? <Login onFormSwitch={toggleForm} setToken={props.setToken} message={message} /> : <Register onFormSwitch={toggleForm} setMessage={setMessage} />
						}
					</div>
				</div>
			</div>
		</div>
	);
}

function Dashboard()
{
	const {token, setToken} = useToken();
	const [data, setData] = useState();
	const [time, setTime] = useState("");
	const [messageApi, contextHolder] = message.useMessage();
	const [isVisible, setIsVisible] = useState(false);
	const [isGetDataLoading, setIsGetDataLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [isUpdateLoading, setIsUpdateLoading] = useState(false);
	const [inputValue, setInputValue] = useState({
		newName: "",
		newDesUrl: ""
	});
	const [record, setRecord] = useState();

	async function getData(token)
	{
		try
		{
			setIsGetDataLoading(true);
			let res = await fetchJson("http://localhost:5000/api/users/getLinks", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
			});
			setIsGetDataLoading(false);
			return res.json();
		}
		catch (e)
		{
			setIsGetDataLoading(false);
			messageApi.open({
				type: "error",
				content: "Error request timeout",
			});
		}
	}

	async function deleteLink(token, urlId)
	{
		try
		{
			setIsDeleteLoading(true);
			let res = await fetchJson("http://localhost:5000/api/users/deleteLink", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
				body: JSON.stringify({urlId: urlId})
			});
			setIsDeleteLoading(false);
			return res.json();
		}
		catch (e)
		{
			setIsDeleteLoading(false);
			messageApi.open({
				type: "error",
				content: "Error request timeout",
			});
		}
	}

	async function updateLink(token, urlId, description, originalUrl)
	{
		try
		{
			setIsUpdateLoading(true);
			let res = await fetchJson("http://localhost:5000/api/users/updateLink", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
				body: JSON.stringify({urlId: urlId, description: description, originalUrl: originalUrl})
			});
			setIsUpdateLoading(false);
			return res.json();
		}
		catch (e)
		{
			setIsUpdateLoading(false);
			messageApi.open({
				type: "error",
				content: "Error request timeout",
			});
		}
	}

	useEffect(() =>
	{
		const data = [
				[0, 4, "night"],
				[5, 11, "morning"],          //Store messages in an array
				[12, 17, "afternoon"],
				[18, 24, "night"]
			],
			hr = new Date().getHours();

		for(let i = 0; i < data.length; i++)
		{
			if(hr >= data[i][0] && hr <= data[i][1])
			{
				setTime("Good " + data[i][2].toString());
			}
		}
	}, []);

	function onEditingRecord(record)
	{
		setIsVisible(true);
		setRecord({...record});
	}

	const handleChange = (event) =>
	{
		const name = event.target.name;
		const value = event.target.value;
		setInputValue((values) => {return {...values, [name]: value};});
	};

	function handleUpdate(record)
	{
		updateLink(token, record.urlId, inputValue.newName, inputValue.newDesUrl).then((res) =>
		{
			if(res.status === "success")
			{
				getData(token).then((res) =>
				{
					if(res.status === "success")
					{
						setData(res.data.links);
						messageApi.open({
							type: "success",
							content: "Updated successfully",
						}).then();
					}
					else
					{
						messageApi.open({
							type: "warning",
							content: "Warning, Something went wrong",
						}).then();
					}
				});
			}
			else
			{
				messageApi.open({
					type: "error",
					content: "Error cannot update",
				}).then();
			}
		});
	}

	function handleDelete(record)
	{
		// Modal.confirm({
		//     title: 'Are you sure you want to delete this record?',
		//     content: 'This action cannot be undone',
		//     okText: 'Yes',
		//     okType: 'danger',
		//     cancelText: 'No',
		//     onOk() {
		//         deleteLink(token, record.urlId).then(res => {
		//             if(res.status === "success")
		//             {
		//                 getData(token).then(res => {
		//                     setData(res.data.links);
		//                 });
		//             }
		//         });
		//     }
		// });
		deleteLink(token, record.urlId).then((res) =>
		{
			if(res.status === "success")
			{
				getData(token).then((res) =>
				{
					if(res.status === "success")
					{
						setData(res.data.links);
						messageApi.open({
							type: "success",
							content: "Deleted successfully",
						}).then();
					}
					else
					{
						messageApi.open({
							type: "warning",
							content: "Warning, Something went wrong",
						}).then();
					}
				});
			}
			else
			{
				messageApi.open({
					type: "error",
					content: "Error cannot delete",
				}).then();
			}
		});
	}

	useEffect(() =>
	{
		if(token === null)
		{
			return;
		}
		getData(token).then((res) =>
		{
			setData(res.data.links);
		});
	}, [token]);

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);
	function handleSearch(selectedKeys, confirm, dataIndex)
	{
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}
	function handleReset(clearFilters)
	{
		clearFilters();
		setSearchText("");
	}
	const getColumnSearchProps = (dataIndex) =>
	{
		return {
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) =>
			{
				return (
					<div style={{padding: 8,}} onKeyDown={(e) => {return e.stopPropagation();}}>
						<Input
							ref={searchInput}
							placeholder={`Search ${ dataIndex }`}
							value={selectedKeys[0]}
							onChange={(e) => {return setSelectedKeys(e.target.value ? [e.target.value] : []);}}
							onPressEnter={() => {return handleSearch(selectedKeys, confirm, dataIndex);}}
							style={{
								marginBottom: 8,
								display: "block",
							}}
						/>
						<Space>
							<Button
								type="primary"
								onClick={() => {return handleSearch(selectedKeys, confirm, dataIndex);}}
								icon={<SearchOutlined />}
								size="small"
								style={{
									width: 90,
								}}
							>
                        Search
							</Button>
							<Button
								onClick={() => {return clearFilters && handleReset(clearFilters);}}
								size="small"
								style={{
									width: 90,
								}}
							>
                        Reset
							</Button>
							<Button
								type="link"
								size="small"
								onClick={() =>
								{
									confirm({
										closeDropdown: false,
									});
									setSearchText(selectedKeys[0]);
									setSearchedColumn(dataIndex);
								}}
							>
                        Filter
							</Button>
							<Button
								type="link"
								size="small"
								onClick={() =>
								{
									close();
								}}
							>
                        close
							</Button>
						</Space>
					</div>
				);
			},
			filterIcon: (filtered) =>
			{
				return (
					<SearchOutlined
						style={{
							color: filtered ? "#1890ff" : undefined,
						}}
					/>
				);
			},
			onFilter: (value, record) =>
			{return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());},
			onFilterDropdownOpenChange: (visible) =>
			{
				if (visible)
				{
					setTimeout(() => {return searchInput.current?.select();}, 100);
				}
			},
			render: (text) =>
			{
				return searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{
							backgroundColor: "#ffc069",
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text ? text.toString() : ""}
					/>
				) : (
					text
				);
			},
		};
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "description",
			key: "description",
			// render: (text) => {
			//     return (
			//         <Space.Compact block>
			//             {text}
			//
			//         </Space.Compact>
			//     )
			// }
			...getColumnSearchProps("description"),
		},
		{
			title: "Original Url",
			dataIndex: "originalUrl",
			key: "originalUrl",
			render: (text) =>
			{
				return (
					<Space.Compact block>
						<Input disabled style={{width: "calc(100% - 200px)",}} defaultValue={text}/>
						<Tooltip title="Copy original url">
							<Button icon={<CopyOutlined onClick={() => {return navigator.clipboard.writeText(text);}} />} />
						</Tooltip>
					</Space.Compact>
				);
			}
		},
		{
			title: "Short Url",
			dataIndex: "shortUrl",
			key: "shortUrl",
			render: (text) =>
			{
				return(
					<Space.Compact block>
						<Input disabled style={{width: "calc(100% - 200px)",}} defaultValue={text}/>
						<Tooltip title="Copy shorten url">
							<Button icon={<CopyOutlined onClick={() => {return navigator.clipboard.writeText(text);}} />} />
						</Tooltip>
					</Space.Compact>
				);
			}
		},
		{
			title: "Clicks",
			dataIndex: "clicks",
			key: "clicks",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) =>
			{
				return(
					<Space size="middle">
						<Tooltip title="Edit record">
							{isUpdateLoading ? <Loading/> : <Button onClick={() => {return onEditingRecord(record);}} icon={<EditOutlined />} />}
						</Tooltip>
						{/*<Tooltip title="Delete record">*/}
						{/*    <Button style={{color:"red"}} icon={<DeleteOutlined/>} onClick={() => handleDelete(record)}/>*/}
						{/*</Tooltip>*/}
						<Popconfirm title={`Are you sure you want to delete ${ record.description }?`} onConfirm={() => {return handleDelete(record);}} okText="Yes" cancelText="No">
							<Tooltip title="Delete record" placement="bottom">
								{isDeleteLoading ? <Loading/> : <Button style={{color:"red"}} icon={<DeleteOutlined/>}/>}
							</Tooltip>
						</Popconfirm>
					</Space>
				);
			}
		},
	];
	let table =  (<div style={{maxWidth:"80%", margin:"auto", marginTop:"32px"}}>
		<Title>{time}, {toCapitalizeFirstLetter(localStorage.getItem("userInfo"))}</Title>
		{isGetDataLoading ? <Loading/> : <Table rowKey="urlId" style={{ }} columns={columns} dataSource={data}/>}
	</div>);

	let loginForm = (<UserForm setToken={setToken}/>);

	return(
		<div>
			{contextHolder}
			<NavBar selectedKeys={["dashboard"]}/>
			{token ? table : loginForm}
			<Modal title="Edit record" open={isVisible} okText="Save" onCancel={() => {return setIsVisible(false);}} onOk={() => {setIsVisible(false); handleUpdate(record);}}>
				<Form style={{width:"100%"}}>
					<Form.Item>
						<Input placeholder="Name" key={record?.description} defaultValue={record?.description} name="newName" onChange={handleChange}/>
					</Form.Item>
					<Form.Item>
						<Input placeholder="Original Url" key={record?.originalUrl} defaultValue={record?.originalUrl} name="newDesUrl" onChange={handleChange}/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default Dashboard;
