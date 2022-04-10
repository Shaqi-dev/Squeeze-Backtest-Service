import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
	options,
	defaultValue,
	minWidth,
	onChange,
}) {
	const [value, setValue] = React.useState(defaultValue);

	const handleChange = (event) => {
		setValue(event.target.value);
		onChange(event);
	};

	const menuItems = options.map((option) => {
		return (
			<MenuItem key={option.label} value={option.value}>
				{option.label}
			</MenuItem>
		);
	});

	return (
		<FormControl sx={{ m: 1, minWidth: minWidth }}>
			<Select
				value={value}
				onChange={handleChange}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}>
				{menuItems}
			</Select>
		</FormControl>
	);
}
