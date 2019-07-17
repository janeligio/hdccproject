import React from 'react';
import axios from 'axios';
import JobSite from '../JobSites/JobSiteSingleton/JobSite';

class SpecificJobSite extends React.Component {

	state = {
		data: null
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
			.then(res => {this.setState({data: res.data})})
			.catch(err => console.log(err))
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
			<JobSite data={data} />
		);
	}
}


export default SpecificJobSite;