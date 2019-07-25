import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import JobSiteCard from './JobSiteCard';
import TextField from '@material-ui/core/TextField';

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
}));

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(10);
  const [jobsites, setJobsites] = React.useState([]);
  const [filteredSites, setFilteredSites] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const classes = useStyles();

  useEffect(() => {
    setJobsites(props.sites);
    filterJobSites(filter);
  });

  function handleChange(event, value) {
    setSpacing(Number(value));
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
      <Grid style={{marginTop:'3em'}} container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {
              filteredSites.length !== 0
              ?
              _.orderBy(filteredSites, ["name"], ["asc"]).map(site => (
              <Grid key={site._id} >
               <JobSiteCard data={site} />
              </Grid>
              ))
              : `None found`
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}