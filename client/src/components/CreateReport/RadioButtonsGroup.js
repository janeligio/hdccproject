import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Connection Type</FormLabel>
        <RadioGroup
          aria-label="connectionType"
          name="connectionType"
          className={classes.group}
          value={props.value}
          onChange={props.handleChange}
        >
        <div style={{display:'flex'}}>
          <FormControlLabel value="DIA" control={<Radio />} label="DIA" />
          <FormControlLabel value="EIPDS" control={<Radio />} label="EIPDS" />
          <FormControlLabel value="Satellite" control={<Radio />} label="Satellite" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}