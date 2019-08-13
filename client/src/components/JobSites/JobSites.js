import React, { useEffect, useRef, useCallback } from 'react';
import './JobSites.css';
import JobSiteGrid from './JobSiteSingleton/JobSiteGrid';
import ReactToPrint from 'react-to-print';
import JobSite from './JobSiteSingleton/JobSite';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function ViewGridButton({action, disabled}) {
  const classes = useStyles();
  return (
      <IconButton style={{marginTop:'1.3em'}} color={disabled ? `primary` : 'default'} onClick={action} className={classes.button} aria-label="view-grid">
        <ViewModuleIcon/>
      </IconButton>
  );
}
function ViewDetailedButton({action, disabled}) {
  const classes = useStyles();
  return (
      <IconButton style={{marginLeft:0,padding:'0.2',marginTop:'1.3em'}} color={disabled ? `primary` : 'default'} onClick={action} className={classes.button} aria-label="view-detailed">
        <ViewStreamIcon/>
      </IconButton>
  );
}

export default function JobSites(props) {
  const classes = useStyles();
  const [jobsites, setJobsites] = React.useState(props.jobsites);
  const [filteredSites, setFilteredSites] = React.useState(jobsites);
  const [filter, setFilter] = React.useState({
    name: '',
    filterByDate: '',
    filterByActive: true,
    filterByInactive: true,
    keywords: []
  });
  const [view, setView] = React.useState('view-grid');
  const [open, setOpen] = React.useState(false);
  const [ref] = React.useState(useRef());

  useEffect(() => {
    setJobsites(props.jobsites);
}, [props.jobsites]);

  function setGridView() {
    if(view === 'view-detailed') {
      setView('view-grid');
    }
  }
  function setDetailedView() {
    if(view === 'view-grid') {
      setView('view-detailed');
    }
  }
  function toggleSelect() {
    setOpen(!open);
  }
  const handleFilterChange = field => event => {
    setFilter({...filter, [field]: event.target.value});
  }
  const handleCheckBox = field => event => {
    setFilter({ ...filter, [field]: event.target.checked });
  }
  const filterJobSites = useCallback( () => {
    let filteredSites = jobsites;
    if(filter.name.length !== 0) {
      filteredSites = _.filter(filteredSites, site => {
        const siteData = 
          `${site.subnet.toLowerCase()} ${site.name.toLowerCase()} 
          ${site.connectionType.toLowerCase()} ${site.circuitID.toLowerCase()} 
          ${site.externalIP.toLowerCase()} ${site.internalIP.toLowerCase()}`;
        return _.some(filter.name.trim().split(" "), keyword => _.includes(siteData, keyword));
      });
    }
    //   filteredSites = _.filter(filteredSites, site => {
    //     let name = site.name.toLowerCase();
    //     return name.indexOf(filter.name.toLowerCase()) !== -1
    //   });
    // // }

    if(filter.filterByDate !== '') {
        // Case by case filter by date
        switch(filter.filterByDate) {
          case 'subnet-desc':
            filteredSites = _.sortBy(filteredSites, 'subnet', 'desc')
            break;
          case 'subnet-asc':
            filteredSites = _.sortBy(filteredSites, 'subnet', 'desc').reverse()
            break;          
          case 'most-recently-updated':
            filteredSites = filterDate(filteredSites, 'lastUpdated', 'desc')
            break;          
          case 'least-recently-updated':
            filteredSites = filterDate(filteredSites, 'lastUpdated', 'asc')
            break;
          case 'most-recently-created':
            filteredSites = filterDate(filteredSites, 'date', 'desc')
            break;
          case 'least-recently-created':
            filteredSites = filterDate(filteredSites, 'date', 'asc')
            break;
          default:
        }
    }

    // Filter by active/inactive
    if(filter.filterByActive && filter.filterByInactive) {

    } else if(!filter.filterByActive && !filter.filterByInactive) {

    } else {
      if(filter.filterByActive) {
        filteredSites = _.filter(filteredSites, o => o.active);
      }
      if(filter.filterByInactive) {
          filteredSites = _.filter(filteredSites, o => !o.active);
      }
    }

  // Filter by keywords

    setFilteredSites(filteredSites);
  }, [filter, jobsites]);

  useEffect(() => {
    filterJobSites();
    }, [filter, filterJobSites]);

  function filterDate(arr, field, ascOrDesc) {
    return _.orderBy(arr, site => {
  //2019-07-19T23:55:36.632Z
  // console.log(new moment(site[field]).format('YYYYMMDD'))
      return moment(site[field]);
    }, [ascOrDesc]);
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
        <div style={{display:'flex',flexWrap: 'wrap'}}>
        <TextField
	        id="Search"
	        label="Search:"
	        className={classes.textField}
	        value={filter.name}
	        onChange={handleFilterChange('name')}
	        margin="normal"
	      />
        <FormGroup style={{marginTop:'1em'}} row>
          <FormControlLabel
            control={
              <Checkbox
                checked={filter.filterByActive}
                onChange={handleCheckBox('filterByActive')}
                value="filterByActive"
                color="primary"
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filter.filterByInactive}
                onChange={handleCheckBox('filterByInactive')}
                value="filterByInactive"
                color="primary"
              />
            }
            label="Inactive"
          />
          </FormGroup>
          <FormControl style={{marginTop:'1em'}} className={classes.formControl}>
            <InputLabel htmlFor="sort-by">Sort by</InputLabel>
            <Select
              open={open}
              onClose={toggleSelect}
              onOpen={toggleSelect}
              value={filter.filterByDate}
              onChange={handleFilterChange('filterByDate')}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={'subnet-desc'}>Subnet (Low-High)</MenuItem>
              <MenuItem value={'subnet-asc'}>Subnet (High-Low)</MenuItem>
              <MenuItem value={'most-recently-updated'}>Date updated (newest)</MenuItem>
              <MenuItem value={'least-recently-updated'}>Date updated (oldest)</MenuItem>
              <MenuItem value={'most-recently-created'}>Date created (newest)</MenuItem>
              <MenuItem value={'least-recently-created'}>Date created (oldest)</MenuItem>
            </Select>
          </FormControl>

        <ViewGridButton disabled={view === 'view-grid'} action={setGridView}/>
        <ViewDetailedButton disabled={view === 'view-detailed'} action={setDetailedView} />
        <ReactToPrint
          trigger={() => <button style={hideButtonStyle}><PrintButton/></button>}
          content={() => ref.current}
        />
        </div>
   	    <div ref={ref}>
          {view === 'view-grid' ? grid() : sites()}
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