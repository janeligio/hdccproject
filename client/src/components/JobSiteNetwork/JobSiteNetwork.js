import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import ReactToPrint from 'react-to-print';
import JobSiteNetworkPrintable from '../Printables/JobSiteNetworkPrintable';

import './JobSiteNetwork.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
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
const removeButtonStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  rightIcon: {
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

function EquipmentButton({path, name}) {
        const classes = equipmentStyles();
        return <Button href="#text-button" className={classes.button}>
                <Link style={{textDecoration:'none',color:'black'}} to={path}>{name}</Link>
                </Button>;       
}
function SortButton({action, name}) {
        const classes = equipmentStyles();
        return <a onClick={action} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.54)'}} href="#sort" className={classes.button}>
                {name}
                </a>;       
}
const confirmDelete = (cb) => {
	    confirmAlert({
	      title: 'Confirm',
	      message: 'Are you sure you want to delete this report from the database?',
	      buttons: [
	        {
	          label: 'Yes',
	          onClick: () => cb()
	        },
	        {
	          label: 'No',
	          onClick: () => false
	        }
	      ]
	    });		
}
const handleDelete = (reportId, setRedirect) => (event) => {
		event.preventDefault();
		const url = `/api/reports/delete?id=${reportId}`;
		confirmDelete(() => {
		axios
			.delete(url)
			.then(res => console.log(res))
			.then(setRedirect(true))
			.catch(err => console.log(err));		
		});
};
const DeleteButton = ({action}) => {
        const classes = removeButtonStyles();
        return	<Button onClick={action} variant="contained" color="secondary" className={classes.button}>
        			<DeleteIcon className={classes.rightIcon} />
      			</Button>;
};

const EditButton = () => {
  const classes = useStyles();
	return (
      <Fab color="primary" aria-label="Edit" className={classes.fab}>
        <EditIcon>edit_icon</EditIcon>
      </Fab>
	);
};

const handleActivate = (reportId, active) => event => {
    axios
      .post(`/api/reports/edit/makeactive/${reportId}`, {active:!active})
      .then(res => console.log(res))
      .catch(err => console.log(err));
 }
const ActivateButton = ({active, action}) => {
   const classes = useStyles();
	return (
      <Button onClick={action} variant="outlined" href="#outlined-buttons" className={classes.button}
      	color={ active ? 'secondary' : 'primary'}>
        { active ? 'Deactivate' : 'Activate'}
      </Button>
	);
};

const Row = (props) => (
	<TableRow className={`site-row ${(props.index+1)%2 === 0 ? 'network-even' : 'network-odd'} `}>
	<React.Fragment>
		<TableCell><EquipmentButton path={`/site/${props.data._id}`} name={props.data.name}/></TableCell>
		<TableCell className="subnet">{props.data.subnet || <span>&nbsp;---</span>}</TableCell>
	</React.Fragment>
		<TableCell><ActivateButton action={handleActivate(props.data._id, props.data.active)} active={props.data.active}/></TableCell>
		<TableCell><Link to={`/edit/${props.data._id}`}><EditButton/></Link></TableCell>
	</TableRow>
);
const InactiveRow = (props) => (
	<TableRow className={`site-row ${(props.index+1)%2 === 0 ? 'network-even' : 'network-odd'} `}>
		<TableCell><EquipmentButton path={`/site/${props.data._id}`} name={props.data.name}/></TableCell>
		<TableCell>{props.data.subnet || <span>&nbsp;---</span>}</TableCell>
		<TableCell><ActivateButton action={handleActivate(props.data._id, props.data.active)} active={props.data.active}/></TableCell>
		<TableCell><DeleteButton {...props} action={handleDelete(props.data._id, props.setRedirect)}/></TableCell>
	</TableRow>
);
					// _.orderBy(
					// 	_.filter(
					// 		_.map(props.jobsites, convertSubnetToInt), 
					// 			site => site.active), fieldToSortBy[0], fieldToSortBy[1]).map(
					// 			(site, index) => (
					// 			<Row {...props} data={site} index={index} setRedirect={setRedirect}/>
					// 				)
					// 			)
