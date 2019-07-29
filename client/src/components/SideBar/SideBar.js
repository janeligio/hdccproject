import React from 'react';
import './SideBar.scss';
import { NavLink } from 'react-router-dom';

const fontSize = {
	fontSize: '2em'
};

const NavigationalLink = (props) => {
	return (
		<li className={props.path === window.location.pathname ? "active" : ""}><NavLink onClick={() => console.log(props.data)} exact to={`${props.path}`} activeClassName="active">{props.title}</NavLink></li>
		);
};



export default function SideBar(props) {
	return (
		  <aside className="sidebar">
		    <nav style={fontSize} className="nav">
		      <ul>
		        <li id="sidebar-header" className="active"><a id="sidebar-header-button" href="/">HDCC Job Sites</a></li>
		        {[
		        	{path:'/',title:'Home',},
		        	{path:'/network',title:'Network',},
		        	{path:'/create',title:'Create',},
		        	{path:'/all',title:'All Sites',},
		        	]
		        	.map(link => (<NavigationalLink key={link.path} path={`${link.path}`} title={`${link.title}`}/>)) 
		        }
		      </ul>
		    </nav>
		  </aside>	
	);
}