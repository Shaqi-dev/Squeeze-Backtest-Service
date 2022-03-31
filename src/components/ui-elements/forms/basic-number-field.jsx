import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function BasicNumberField({
    defaultValue,
	minValue,
	maxValue,
    minLength,
    maxLength,
    step,
    onChange,
}) { 
    function handleChange(event) {
		const input = event.target;
		if (maxLength) {
			input.value = input.value.slice(0, maxLength)
		}
		if (input.value > maxValue) {
			input.value = maxValue;
		}
		if (input.value < minValue) {
			input.value = minValue;
		}
		onChange(event);
	}
  
    return (
        <TextField
        type="number"
        defaultValue={defaultValue}
        InputProps={{
            inputProps: {
                inputMode: 'numeric', 
                pattern: '[0-9]*',               
                min: minValue,
                max: maxValue,
                minLength: minLength,
                maxLength: maxLength,
                step: step,    
            },
        }}
        onChange={handleChange}       
        />
  );
}