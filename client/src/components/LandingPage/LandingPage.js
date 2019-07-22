import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import FileDownload from 'js-file-download';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function SubmitButton({action, name}) {
	const classes = useStyles();
	return 	<Button onClick={action} variant="contained" color="primary" className={classes.button}>
        	{name}
      		</Button>;
}

export default function LandingPage() {
	function downloadReports() {
		axios.get('api/reports/download/all').then(res => FileDownload(res.data, 'reports.csv'));
	}
	return <div>

		<h1>Welcome!</h1>
		<SubmitButton action={downloadReports} name={`Download All reports`}/>
		</div>
}