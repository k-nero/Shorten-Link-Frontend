import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { Spin } from "antd";

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
		}}
		spin
	/>
);

function Loading()
{
	return (
		<div style={{textAlign:"center", height:"50%"}}> <Spin style={{ verticalAlign:"middle", display:"inline-block", marginTop:"20%"}} indicator={antIcon} /> </div>
	);
}
export default Loading;
