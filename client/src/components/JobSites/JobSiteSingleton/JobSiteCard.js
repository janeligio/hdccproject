import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import SwitchLabels from './SwitchLabels';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 200,
    width: 300,
    margin: '1em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const inactiveStyle = {
  backgroundColor: '#D3D3D3',
}
export default function SimpleCard(props) {
  const classes = useStyles();
  const { wirelessRouters, switches } = props.data;
  const hasModem = props.data.modem.brand ? true : false;
  const hasRouter = props.data.router.brand ? true : false;
  let hasWireless, hasSwitch;
  
  const handleToggle = field => event => {
    axios
      .post(`/api/reports/edit/makeactive/${props.data._id}`, 
      {active:!props.data.active, lastUpdated: Date.now()})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
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
  const hasEquipment = hasRouter || hasModem || hasWireless[0] || hasSwitch[0];
  const message = 
    hasEquipment ?
    <>
    <Typography variant="subtitle2" >
    Equipment
    </Typography>
    <ul style={{listStyleType:'none',
      margin:0,
      padding:0,
      paddingLeft:'1em'}}>
      {hasRouter && <li>1 Router</li>}
      {hasModem &&  <li>1 Modem</li>}
      {hasWireless[0] && <li>{hasWireless[1]} Wireless Router{hasWireless[1]>1 && `s`}</li>}
      {hasSwitch[0] && <li>{hasSwitch[1]} Switch{hasSwitch[1]>1 && `es`}</li>}
    </ul>
    </>
    : `No equipment`
  ;
  // if(!hasModem && !hasRouter && !hasWireless[0] && !hasSwitch[0]) {
  //   message = 'No equipment.';
  // } else if (hasModem && hasRouter && hasWireless[0] && hasSwitch[0]) {
  //   message = `Has a modem, router, ${hasWireless[1]} wireless router${hasWireless[1]>1?'s':''}, and ${hasSwitch[1]} switch${hasSwitch[1]>1?'es':''}.`;
  // } else {
  //   message = `Has 
  //   ${hasModem ? 'a modem':''}
  //   ${!hasWireless[0] && !hasSwitch ? ' and ':', '}
  //   ${hasRouter?'a router': ''} 
  //   ${!hasSwitch[0] ? ' and ':', '}
  //   ${hasWireless[0]?`${hasWireless[1]} router `:''}

  //   .` 
  //   message = `Has a ${hasModem?'-modem ':''}
  //   ${hasRouter?'-router ':''}
  //   ${hasWireless[0]?`-${hasWireless[1]} wireless router${hasWireless[1].length>1?'s':''}`:''}
  //   ${hasSwitch[0]?`-${hasSwitch[1]} switch${hasSwitch[1].length>1?'es':''}`:''}

  //   `
  // }
  return (
    <Card style={!props.data.active ? inactiveStyle : null} className={classes.card}>
      <CardContent>
       <div style={{display:'flex'}}>
          <Typography style={{flex:1}} className={classes.title} color="textSecondary" gutterBottom>
            Subnet: {props.data.subnet || `none`}
          </Typography>
          <SwitchLabels active={props.data.active} handleChange={handleToggle}/>
        </div>

        <Typography style={{marginLeft:0, marginTop:0}} variant="h5" component="h2">
          {props.data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {moment(props.data.date).format("MMMM Do YYYY")} 
          <br />
        <Typography style={{fontSize:'0.7em'}} className={classes.pos} color="textSecondary">
          {props.data.lastUpdated 
            ? `Updated: ${moment(props.data.lastUpdated).fromNow()}`
            : ``
          }
          </Typography>
        </Typography>
        <div>
          <Typography style={{fontSize:'0.9em',flex:1, margin: 0}} className={classes.pos} color="textSecondary">
           {!!props.data.connectionType && `
              Connection Type: ${props.data.connectionType}
            `}
          </Typography>
          <Typography style={{fontSize:'0.9em',flex:1, margin: 0}} className={classes.pos} color="textSecondary">
           {!!props.data.internalIP && `
              Internal IP: ${props.data.internalIP}
            `}
          </Typography>
          <Typography style={{fontSize:'0.9em',flex:1, margin: '0 0 5px 0'}} className={classes.pos} color="textSecondary">
           {!!props.data.externalIP && `
             External IP: ${props.data.externalIP}
            `}
          </Typography>
        </div>
        <Typography style={{
          padding: '1em'
        }} variant="body2" component="p">
          { message }
        </Typography>
      </CardContent>
      <CardActions style={{borderTop:'1px solid #CCC'}}> 
        <Button color="primary" href={`/site/${props.data._id}`} className={classes.button} size="small">View</Button>
      </CardActions>
    </Card>
  );
}