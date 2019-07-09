import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './CreateReport.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EquipmentFieldset from './EquipmentFieldset';
import { Link } from 'react-router-dom';

class CreateReport extends React.Component {
	state = {
		date: moment(Date.now()),	
	};
	addWirelessRouter = (event) => {
		ReactDOM.render(<div>hello</div>, document.getElementById('additional-routers'));
	}
	addSwitch = (event) => {

	}
	render() {
		return (
			<div>
			<form id="create-form-container" noValidate onSubmit={this.handleSubmit}>
			<h1 className="create-form-header">Create a Report</h1>
			<fieldset>
				<label>Name of Jobsite</label>
			<input 
                name="site" 
                value={ this.state.site } 
                onChange={ this.handleChange } 
                placeholder="required" 
                type="text" 
                tabIndex="1" 
                autoFocus/>
			</fieldset>
			<fieldset>

			<label>Date</label>
			<input 
                name="date" 
                value={ this.state.date.format("dddd, MMMM Do YYYY") } 
                onChange={ this.handleChange } 
                placeholder={moment().format("dddd, MMMM Do YYYY")}
                type="text" 
                tabIndex="2" 
                autoFocus/>
			</fieldset>
			<fieldset>
				<label>Circuit ID</label>
			<input 
                name="circuitId" 
                value={ this.state.circuitId } 
                onChange={ this.handleChange } 
                placeholder="required" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
			<EquipmentFieldset equipmentName="Modem" />
			<EquipmentFieldset equipmentName="Router" />
			<EquipmentFieldset equipmentName="Wireless Routers" />
			<div id="additional-routers"></div>
			<Link onClick={this.addWirelessRouter}>Add a wireless router</Link>
			<EquipmentFieldset equipmentName="Switches" />
			<Link onClick={this.addSwitch}>Add another switch</Link>

			</form>
			</div>
		);
	}
}

export default CreateReport;