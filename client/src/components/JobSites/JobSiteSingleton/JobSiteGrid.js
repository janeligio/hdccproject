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
  const classes = useStyles();


  return (
    <div>

      <Grid style={{marginTop:'3em'}} container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {
              props.sites.length !== 0
              ?
              _.orderBy(props.sites, ["name"], ["asc"]).map(site => (
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