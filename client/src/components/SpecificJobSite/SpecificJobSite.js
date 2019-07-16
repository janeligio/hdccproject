import React from 'react';

class SpecificJobSite extends React.Component {

	state = {
		data: {},
		test: ""
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		const url = `/api/sites/${id}`;
		this.setState({test: id});
		console.log(url);
	}
	render() {
		return (
			<div>test {this.state.test} </div>
		);
	}
}

export default SpecificJobSite;