export default function JobSiteNetwork(props) {
	const [redirect, setRedirect] = useState(false);
	const [fieldToSortBy, setField] = useState(['name', 'asc']);
	const [fieldToSortByinactive, setFieldinactive] = useState(['name', 'asc']);
	const [activeNetworkPageRef] = useState(useRef());
	const [inactiveNetworkPageRef] = useState(useRef());

	function handleSort(field) {
		let ascOrDesc;
		if(field === fieldToSortBy[0]) {
			ascOrDesc = fieldToSortBy[1] === 'asc' ? 'desc' : 'asc';
			setField([field, ascOrDesc]);
		} else {
			ascOrDesc = 'asc';
			setField([field, ascOrDesc]);
		}
	}
	function handleSortInactive(field) {
		let ascOrDesc;
		if(field === fieldToSortByinactive[0]) {
			ascOrDesc = fieldToSortByinactive[1] === 'asc' ? 'desc' : 'asc';
			setFieldinactive([field, ascOrDesc]);
		} else {
			ascOrDesc = 'asc';
			setFieldinactive([field, ascOrDesc]);
		}
	}
	function convertSubnetToInt(site) {
		let obj = site;
		const subnetAsInt = parseInt(site.subnet);
		obj.subnet = subnetAsInt;
		return obj;
	}
	const classes = useStyles();
	const sortedJobsites = 
				      _.orderBy(
						_.filter(
							_.map(props.jobsites, convertSubnetToInt), 
								site => site.active), fieldToSortBy[0], fieldToSortBy[1]);
	const sortedInactiveJobsites = 
				      _.orderBy(
						_.filter(
							_.map(props.jobsites, convertSubnetToInt), 
								site => !site.active), fieldToSortByinactive[0], fieldToSortByinactive[1]);

	return (
		<Paper className={classes.root}>
			{redirect ? <Redirect to="/network"/> : null}

		        <Typography variant="h5" component="h2">
		          Active Job Sites
		        </Typography>
			      <ReactToPrint
			        trigger={() => <button style={hideButtonStyle}><SubmitButton name={`print`}/></button>}
			        content={() => activeNetworkPageRef.current}
			      />
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell><SortButton name="Job Site" action={() => handleSort('name')}/>
						<TableSortLabel 
							onClick={() => handleSort('name')}
							active={fieldToSortBy[0] === 'name' ? true : false}
							direction={fieldToSortBy[1]}
							></TableSortLabel></TableCell>
						<TableCell><SortButton name="Subnet" action={() => handleSort('subnet')}/>
						<TableSortLabel 
							onClick={() => handleSort('subnet')}
							active={fieldToSortBy[0] === 'subnet' ? true : false}
							direction={fieldToSortBy[1]}
							></TableSortLabel></TableCell>
						<TableCell>Deactivate</TableCell>
						<TableCell>Edit</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>

			      <div style={{display:'none'}}>
			      	<div ref={activeNetworkPageRef}>
				      <JobSiteNetworkPrintable title="Active Job Sites" jobsites={sortedJobsites} />
			      	</div>
			      </div>

      				{
      					sortedJobsites.map((site, index) => (
						<Row {...props} data={site} index={index} setRedirect={setRedirect}/>
      						))
					}
				</TableBody>
			</Table>

		        <Typography variant="h5" component="h2">
		          Inactive Job Sites
		        </Typography>
			      <ReactToPrint
			        trigger={() => <button style={hideButtonStyle}><SubmitButton name={`print`}/></button>}
			        content={() => inactiveNetworkPageRef.current}
			      />
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell><SortButton name="Job Site" action={() => handleSortInactive('name')}/>
						<TableSortLabel 
							onClick={() => handleSortInactive('name')}
							active={fieldToSortByinactive[0] === 'name' ? true : false}
							direction={fieldToSortByinactive[1]}
							></TableSortLabel></TableCell>
						<TableCell><SortButton name="Subnet" action={() => handleSortInactive('subnet')}/>
						<TableSortLabel 
							onClick={() => handleSortInactive('subnet')}
							active={fieldToSortByinactive[0] === 'subnet' ? true : false}
							direction={fieldToSortByinactive[1]}
							></TableSortLabel></TableCell>
						<TableCell>Activate</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>

			      <div style={{display:'none'}}>
			      	<div ref={inactiveNetworkPageRef}>
				      <JobSiteNetworkPrintable title="Inactive Job Sites" jobsites={sortedInactiveJobsites} />
			      	</div>
			      </div>

					{
						sortedInactiveJobsites.map((site, index) => (
						<InactiveRow {...props} data={site} index={index} setRedirect={setRedirect}/>
						)
					)}
				</TableBody>
			</Table>
		</Paper>
	)
	;
}