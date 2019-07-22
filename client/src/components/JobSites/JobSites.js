import React from 'react';
import { Link } from  'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './JobSites.css';
import JobSite from './JobSiteSingleton/JobSite';
import ReactToPrint from 'react-to-print';


class JobSites extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsites: []
		};
	}
	componentDidUpdate(prevProps) {
	    axios
	      .get('/api/reports')
	      .then(res => this.setState({jobsites: res.data}))
	      .catch(err => console.log(err));
	}
	componentDidMount() {
	    axios
	      .get('/api/reports')
	      .then(res => this.setState({jobsites: res.data}))
	      .catch(err => console.log(err));
	}


	render() {

		return (
		<div>
			<ReactToPrint
	          trigger={() => <a href="#">Print this out!</a>}
	          content={() => this.componentRef}
	        />
			<div ref={el => (this.componentRef = el)}>
	        {
	        	this.state.jobsites.map(jobsite => (
	          		<JobSite data={jobsite} />
	            ))
	    	}
	    	</div>
    	</div>
      );
	}
}




export default JobSites;