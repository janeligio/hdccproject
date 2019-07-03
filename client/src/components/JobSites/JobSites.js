import React from 'react';
import { Link } from  'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './JobSites.css';
import JobSite from './JobSiteSingleton/JobSite';




class JobSites extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsites: []
		};
	}

	componentDidMount() {
	    axios
	      .get('/api/reports')
	      .then(res => this.setState({jobsites: res.data}))
	      .catch(err => console.log(err));
	}


	render() {
	   const jobSites = this.state.jobsites.map((jobsite) => {
      		return <JobSite key={jobsite._id} data={jobsite}/>
    	});
		return (
        {jobSites}
      );
	}
}




export default JobSites;