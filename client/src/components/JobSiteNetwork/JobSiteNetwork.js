import React, { useState, useRef} from 'react';
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
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';
import ReactToPrint from 'react-to-print';

import './JobSiteNetwork.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
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

function EquipmentButton({path, name}) {
        const classes = equipmentStyles();
        return <Button href="#text-buttons" className={classes.button}>
                <Link style={{textDecoration:'none',color:'black'}} to={path}>{name}</Link>
                </Button>;       
}
function SortButton({action, name}) {
        const classes = equipmentStyles();
        return <a onClick={action} style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.54)'}} href="#text-buttons" className={classes.button}>
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
const EditButton = ({path}) => {
  const classes = useStyles();
	return (
      <Fab color="primary" aria-label="Edit" className={classes.fab}>
        <EditIcon>edit_icon</EditIcon>
      </Fab>
	);
};
const rowStyle = {
	backgroundColor: 'black'
};
const Row = (props) => (
	<TableRow className={`site-row ${(props.index+1)%2 === 0 ? 'network-even' : 'network-odd'} `}>
		<TableCell><EquipmentButton path={`/site/${props.data._id}`} name={props.data.name}/></TableCell>
		<TableCell>{props.data.subnet || `none`}</TableCell>
		<TableCell><DeleteButton {...props} action={handleDelete(props.data._id, props.setRedirect)}/></TableCell>
		<TableCell><Link to={`/edit/${props.data._id}`}><EditButton/></Link></TableCell>
	</TableRow>
);

export default function JobSiteNetwork(props) {
	const [redirect, setRedirect] = useState(false);
	const [fieldToSortBy, setField] = useState(['name', 'asc']);
	const componentRef = useRef();

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
	function convertSubnetToInt(site) {
		let obj = site;
		const subnetAsInt = parseInt(site.subnet);
		obj.subnet = subnetAsInt;
		return obj;
	}
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			{redirect ? <Redirect to="/network"/> : null}
			<ReactToPrint
				trigger={() => <button>Print</button>}
				content={() => componentRef.current}
				/>
			<Table ref={componentRef} className={classes.table}>
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
						<TableCell>Delete</TableCell>
						<TableCell>Edit</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{_.orderBy(_.map(props.jobsites, convertSubnetToInt), fieldToSortBy[0], fieldToSortBy[1]).map((site, index) => (
						<Row {...props} data={site} index={index} setRedirect={setRedirect}/>
						)
					)}
				</TableBody>
			</Table>
		</Paper>
	)
	;
}