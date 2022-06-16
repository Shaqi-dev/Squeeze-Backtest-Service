import React from 'react';
import TextField from '@mui/material/TextField';

function SettingsInputNumber({
  value,
  min,
  max,
  minLength,
  maxLength,
  step,
  onChange,
}) {
  const inputProps = {
    min,
    max,
    minLength,
    maxLength,
    step,
  };

  const handleChange = (e) => {
    const input = e.target;

    if (maxLength) {
      input.value.slice(0, maxLength);
    }

    if (input.value > max) {
      input.value = max;
    } if (input.value < min) {
      input.value = min;
    }

    onChange(+input.value);
  };

  return (
    <TextField
      type="number"
      value={value}
      inputProps={inputProps}
      onChange={handleChange}
    />
  );
}

export default SettingsInputNumber;
