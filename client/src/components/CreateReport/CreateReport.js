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
		site: '',
		circuitId: '',
		modem: {equipmentName: 'modem'},
		router: {equipmentName: 'router'},
		wirelessRouters: [],
		switches: []

	};
	addWirelessRouter = (event) => {
		this.setState({wirelessRouters: [...this.state.wirelessRouters, {equipmentName: 'wirelessRouter'} ] } );
	}
	addSwitch = (event) => {
		this.setState({switches: [...this.state.switches, {equipmentName: 'switch'} ] } );
	}
	handleChange = ({target}) => {
		this.setState({[target.name] : target.value});
		console.log(target.value);
	}
	handleModem = ({target}) => {
		const field = target.name;
		this.setState({modem: {...this.state.modem, [field]: target.value} });
	}
	handleRouter = ({target}) => {
		const field = target.name;
		this.setState({router: {...this.state.router, [field]: target.value} });
	}
	handleWireless = ({target}, x) => {
		console.log(`Target: ${target} X: ${x}`);
		
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
					return <EquipmentFieldset index={index} data={this.state.wirelessRouters[index]} handleChange={this.handleWireless} equipmentName={name} />;
					}
				)
			}
			<Link onClick={this.addWirelessRouter}>Add a wireless router</Link>
			{ 
				this.state.switches.map((item, index) => {
					let name = `Switch #${index+1}`;
					return <EquipmentFieldset equipmentName={name} />;
					}
				)
			}
			<Link onClick={this.addSwitch}>Add another switch</Link>
			</form>
			</div>
		);
	}
}

export default CreateReport;