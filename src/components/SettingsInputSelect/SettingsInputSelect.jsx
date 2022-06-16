import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SettingsInputSelect({ options, value, onChange }) {
  const menuItems = options.map((option) => (
    <MenuItem
      key={option.label}
      value={option.value}
    >
      {option.label}
    </MenuItem>
  ));

  return (
    <FormControl>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default SettingsInputSelect;
