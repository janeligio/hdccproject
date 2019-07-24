import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import FileDownload from 'js-file-download';

  function downloadReport(id) {
    axios.get(`api/reports/download/${id}`).then(res => FileDownload(res.data, 'report.csv'));
  }

const JobSite = (props) => {
  const [hidden, updateHidden] = useState(true);
  const { wirelessRouters, switches } = props.data;
  let wirelessRoutersEl, switchesEl;
  let hasEquipment = false;
  if(wirelessRouters.length !== 0 && wirelessRouters[0].brand !== "") {
    wirelessRoutersEl = wirelessRouters.map((router) => {
    return <Equipment key={router._id} data={router} />
    }); 
    hasEquipment = true;
  }

  if(switches.length !== 0 && switches[0].brand !== "") {
    switchesEl = switches.map((switchInstance) => {
    return <Equipment key={switchInstance._id} data={switchInstance} />
    }); 
    hasEquipment = true;
  }
  if(props.data.modem.brand || props.data.router.brand) {
    hasEquipment = true;
  }
  return(
    <div className="jobsite">
      <div className="jobsite-container-1">
        <h2><Link style={{textDecoration:'none',color:'black'}} to={`/site/${props.data._id}`}>{props.data.name}</Link></h2>
        <p><b>Report created:</b> {moment(props.data.date).format("MMMM Do YYYY, h:mm A, ddd")}</p>
        {props.data.date === props.data.lastUpdated ? null : `Last Updated: ${moment(props.data.lastUpdated).format("MMMM Do YYYY, h:mm A, ddd")}`}
        <p><b>Circuit ID:</b> {props.data.circuitID || `n/a`}</p> 
        <p><b>Subnet:</b> {props.data.subnet || `n/a`}</p> 
      </div>
      <h3>{hasEquipment ? `` : `No equipment.`}</h3>
      <div className="jobsite-container-2">
        {props.data.modem.brand ? <Equipment data={props.data.modem} /> : null }
        { props.data.router.brand ? <Equipment data={props.data.router} /> : null}
        { wirelessRoutersEl }
        { switchesEl }
      </div>
      <EditButton reportId={props.data._id}/>
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
      <h4>{equipmentName} - {data.brand} {data.model}</h4>
      <p>{data.description}</p>
      <p>Location - {data.location}</p>
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

function EditButton(props) {
  const classes = useStyles();
  return  <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}>
            <Link style={{textDecoration: 'none', color:'white'}} to={`/edit/${props.reportId}`}> 
          edit
          </Link></Button>;
}
function DownloadButton({action}) {
  const classes = useStyles();
  return <Button onClick={action} type="submit" variant="contained" color="primary" className={classes.button}>
          download
          </Button>;
}
export default JobSite;