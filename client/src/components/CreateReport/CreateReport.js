import React from 'react';
import axios from 'axios';
import './CreateReport.css';
import moment from 'moment';
import EquipmentFieldset from './EquipmentFieldset';
import EquipmentFieldsetMultiple from './EquipmentFieldsetMultiple';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

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
	confirm = (cb) => {
	    confirmAlert({
	      title: 'Confirm',
	      message: 'Do you want to submit this job report?',
	      buttons: [
	        {
	          label: 'Yes',
	          onClick: () => cb()
	        },
	        {
	          label: 'No',
	          onClick: () => false
	        }
	      ]
	    });		
	}
	handleSubmit = (event) => {
		event.preventDefault();
	
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
		this.confirm(() => {
		axios.post('/api/reports/create', newData)
			.then(res => console.log(res))
			.catch(err => console.log(err));			
		});
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
			<AddButton action={this.addWirelessRouter} name="Add a wireless router"/>
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
			<AddButton action={this.addSwitch} name="Add a switch"/>
			<SubmitButton />
			</form>
			</div>
		);
	}
}

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    margin: '1em 0'
  },
  input: {
    display: 'none',
  },
}));

function SubmitButton() {
	const classes = useStyles();
	return 	<Button type="submit" variant="contained" color="primary" className={classes.button}>
        	submit
      		</Button>;
}
const addButtonStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
function AddButton({action, name}) {
        const classes = addButtonStyles();
        return  <div><Fab onClick={action} size="small" color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
                </Fab>{name}</div>
}
export default CreateReport;