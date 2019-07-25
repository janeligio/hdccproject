import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import JobSiteCard from './JobSiteCard';
import TempCard from './TempCard';

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
}));

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(10);
  const classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }

  return (
    <Grid style={{marginTop:'3em'}} container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {props.sites.map(site => (
            <Grid key={site._id} >
             <TempCard data={site} />
            </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}