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
		        {[
		        	{path:'/',title:'Home',},
		        	{path:'/network',title:'Network',},
		        	{path:'/create',title:'Create a Report',},
		        	{path:'/all',title:'All Sites',},
		        	]
		        	.map(link => (<NavigationalLink path={`${link.path}`} title={`${link.title}`}/>)) 
		        }
		      </ul>
		    </nav>
		  </aside>	
	);
}