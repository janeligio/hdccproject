import React from 'react';
import axios from 'axios';

class CreateReport extends React.Component {
	state = {};

	render() {
		return (
			<form noValidate onSubmit={this.handleSubmit}>
			<h1>Create a report</h1>
			<label>Job Site Name</label>
			<input type="text" />
			</form>
		);
	}
}

export default CreateReport;