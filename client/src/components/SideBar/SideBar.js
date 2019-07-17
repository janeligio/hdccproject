import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';

const fontSize = {
	fontSize: '2em'
};

const NavigationalLink = (props) => {
	const [active, toggle] = useState(false);
	return (
		<li className={active ? "active" : ""}><Link to={`${props.path}`} onClick={() => toggle(!active)}>{props.title}</Link></li>
		);
};



export default function SideBar(props) {
	return (
		  <aside className="sidebar">
		    <nav style={fontSize} className="nav">
		      <ul>
		        <li className="active"><a>Welcome</a></li>
		      	<NavigationalLink path="/" title="All Sites" />
		      	<li><Link to="/create">Create a Report</Link></li>
		      	{ props.sites.map(site => <NavigationalLink key={site._id} path={`/site/${site._id}`} title={site.name} />)}
		      </ul>
		    </nav>
		  </aside>	
	);
}