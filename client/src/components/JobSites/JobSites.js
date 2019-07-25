import React from 'react';
import { Link } from  'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './JobSites.css';
import JobSiteGrid from './JobSiteSingleton/JobSiteGrid';
import ReactToPrint from 'react-to-print';


class JobSites extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobsites: []
		};
	}
	componentDidUpdate(prevProps) {
	    // axios
	    //   .get('/api/reports')
	    //   .then(res => this.setState({jobsites: res.data}))
	    //   .catch(err => console.log(err));
	}
	componentDidMount() {
	    // axios
	    //   .get('/api/reports')
	    //   .then(res => this.setState({jobsites: res.data}))
	    //   .catch(err => console.log(err));
	}


	render() {

		return (
	    	<JobSiteGrid sites={this.props.jobsites}/>
      );
	}
}




export default JobSites;