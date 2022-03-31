import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxWithLabel({ label }) {
	const [checked, setChecked] = React.useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<FormGroup>
			<FormControlLabel
				control={<Checkbox
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />}
				label={label}
			/>
		</FormGroup>
	);
}
