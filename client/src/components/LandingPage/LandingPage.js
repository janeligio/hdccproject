import React, { useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import FileDownload from 'js-file-download';
import ReactToPrint from 'react-to-print';
import JobSiteNetworkPrintable from '../Printables/JobSiteNetworkPrintable';
import JobSite from '../JobSites/JobSiteSingleton/JobSite';

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
				style={{backgroundColor: color}}
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
	const [networkPageRef, setNetworkRef] = React.useState(useRef());
	const [jobsitePageRef, setSiteRef] = React.useState(useRef());
	const [allJobsitePageRef, setAllJobsitesRef] = React.useState(useRef());

	const [jobsiteNotFound, setJobsiteNotFound] = React.useState(true);
	const [jobsite, setJobsite] = React.useState({
				name: '',
				wirelessRouters: [],
				switches: [],
				equipmentName: '',
				modem: {},
				router: {}
			});
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
	      <Typography style={{marginTop:'2em'}} variant="overline" display="block" gutterBottom>
	        Generate CSV file of all job sites
	      </Typography>
	      <SubmitButton color={`#008000`} action={downloadReports} name={`Generate csv`}/>
	      <Typography variant="overline" display="block" gutterBottom>
	        Get printable version of job site network page
	      </Typography>
	      <ReactToPrint
	        trigger={() => <button style={hideButtonStyle}><SubmitButton name={`print network`}/></button>}
	        content={() => networkPageRef.current}
	      />
	      <Typography variant="overline" display="block" gutterBottom>
	        get printable version of a specific job site
	      </Typography>
	      <SubmitButton action={downloadReports} name={`print job site`}/>
	      <Typography variant="overline" display="block" gutterBottom>
	        get printable version of all job sites
	      </Typography>
	      <SubmitButton action={downloadReports} name={`print all job sites`}/>
	  

      <div style={{display:'none'}}>
      	<div ref={networkPageRef}>
	      <JobSiteNetworkPrintable jobsites={props.jobsites} />
      	</div>
      </div>
      <div>
      	<div ref={jobsitePageRef}>
			{jobsiteNotFound ? null : <JobSite data={props.jobsites[0]}/> }
      	</div>
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