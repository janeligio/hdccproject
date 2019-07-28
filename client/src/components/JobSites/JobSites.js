import React, { useEffect, useRef } from 'react';
import './JobSites.css';
import JobSiteGrid from './JobSiteSingleton/JobSiteGrid';
import ReactToPrint from 'react-to-print';
import JobSite from './JobSiteSingleton/JobSite';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 420,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  margin: {
    margin: '25px 0 0 10px',
  },
}));
export default function JobSites(props) {
  const classes = useStyles();
  const [jobsites, setJobsites] = React.useState([]);
  const [filteredSites, setFilteredSites] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [value, setValue] = React.useState('card');
  const [ref] = React.useState(useRef());

  useEffect(() => {
    setJobsites(props.jobsites);
    filterJobSites(filter);
  });

  function handleRadioChange(event) {
    setValue(event.target.value);
  }  
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }
  function filterJobSites(filter) {
    let filteredSites = jobsites;
    filteredSites = _.filter(filteredSites, site => {
      let name = site.name.toLowerCase();
      return name.indexOf(filter.toLowerCase()) !== -1
    });
    setFilteredSites(filteredSites);
  }

	function grid() {
		return	<JobSiteGrid sites={filteredSites}/>;
	}
	function sites() {
		return filteredSites.map(site => (
			<JobSite key={site._id} data={site}/>
			));
	}

	return (
	<div>
	    <TextField
	        id="filter"
	        label="Filter:"
	        className={classes.textField}
	        value={filter}
	        onChange={handleFilterChange}
	        margin="normal"
	      />		
   		<FormControl classes={{root: 'radio-container'}} component="fieldset">
    	  <FormLabel classes={{
    	  	root: 'radio-legend'
    	  }} component="legend">View</FormLabel>
      		<RadioGroup aria-label="position" name="position" value={value} onChange={handleRadioChange} row>
		      	<FormControlLabel
		          value="card"
		          control={<Radio color="primary" />}
		          label="Card"
		          labelPlacement="end"
		        />
   		        <FormControlLabel
		          value="detailed"
		          control={<Radio color="primary" />}
		          label="Detailed"
		          labelPlacement="end"
		        />
	 		</RadioGroup>
	    </FormControl>
        <ReactToPrint
          trigger={() => <button style={hideButtonStyle}><PrintButton/></button>}
          content={() => ref.current}
        />
   	    <div ref={ref}>
	      {value === 'card' ? grid() : sites()}
		</div>
	</div> 	
      );
}

const hideButtonStyle = {
  backgroundColor: 'white',
  border: 'none',
  padding: 0,
  margin: '0 0 0 5px'
};

function PrintButton(){
  const classes = useStyles();
	return (
		 <Button size="small" className={classes.margin}>
          print all
        </Button>)
}