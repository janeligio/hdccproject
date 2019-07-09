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
                name="equipment" 
                value={ this.state.circuitId } 
          		
                placeholder="Brand" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="equipment" 
                value={ this.state.circuitId } 
                 
                placeholder="Model" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="equipment" 
                value={ this.state.circuitId } 
                 
                placeholder="Model" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="equipment" 
                value={ this.state.circuitId } 
                 
                placeholder="Description" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="equipment" 
                value={ this.state.circuitId } 
                 
                placeholder="Location" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
				<input 
                name="equipment" 
                value={ this.state.circuitId } 
                 
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