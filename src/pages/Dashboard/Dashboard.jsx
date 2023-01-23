import Login from "../User/Login";
import Register from "../User/Register";
import {useEffect, useState} from "react";
import useToken from "../../hook/useToken";
import NavBar from "../../components/NavBar";
import {Button, Input, Table, Tooltip, Space, Popconfirm, message} from "antd";
import {CopyOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title } = Typography;

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

async function getData(token)
{
    let res = await fetch("http://localhost:5000/api/users/getLinks",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }})
    return res.json()
}

async function deleteLink(token, urlId)
{
    let res = await fetch("http://localhost:5000/api/shortener/deleteLink",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({urlId: urlId})
    })
    return res.json()
}

async function updateLink(token, urlId, description)
{
    let res = await fetch("http://localhost:5000/api/shortener/updateLink",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({urlId: urlId, description: description})
        })
    return res.json()
}
function Dashboard()
{
    const {token, setToken} = useToken();
    const [data, setData] = useState();
    const [time, setTime] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const data = [
                [0, 4, "night"],
                [5, 11, "morning"],          //Store messages in an array
                [12, 17, "afternoon"],
                [18, 24, "night"]
            ],
            hr = new Date().getHours();

        for(let i = 0; i < data.length; i++){
            if(hr >= data[i][0] && hr <= data[i][1]){
                setTime("Good " + data[i][2].toString());
            }
        }
    }, [])

    function handleUpdate()
    {

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
        deleteLink(token, record.urlId).then(res => {
            if(res.status === "success")
            {
                getData(token).then(res => {
                    if(res.status === "success")
                    {
                        setData(res.data.links);
                        messageApi.open({
                            type: 'success',
                            content: 'Deleted successfully',
                        }).then();
                    }
                    else
                    {
                        messageApi.open({
                            type: 'warning',
                            content: 'Error cannot refresh data',
                        }).then();
                    }
                });
            }
            else
            {
                messageApi.open({
                    type: 'error',
                    content: 'Error cannot delete',
                }).then();
            }
        });
    }

    useEffect(() => {
        getData(token).then(res => {
            setData(res.data.links);
        });
    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'description',
            key: 'description',
            // render: (text) => {
            //     return (
            //         <Space.Compact block>
            //             {text}
            //
            //         </Space.Compact>
            //     )
            // }
        },
        {
            title: 'Original Url',
            dataIndex: 'originalUrl',
            key: 'originalUrl',
            render: (text) => {
                return (
                    <Space.Compact block>
                        <Input
                            disabled
                            style={{
                                width: 'calc(100% - 200px)',
                            }}
                            defaultValue={text}
                        />
                        <Tooltip title="Copy original url">
                            <Button icon={<CopyOutlined onClick={() => navigator.clipboard.writeText(text)} />} />
                        </Tooltip>
                    </Space.Compact>
                )
            }
        },
        {
            title: 'Short Url',
            dataIndex: 'shortUrl',
            key: 'shortUrl',
            render: (text) => {
                return(
                    <Space.Compact block>
                        <Input
                            disabled
                            style={{
                                width: 'calc(100% - 200px)',
                            }}
                            defaultValue={text}
                        />
                        <Tooltip title="Copy shorten url">
                            <Button icon={<CopyOutlined onClick={() => navigator.clipboard.writeText(text)} />} />
                        </Tooltip>
                    </Space.Compact>
                )
            }
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return(
                    <Space size="middle">
                        <Tooltip title="Edit record">
                            <Button icon={<EditOutlined />} />
                        </Tooltip>
                        {/*<Tooltip title="Delete record">*/}
                        {/*    <Button style={{color:"red"}} icon={<DeleteOutlined/>} onClick={() => handleDelete(record)}/>*/}
                        {/*</Tooltip>*/}
                        <Popconfirm title={`Are you sure you want to delete ${record.description}?`} onConfirm={() => handleDelete(record)} okText="Yes" cancelText="No">
                            <Tooltip title="Delete record" placement="bottom">
                                <Button style={{color:"red"}} icon={<DeleteOutlined/>}/>
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ]
    if(!token)
    {
        return (
            <Form setToken={setToken}/>
        );
    }
    return(
        <div>
            {contextHolder}
            <NavBar selectedKeys={["dashboard"]}/>
            <div style={{maxWidth:"80%", margin:"auto", marginTop:"32px"}}>
                <Title>{time}, Admin</Title>
                <Table rowKey="urlId" style={{ }} columns={columns} dataSource={data}/>
            </div>
        </div>
    )
}

export default Dashboard;
