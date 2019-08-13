import React from 'react';
import axios from 'axios';
import EquipmentFieldset from '../CreateReport/EquipmentFieldset';
import EquipmentFieldsetMultiple from '../CreateReport/EquipmentFieldsetMultiple';
import { withRouter } from 'react-router-dom';
import RadioButtonsGroup from '../CreateReport/RadioButtonsGroup';
import SwitchLabels from './SwitchLabels';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import DatePicker from 'react-date-picker';

class EditReport extends React.Component {
	state = {
	reportId: '',
	date: new Date(),
	site: '',
	circuitId: '',
	connectionType: 'DIA',
	active: true,	
	subnet: '',
	internalIP: '',
	externalIP: '',
	modem: {equipmentName: 'modem'},
	router: {equipmentName: 'router'},
	wirelessRouters: [],
	switches: []
	};

  	onChange = date => this.setState({ date })

  	handleRadioChange = event => {
  		this.setState({connectionType: event.target.value});
  	}
  	handleToggleSWitch = name => event => {
  		this.setState({active: event.target.checked});
  	}
	componentDidMount() {
		const { id } = this.props.match.params;
		const url = `/api/reports/find/${id}`;
		axios
			.get(url)
			.then(res => {
				console.log(res.data);
				this.setState(
				{	
					reportId: id,
					site: res.data.name,
					date: new Date(res.data.date),
					circuitId: res.data.circuitID,
					connectionType: res.data.connectionType,
					active: res.data.active,
					subnet: res.data.subnet,
					internalIP: res.data.internalIP,
					externalIP: res.data.externalIP,
					modem: res.data.modem,
					router: res.data.router,
					wirelessRouters: res.data.wirelessRouters,
					switches: res.data.switches
				})

			})
			.catch(err => {
				console.log(err);
				this.setState({notFound: true});
			})
			;
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
		this.confirmDeleteEquipment(() => {
			this.setState({
			wirelessRouters: this.state.wirelessRouters.filter((item, i) => i !== index)
			});
		}, "wireless router");

	}
	removeSwitch = (index) => ({target}) => {
		this.confirmDeleteEquipment(() => {
			this.setState({
				switches: this.state.switches.filter((item, i) => i !== index)
			});
		}, "switch");
	}
	confirmDeleteEquipment = (cb, equipmentName) => {
	    confirmAlert({
	      title: 'Confirm',
	      message: `Are you sure you want to delete this ${equipmentName}?`,
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
	confirmDelete = (cb) => {
	    confirmAlert({
	      title: 'Confirm',
	      message: 'Are you sure you want to delete this report from the database?',
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
	confirm = (cb) => {
	    confirmAlert({
	      title: 'Confirm',
	      message: 'Do you want to update this job report?',
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
	handleDelete = (event) => {
		event.preventDefault();
		const url = `/api/reports/delete?id=${this.state.reportId}`;
		this.confirmDelete(() => {
		axios
			.delete(url)
			.then(res => console.log(res))
			.catch(err => console.log(err));
			this.props.history.push('/');		
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		if(!this.state.notFound) {
			const { 
				site, 
				circuitId,
				connectionType,
				active,
				date,
				subnet,
				internalIP,
				externalIP, 
				modem, 
				router, 
				wirelessRouters, 
				switches } = this.state;
			const dateObj = Date.now();
			const newData = {
				name: site,
				date: date,
				lastUpdated: dateObj,
				circuitID: circuitId,
				connectionType: connectionType,
				active: active,
				subnet: subnet,
				internalIP: internalIP,
				externalIP: externalIP,
				modem: modem,
				router: router,
				wirelessRouters: wirelessRouters,
				switches: switches
			};
			console.log(newData, this.state.reportId);
			console.log(`Form submitted!`);
			this.confirm(() => {
			axios.post(`/api/reports/edit/${this.state.reportId}`, newData)
				.then(res => console.log(res))
				.catch(err => console.log(err));
				this.props.history.push(`/site/${this.state.reportId}`);		
			});
		}
	}
	render() {
		return (
			<div>
			{ this.state.notFound ? <NotFoundPage /> : null }
			<form id="create-form-container" noValidate onSubmit={this.handleSubmit}>
			<h1 className="create-form-header">Edit Report</h1>
			<fieldset>
				<label>Name of Jobsite</label>
			<input 
                name="site" 
                value={ this.state.site } 
                onChange={ this.handleChange } 
                placeholder="Required" 
                type="text" 
                tabIndex="1" 
                autoFocus/>
			</fieldset>
			<label>Date</label>
			<fieldset>
			<DatePicker onChange={this.onChange} value={this.state.date}/>
			</fieldset>
			<fieldset>
				<label>Circuit ID</label>
			<input 
                name="circuitId" 
                value={ this.state.circuitId } 
                onChange={ this.handleChange } 
                placeholder="Required" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
			<fieldset>
				<RadioButtonsGroup value={this.state.connectionType} handleChange={this.handleRadioChange}/>
			</fieldset>
			<fieldset>
				<SwitchLabels active={this.state.active} handleChange={this.handleToggleSWitch}/>
			</fieldset>
			<fieldset>
				<label>Subnet</label>
			<input 
                name="subnet" 
                value={ this.state.subnet } 
                onChange={ this.handleChange } 
                placeholder="Required" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
			<fieldset>
				<label>Internal IP Address</label>
			<input 
                name="internalIP" 
                value={ this.state.internalIP } 
                onChange={ this.handleChange } 
                placeholder="Required" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
			<fieldset>
				<label>External IP Address</label>
			<input 
                name="externalIP" 
                value={ this.state.externalIP } 
                onChange={ this.handleChange } 
                placeholder="Required" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
			<EquipmentFieldset show={true} data={this.state.modem} handleChange={this.handleModem} equipmentName="Modem" />
			<EquipmentFieldset show={true} data={this.state.router} handleChange={this.handleRouter} equipmentName="Router" />
			{ 
				this.state.wirelessRouters.map((router, index) => {
					let name = `Wireless Router #${index+1}`;
					return <EquipmentFieldsetMultiple 
						show={true}
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
						show={true}
						index={index} 
						equipmentName={name}
						handleChange={this.handleSwitch}
						data={this.state.switches[index]}
						remove={this.removeSwitch} />;
					}
				)
			}
			<AddButton action={this.addSwitch} name="Add a switch"/>
			<div style={{display:'flex'}}>
			<SubmitButton />
			<DeleteButton action={this.handleDelete}/>
			</div>
			<CancelButton action={() => this.props.history.goBack()} />
			</form>
			</div>
		);
	}
}
const removeButtonStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),

  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const DeleteButton = ({action}) => {
        const classes = removeButtonStyles();
        return	<Button onClick={action} size="small" variant="contained" color="secondary" className={classes.button}>
        		delete report
        		<DeleteIcon className={classes.rightIcon} />
      		</Button>;
}
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function SubmitButton() {
	const classes = useStyles();
	return 	<Button type="submit" size="small" variant="contained" color="primary" className={classes.button}>
        	update report
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
                <AddIcon size="small" />
                </Fab>{name}</div>
}
function CancelButton({action}) {
	const classes = useStyles()
	return (
      <Button onClick={action} color="secondary" size="small" className={classes.button}>
        cancel
      </Button>
	);
}
function NotFoundPage(props) {
  return (
        <Typography style={{
        	padding: '0.5em',
        }} variant="h3" component="h1">404 Not Found</Typography>
  	);
}
export default withRouter(EditReport);