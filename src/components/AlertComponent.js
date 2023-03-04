import React from "react";
import PropTypes from "prop-types";

AlertComponent.propTypes = {
	error: PropTypes.string
};

function AlertComponent(props) 
{

	const style = {
		fontFamily: "Inter, sans-serif",
		fontSize: "1.2rem",
		colon: "#ff6a96",
		marginTop: "0.6rem",
		display: "flex",
		alignItems: "center"
	};

	return( props.error ? ( <div style={style}>
		<svg style={{marginRight:"0.4rem"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M11.3163 9.00362C11.8593 10.0175 11.1335 11.25 9.99343 11.25H2.00657C0.866539 11.25 0.140732 10.0175 0.683711 9.00362L4.67714 1.54691C5.24618 0.484362 6.75381 0.484362 7.32286 1.54691L11.3163 9.00362ZM5.06238 4.49805C5.02858 3.95721 5.4581 3.5 6 3.5C6.5419 3.5 6.97142 3.95721 6.93762 4.49805L6.79678 6.75146C6.77049 7.17221 6.42157 7.5 6 7.5C5.57843 7.5 5.22951 7.17221 5.20322 6.75146L5.06238 4.49805ZM6 8C5.44772 8 5 8.44772 5 9C5 9.55229 5.44772 10 6 10C6.55228 10 7 9.55229 7 9C7 8.44772 6.55228 8 6 8Z" fill="#FF6A96"/>
		</svg>
		{props.error}
	</div>) : null);
}

export default AlertComponent;
