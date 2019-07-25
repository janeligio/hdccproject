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

const JobSiteCard = (props) => {
  const [hidden, updateHidden] = useState(true);
  const { wirelessRouters, switches } = props.data;
  let wirelessRoutersEl, switchesEl;
  const hasModem = props.data.modem.brand ? true : false;
  const hasRouter = props.data.router.brand ? true : false;
  let hasWireless, hasSwitch;
  if(wirelessRouters.length !== 0 && wirelessRouters[0].brand !== "") {
    hasWireless = [true, wirelessRouters.length];
  } else { 
    hasWireless = [false, 0];
  }
  if(switches.length !== 0 && switches[0].brand !== "") {
    hasSwitch = [true, switches.length];
  } else { 
    hasSwitch = [false, 0];
  }
  let message;
  if(!hasModem && !hasRouter && !hasWireless[0] && !hasSwitch[0]) {
    message = 'No equipment.';
  } else if (hasModem && hasRouter && hasWireless[0] && hasSwitch[0]) {
    message = `Has a modem, router, ${hasWireless[1]} wireless router${hasWireless[1]>1?'s':''}, and ${hasSwitch[1]} switch${hasSwitch[1]>1?'es':''}.`;
  } else {
    // message = `Has 
    // ${hasModem ? 'a modem':''}
    // ${!hasWireless[0] && !hasSwitch ? ' and ':', '}
    // ${hasRouter?'a router': ''} 
    // ${!hasSwitch[0] ? ' and ':', '}
    // ${hasWireless[0]?`${hasWireless[1]} router `:''}

    // .` 
    message = `Has a ${hasModem?'-modem ':''}
    ${hasRouter?'-router ':''}
    ${hasWireless[0]?`-${hasWireless[1]} wireless router${hasWireless[1].length>1?'s':''}`:''}
    ${hasSwitch[0]?`-${hasSwitch[1]} switch${hasSwitch[1].length>1?'es':''}`:''}

    `
  }

  return(
    <div className="jobsite-card">
      <div className="jobsite-card-container-1">
        <h2><Link style={{textDecoration:'none',color:'black'}} to={`/site/${props.data._id}`}>{props.data.name}</Link></h2>
        <p><b>Report created:</b> {moment(props.data.date).format("MMMM Do YYYY, h:mm A, ddd")}</p>
        <p><b>Last updated:</b> Not implemented</p>
        <p><b>Circuit ID:</b> {props.data.circuitID}</p> 
        <p><b>Subnet:</b> {props.data.subnet}</p> 
      </div>
      <h3>
      { message }

      </h3>
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
export default JobSiteCard;