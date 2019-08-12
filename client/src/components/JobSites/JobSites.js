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
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

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
  const [jobsites, setJobsites] = React.useState([]);
  const [filteredSites, setFilteredSites] = React.useState([]);
  const [filter, setFilter] = React.useState({
    name: '',
    filterByDate: '',
    filterByActive: '',
    keywords: []
  });
  const [view, setView] = React.useState('view-grid');
  const [ref] = React.useState(useRef());

  useEffect(() => {
    setJobsites(props.jobsites);
    filterJobSites(filter);
  });

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
  const handleFilterChange = (field) => (event) => {
    setFilter({[field]: event.target.value});
  }
  function filterJobSites(filter) {
    let filteredSites = jobsites;
    if(filter.name.length !== 0) {
      filteredSites = _.filter(filteredSites, site => {
        let name = site.name.toLowerCase();
        return name.indexOf(filter.name.toLowerCase()) !== -1
      });
    } 

    if(filter.filterByDate !== '') {
      filteredSites = _.filter(filteredSites, site => {
        // Case by case filter by date
        switch(filter.filterByDate) {
          case 'most-recently-updated':
            filteredSites = filterDate(filteredSites, 'lastUpdated', 'asc')
            break;
          case 'least-recently-updated':
            filteredSites = filterDate(filteredSites, 'lastUpdated', 'desc')
            break;
          case 'most-recently-created':
            filteredSites = filterDate(filteredSites, 'date', 'asc')
            break;
          case 'least-recently-created':
            filteredSites = filterDate(filteredSites, 'date', 'desc')
            break;
          default:
            break;
        }
      })
    }
    // Filter by active/inactive
    if(filter.filterByActive !== '') {
      if(filter.filterByActive === 'active') {
        filteredSites = _.filter(filteredSites, o => o.active);
      } else {
        filteredSites = _.filter(filteredSites, o => !o.active);
      }
    }
    // Filter by keywords

    setFilteredSites(filteredSites);
  }

  function filterDate(arr, field, ascOrDesc) {
    return _.orderBy(arr, (o: any) => {
      return moment(o[field].format('YYYYMMDD');
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
        <div style={{display:'flex'}}>
        <TextField
	        id="Search"
	        label="Search:"
	        className={classes.textField}
	        value={filter.name}
	        onChange={handleFilterChange('name')}
	        margin="normal"
	      />

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