import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 200,
    width: 300,
    height: 240,
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

export default function SimpleCard(props) {
  const classes = useStyles();
  const { wirelessRouters, switches } = props.data;
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
  return (
    <Card className={classes.card}>
      <CardContent>

       <div style={{display:'flex'}}>
          <Typography style={{flex:1}} className={classes.title} color="textSecondary" gutterBottom>
            Subnet: {props.data.subnet || `none`}
          </Typography>
          <Typography style={{fontSize:'0.7em',flex:1}} className={classes.pos} color="textSecondary">
           {!!props.data.internalIP && `
              Internal IP: ${props.data.internalIP}
            `}
          </Typography>
          <Typography style={{fontSize:'0.7em',flex:1}} className={classes.pos} color="textSecondary">
           {!!props.data.externalIP && `
             External IP: ${props.data.externalIP}
            `}
          </Typography>
        </div>

        <Typography variant="h5" component="h2">
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
        <Typography variant="body2" component="p">
          { message }
        </Typography>
      </CardContent>
      <CardActions> 
        <Button color="primary" href={`/site/${props.data._id}`} className={classes.button} size="small">View</Button>
      </CardActions>
    </Card>
  );
}