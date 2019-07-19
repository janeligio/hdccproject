import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class EquipmentFieldsetArray extends React.Component {
state = { hidden: !this.props.show};

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
        const { index } = this.props;
        const { brand, model, location, description, notes} = this.props.data;
        return (
        <div>
        <label className="equipment-header">
                <EquipmentButton name={this.props.equipmentName} action={this.hide}/>       
                <RemoveButton action={this.props.remove} index={index} />
        </label>
                <fieldset className={hidden}>
                <input 
                name="brand" 
                value={ brand } 
                placeholder="Brand" 
                type="text" 
                tabIndex="3" 
                autoFocus
                onChange={this.props.handleChange(index)}/>
                <input 
                name="model" 
                value={ model }
                placeholder="Model" 
                type="text" 
                tabIndex="3" 
                onChange={this.props.handleChange(index)}
                autoFocus/>
                <input 
                name="description" 
                value={ description } 
                onChange={this.props.handleChange(index)}                 
                placeholder="Description" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
                <input 
                name="location" 
                value={ location } 
                onChange={this.props.handleChange(index)}                                  
                placeholder="Location" 
                type="text" 
                tabIndex="3" 
                autoFocus/>
                <input 
                name="notes" 
                value={ notes } 
                onChange={this.props.handleChange(index)}                                                   
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

const removeButtonStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    float: 'right'
  },
  input: {
    display: 'none',
  },
}));

function RemoveButton({action, index}) {
        const classes = removeButtonStyles();
        return  <Button onClick={action(index)} variant="outlined" color="secondary" className={classes.button}>
                delete
                </Button>;
}



export default EquipmentFieldsetArray;