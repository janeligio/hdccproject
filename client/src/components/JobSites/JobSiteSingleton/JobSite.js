import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';


const JobSite = (props) => {
  const [hidden, updateHidden] = useState(true);
  const wirelessRouters = props.data.wirelessRouters.map((router) => {
    return <Equipment key={router._id} data={router} />
  }); 
  const switches = props.data.switches.map((switchInstance) => {
    return <Equipment key={switchInstance._id} data={switchInstance} />
  }); 
  return(
    <div className="jobsite">
      <div className="jobsite-container-1">
        <h2>{props.data.name}</h2>
        <p><b>Report created:</b> {moment(props.data.date).format("dddd, MMMM Do YYYY, hA")}</p>
        <p><b>Circuit ID:</b> {props.data.circuitID}</p> 
      </div>
      <h3>Equipment</h3>
      <div className="jobsite-container-2">
        <Equipment data={props.data.modem} />
        <Equipment data={props.data.router} />
        { wirelessRouters }
        { switches }
      </div>



      <EditButton/>
    </div>
    );
};

const Equipment = (props) => {
  const { data } = props;
  let equipmentName;
  switch(data.equipmentName) {
    case "modem":
    equipmentName = "Modem";
    break;
    case "router":
    equipmentName = "Router";
    break;
    case "wirelessRouter":
    equipmentName = "Wireless Router";
    break;
    case "switch":
    equipmentName = "Switch";
    break;
    default:
    break;
  }
  return ( 
    <div>
      <h4>{equipmentName}: {data.brand} {data.model}</h4>
      <p>Description: {data.description}</p>
      <p>Location: {data.location}</p>
      <p>Notes: {data.notes}</p>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    margin: '1em 0'
  },
  input: {
    display: 'none',
  },
}));

function EditButton() {
  const classes = useStyles();
  return  <Button type="submit" variant="contained" color="primary" className={classes.button}>
          edit
          </Button>;
}
export default JobSite;