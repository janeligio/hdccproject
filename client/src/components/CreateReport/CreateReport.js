import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './CreateReport.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EquipmentFieldset from './EquipmentFieldset';
import EquipmentFieldsetMultiple from './EquipmentFieldsetMultiple';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class CreateReport extends React.Component {
	state = {
		date: moment(Date.now()),
		site: '',
		circuitId: '',
		modem: {equipmentName: 'modem'},
		router: {equipmentName: 'router'},
		wirelessRouters: [],
		switches: []

	}
	addWirelessRouter = (event) => {
		this.setState({wirelessRouters: [...this.state.wirelessRouters, {equipmentName: 'wirelessRouter'} ] } );
	}
	addSwitch = (event) => {
		this.setState({switches: [...this.state.switches, {equipmentName: 'switch'} ] } );
	}
	handleChange = ({target}) => {
		this.setState({[target.name] : target.value});
	}
	handleModem = ({target}) => {
		const field = target.name;
		this.setState({modem: {...this.state.modem, [field]: target.value} });
	}
	handleRouter = ({target}) => {
		const field = target.name;
		this.setState({router: {...this.state.router, [field]: target.value} });
	}
	handleWireless = (index) => ({target}) => {
		const field = target.name;
		const newData = this.state.wirelessRouters.slice();
		newData[index][field] = target.value;
		this.setState({wirelessRouters: newData});		
	}
	handleSwitch = (index) => ({target}) => {
		const field = target.name;
		const newData = this.state.switches.slice();
		newData[index][field] = target.value;
		this.setState({switches: newData});		
	}
	removeWireless = (index) => ({target}) => {
		this.setState({
			wirelessRouters: this.state.wirelessRouters.filter((item, i) => i !== index)
		});
	}
	removeSwitch = (index) => ({target}) => {
		this.setState({
			switches: this.state.switches.filter((item, i) => i !== index)
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
	    confirmAlert({
	      title: 'Confirm to submit',
	      message: 'Are you sure to do this.',
	      buttons: [
	        {
	          label: 'Yes',
	          onClick: () => alert('Click Yes')
	        },
	        {
	          label: 'No',
	          onClick: () => alert('Click No')
	        }
	      ]
	    });		
		const { 
			site, 
			circuitId, 
			modem, 
			router, 
			wirelessRouters, 
			switches } = this.state;
		const dateObj = this.state.date.toDate();
		const newData = {
			name: site,
			date: dateObj,
			circuitID: circuitId,
			modem: modem,
			router: router,
			wirelessRouters: wirelessRouters,
			switches: switches
		}
		console.log(`Form submitted!`);
		axios.post('/api/reports/create', newData)
			.then(res => console.log(res))
			.catch(err => console.log(err));
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
			<EquipmentFieldset data={this.state.modem} handleChange={this.handleModem} equipmentName="Modem" />
			<EquipmentFieldset data={this.state.router} handleChange={this.handleRouter} equipmentName="Router" />
			{ 
				this.state.wirelessRouters.map((router, index) => {
					let name = `Wireless Router #${index+1}`;
					return <EquipmentFieldsetMultiple 
						index={index} 
						data={this.state.wirelessRouters[index]} 
						handleChange={this.handleWireless} 
						equipmentName={name}
						remove={this.removeWireless} />;
					}
				)
			}
			<Link onClick={this.addWirelessRouter}>Add a wireless router</Link>
			{ 
				this.state.switches.map((item, index) => {
					let name = `Switch #${index+1}`;
					return <EquipmentFieldsetMultiple
						index={index} 
						equipmentName={name}
						handleChange={this.handleSwitch}
						data={this.state.switches[index]}
						remove={this.removeSwitch} />;
					}
				)
			}
			<Link onClick={this.addSwitch}>Add another switch</Link>
			<button type='submit'>Submit</button>
			</form>
			</div>
		);
	}
}

export default CreateReport;