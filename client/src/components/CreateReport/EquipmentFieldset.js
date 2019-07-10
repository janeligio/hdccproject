import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class EquipmentFieldset extends React.Component {
state = { hidden: true};

hide = (event) => {
	event.preventDefault();
	this.setState({hidden: !this.state.hidden});
}
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
		<Link className="equipment-btn" onClick={this.hide}>{this.props.equipmentName}</Link>
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

export default EquipmentFieldset;