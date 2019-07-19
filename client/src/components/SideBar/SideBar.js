import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const fontSize = {
	fontSize: '2em'
};

const NavigationalLink = (props) => {
	const [active, toggle] = useState(false);
	return (
		<li className={props.path === window.location.pathname ? "active" : ""}><NavLink onClick={() => console.log(props.data)} exact to={`${props.path}`} activeClassName="active">{props.title}</NavLink></li>
		);
};



export default function SideBar(props) {
	return (
		  <aside className="sidebar">
		    <nav style={fontSize} className="nav">
		      <ul>
		        <li id="sidebar-header" className="active"><a>HDCC Job Sites</a></li>
		      	<NavigationalLink  path="/" title="All Sites" />
		      	<NavigationalLink  path="/create" title="Create a Report" />
		      	<NavigationalLink  path="/network" title="Network" />
		      	{ props.sites.map(site => <NavigationalLink key={site._id} path={`/site/${site._id}`} title={site.name} />)}
		      </ul>
		    </nav>
		  </aside>	
	);
}