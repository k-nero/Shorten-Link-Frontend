import Login from "../User/Login";
import Register from "../User/Register";
import {useEffect, useState} from "react";
import useToken from "../../hook/useToken";
import NavBar from "../../components/NavBar";
import {Button, Input, Table, Tooltip, Space} from "antd";
import { CopyOutlined } from '@ant-design/icons';

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
function Dashboard()
{
    const {token, setToken} = useToken();
    const [data, setData] = useState();

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
        },
        {
            title: 'Original Url',
            dataIndex: 'originalUrl',
            key: 'originalUrl',
            // eslint-disable-next-line react/jsx-no-undef
            render: (text) => (<Space.Compact block>
                <Input
                    style={{
                        width: 'calc(100% - 200px)',
                    }}
                    defaultValue={text}
                />
                <Tooltip title="copy original url">
                    <Button icon={<CopyOutlined />} />
                </Tooltip>
            </Space.Compact>)
        },
        {
            title: 'Short Url',
            dataIndex: 'shortUrl',
            key: 'shortUrl',
            render: (text) => (<Space.Compact block>
                <Input
                    style={{
                        width: 'calc(100% - 200px)',
                    }}
                    defaultValue={text}
                />
                <Tooltip title="copy shorten url">
                    <Button icon={<CopyOutlined />} />
                </Tooltip>
            </Space.Compact>)
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
        }
    ]
    if(!token)
    {
        return (
            <Form setToken={setToken}/>
        );
    }
    return(
        <div>
            <NavBar selectedKeys={["dashboard"]}/>
            <h1>Dashboard</h1>
            <Table rowKey="urlId" style={{maxWidth:"80%", margin:"auto"}} columns={columns} dataSource={data}/>
        </div>
    )
}

export default Dashboard;
