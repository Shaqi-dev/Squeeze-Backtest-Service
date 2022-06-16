import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SettingsInputCheckbox({ label, onChange, checked }) {
  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={checked}
          onChange={onChange}
        />
      )}
      label={label}
    />
  );
}

export default SettingsInputCheckbox;
