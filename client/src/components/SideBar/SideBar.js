import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';


const NavigationalLink = (props) => {
	const [active, toggle] = useState(false);
	return (
		<li className={active ? "active" : ""}><Link to={`${props.path}`} onClick={() => toggle(!active)}>{props.title}</Link></li>
		);
};

export default function SideBar(props) {
	return (
		  <aside className="sidebar">
		    <nav className="nav">
		      <ul>
		        <li className="active"><a href="#">Welcome</a></li>
		      	<NavigationalLink path="/" title="All Sites" />
		      	<li><Link to="/create">Create a Report</Link></li>
		      	{ props.sites.map(site => <NavigationalLink path={`/site/${site._id}`} title={site.name} />)}
		      </ul>
		    </nav>
		  </aside>	
	);
}