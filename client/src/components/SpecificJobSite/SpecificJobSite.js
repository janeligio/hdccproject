import React, { useState } from 'react';
import axios from 'axios';
import JobSite from '../JobSites/JobSiteSingleton/JobSite';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class SpecificJobSite extends React.Component {

	state = {
		data: null,
	}

	componentDidUpdate(prevProps){
		if(this.props.match.params !== prevProps.match.params){
			const {id} = this.props.match.params;
			const url = `/api/reports/find/${id}`;
			axios
				.get(url)
				.then(res => {this.setState({data: res.data})})
				.catch(err => console.log(err))
				;
		}
	}
	componentDidMount() {
		const {id} = this.props.match.params;
		const url = `/api/reports/find/${id}`;
		axios
			.get(url)
			.then(res => {this.setState({data: res.data, notFound: false})})
			.catch(err => this.setState({notFound: true}) )
			;

	}
	render() {
		const data = this.state.data ||
			{
				wirelessRouters: [],
				switches: [],
				equipmentName: '',
				modem: {},
				router: {}
			};
		return (
			this.state.notFound ? <NotFoundPage /> : <JobSite data={data}/> 
		);
	}
}


function NotFoundPage(props) {
  return (
        <Typography style={{
        	padding: '0.5em',
        }} variant="h3" component="h1">404 Not Found</Typography>
  	);
}

export default SpecificJobSite;