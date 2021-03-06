import React, { useRef } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactToPrint from 'react-to-print';


const inactiveStyle = {
  backgroundColor: '#D3D3D3',
}

const JobSite = (props) => {
  const [ref] = React.useState(useRef());
  let wirelessRoutersEl, switchesEl;
  let hasEquipment = false;
  try {
    if(props.data.wirelessRouters.length !== 0 && props.data.wirelessRouters[0].brand !== "") {
      wirelessRoutersEl = props.data.wirelessRouters.map((router) => {
      return <Equipment key={router._id} data={router} />
      }); 
      hasEquipment = true;
    }   

    if(props.data.switches.length !== 0 && props.data.switches[0].brand !== "") {
      switchesEl = props.data.switches.map((switchInstance) => {
      return <Equipment key={switchInstance._id} data={switchInstance} />
      }); 
      hasEquipment = true;
    }
    if(props.data.modem.brand || props.data.router.brand) {
      hasEquipment = true;
    }
  } catch (err) {
    console.log(err);
  }


  const classes = useStyles();
  const equipmentMessage = !hasEquipment 
  ? <Typography 
    variant="caption" 
    display="block" 
    gutterBottom>
    No Equipment
    </Typography>
  : null
  ;

  return(
    <Paper style={!props.data.active ? inactiveStyle : null} ref={ref} elevation={5} className={classes.root}>
    <div>
      <div>
        <Typography variant="h3" component="h1">{props.data.name}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Report generated on {moment(props.data.date).format("MMMM Do YYYY, h:mm A, ddd")}
       </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {props.data.lastUpdated ? `Last Updated: ${moment(props.data.lastUpdated).fromNow()} on ${moment(props.data.lastUpdated).format("MMMM Do YYYY, h:mm A, ddd")}` : null }
       </Typography>
      <div style={{display:'flex'}}> 
       <div style={{display:'flex', flex:1, flexDirection:'column'}}>
        <Typography style={{flex:1}} variant="subtitle2" gutterBottom>
          Circuit ID: {props.data.circuitID || `n/a`}
        </Typography>
        <Typography style={{flex:1}} variant="subtitle2" gutterBottom>
          Subnet: {props.data.subnet || `n/a`}      
        </Typography>
        <Typography style={{flex:1}} variant="subtitle2" gutterBottom>
          Connection: {props.data.connectionType || `n/a`}      
        </Typography>
      </div>

      <div style={{display:'flex', flex:1, flexDirection: 'column'}}>
        <Typography style={{flex:1}} variant="subtitle2" gutterBottom>
          Internal IP: {props.data.internalIP || `n/a`}      
        </Typography>
        <Typography style={{flex:1}} variant="subtitle2" gutterBottom>
          External IP: {props.data.externalIP || `n/a`}      
        </Typography>
      </div>
      </div>
      </div>
      <Typography variant="h6" gutterBottom>
        Inventory
      </Typography>
      { equipmentMessage }
      <Grid style={{marginTop:'0em'}} container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={10}>
              {props.data.modem.brand ? <Equipment data={props.data.modem} /> : null }
              { props.data.router.brand ? <Equipment data={props.data.router} /> : null}
              { wirelessRoutersEl }
              { switchesEl }
          </Grid>
        </Grid>
      </Grid>
      <div style={{display: 'flex'}}>
        <EditButton reportId={props.data._id}/>
        <ReactToPrint
          trigger={() => <button style={props.data.active ? hideButtonStyleActive : hideButtonStyleInactive}><SubmitButton color="green" name={`print`}/></button>}
          content={() => ref.current}
        />
      </div>
     </div>
     </Paper>
    );
};

const Equipment = (props) => {
  const { data } = props;
  const classes = useStyles();
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
    <Grid key={data._id}> 
    <Card elevation={2} className={classes.card}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {equipmentName}
        </Typography>
        <Typography variant="subtitle1" >
        {data.brand} {data.model}
        </Typography>
        <Typography variant="caption" display="block" >
          {data.description}
        </Typography>
        <Typography variant="overline" display="block" >
          {data.location ? `Location - ${data.location}` : null}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Notes: {data.notes}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: '2em',
    flexGrow: 1,
  },
  card: {
    minWidth: 150,
    width: 200,
    margin: '1em',
  },
  button: {
    display: 'block',
    margin: '1em 0',
    width: 64
  },
  input: {
    display: 'none',
  },
}));

const hideButtonStyleActive = {
  backgroundColor: '#FFF',
  border: 'none',
  padding: 0,
  margin: '0 0 0 5px'
};
const hideButtonStyleInactive = {
  backgroundColor: '#D3D3D3',
  border: 'none',
  padding: 0,
  margin: '0 0 0 5px'
};

function EditButton(props) {
  const classes = useStyles();
  return  <Button 
            href={`/edit/${props.reportId}`}
            variant="contained" 
            color="primary" 
            className={classes.button}>
          edit
          </Button>;
}

function SubmitButton({action, name, color}) {
  const classes = useStyles();
  return  <Button 
        style={{backgroundColor: color, width: 80}}
        onClick={action} 
        variant="contained" 
        color="primary"
        className={classes.button}>
      {name}
          </Button>;
}
export default JobSite;