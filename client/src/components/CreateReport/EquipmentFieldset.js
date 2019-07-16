import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class EquipmentFieldset extends React.Component {
state = { hidden: true};

hide = (event) => {
	event.preventDefault();
	this.setState({hidden: !this.state.hidden});}

render() {
	const hidden = classNames({
		'hidden': this.state.hidden
	});
	const hideBtn = classNames({
		'btn': true,
		'btn-hide': this.state.hidden === false,
		'btn-show': this.state.hidden === true
	});
	return (
	<div>
	<label className="equipment-header">
	        <EquipmentButton name={this.props.equipmentName} action={this.hide}/>       
        </label>
		<fieldset className={hidden}>
			<input 
                name="brand" 
                value={ this.props.brand } 
                placeholder="Brand" 
                type="text" 
                tabIndex="3" 
                autoFocus
                onChange={this.props.handleChange}/>
				<input 
                name="model" 
                value={ this.props.model }
                placeholder="Model" 
                type="text" 
                tabIndex="3" 
                onChange={this.props.handleChange}
                autoFocus/>
				<input 
                name="description" 
                value={ this.state.circuitId } 
                onChange={this.props.handleChange}                 
                placeholder="Description" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="location" 
                value={ this.state.circuitId } 
                onChange={this.props.handleChange}                                  
                placeholder="Location" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="notes" 
                value={ this.state.circuitId } 
                onChange={this.props.handleChange}                                                   
                placeholder="Ports" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
			</fieldset>
	</div>
	);
}
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function EquipmentButton({action, name}) {
        const classes = useStyles();
        return <Button onClick={action} href="#text-buttons" className={classes.button}>
                {name}
                </Button>;       
}

export default EquipmentFieldset;