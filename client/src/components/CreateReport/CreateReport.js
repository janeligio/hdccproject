import React from 'react';
import axios from 'axios';
import './CreateReport.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EquipmentFieldset from './EquipmentFieldset';

class CreateReport extends React.Component {
	state = {
		date: moment(Date.now()),	
	};

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
			<EquipmentFieldset equipmentName="Wireless Router" />
			<EquipmentFieldset equipmentName="Switch" />

			</form>
			</div>
		);
	}
}

export default CreateReport;