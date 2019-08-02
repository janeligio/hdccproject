import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import FileDownload from 'js-file-download';
import ReactToPrint from 'react-to-print';
import JobSiteNetworkPrintable from '../Printables/JobSiteNetworkPrintable';
import KOIP from './KOIP';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
   button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function SubmitButton({action, name, color}) {
	const classes = useStyles();
	return 	<Button 
				style={{backgroundColor: color,
				}}
				onClick={action} 
				variant="contained" 
				color="primary"
				className={classes.button}>
			{name}
      		</Button>;
}

const hideButtonStyle = {
	backgroundColor: 'white',
	border: 'none',
	padding: 0,
	margin: 0
};

export default function LandingPage(props) {
	function downloadReports() {
		axios.get('api/reports/download/all').then(res => FileDownload(res.data, 'reports.csv'));
	}
	const [networkPageRef] = React.useState(useRef());
	const classes = useStyles();
	return ( 
	<Container 
		maxWidth={false}
		className={classes.root}>
      <Typography style={{marginTop: '.5em'}} variant="h4">
        Hawaiian Dredging Construction Co. 
      </Typography>
      <Typography variant="h5" gutterBottom>
        Job Site Network
      </Typography>

      <Container maxWidth="xl" className={classes.root}>
      	<div style={{display:'flex'}}>
	      <SubmitButton color={`#008000`} action={downloadReports} name={`Generate csv`}/>
	      <ReactToPrint
	        trigger={() => <button style={hideButtonStyle}><SubmitButton name={`print network`}/></button>}
	        content={() => networkPageRef.current}
	      />
	  	</div>


      <div style={{display:'none'}}>
      	<div ref={networkPageRef}>
	      <JobSiteNetworkPrintable jobsites={props.jobsites} />
      	</div>
      </div>

	  </Container>
	</Container>
	);
}