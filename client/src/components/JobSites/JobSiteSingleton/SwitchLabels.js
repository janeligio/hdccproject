import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {

  return (
    <FormGroup style={{margin:0}} row>
      <FormControlLabel
        control={
          <Switch
            checked={props.active}
            onChange={props.handleChange('active')}
            value="active"
            color="primary"
          />
        }
      />
    </FormGroup>
  );
}