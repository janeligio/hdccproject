import React from 'react';
import classNames from 'classnames';

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
<button className={hideBtn} onClick={this.hide}>{this.state.hidden?'+':'-'}</button>		<label className="equipment-header">{this.props.equipmentName}
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