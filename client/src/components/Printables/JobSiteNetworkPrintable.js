import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import '../JobSiteNetwork/JobSiteNetwork.css';
//    marginTop: theme.spacing(3),

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: 0,
    paddingTop: 0
  },
   button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const equipmentStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function EquipmentButton({path, name}) {
        const classes = equipmentStyles();
        return <Button href="#text-buttons" className={classes.button}>
                <Link style={{textDecoration:'none',color:'black'}} to={path}>{name}</Link>
                </Button>;       
}

const Row = (props) => (
	<TableRow className={`site-row ${(props.index+1)%2 === 0 ? 'network-even' : 'network-odd'} `}>
		<TableCell><EquipmentButton path={`/site/${props.data._id}`} name={props.data.name}/></TableCell>
		<TableCell>{props.data.subnet || `---`}</TableCell>
	</TableRow>
);

export default function JobSiteNetwork(props) {
	const [redirect, setRedirect] = useState(false);

	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			{redirect ? <Redirect to="/network"/> : null}
		        <Typography variant="h5" component="h2">
		          {props.title}
		        </Typography>
			<Table className={classes.table}>

				<TableBody>
					{
						props.jobsites.map((site, index) => (
						<Row {...props} data={site} index={index} setRedirect={setRedirect}/>
						)
					)}
				</TableBody>
			</Table>
		</Paper>
	)
	;
}