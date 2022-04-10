import React from "react";
import { CheckboxWithLabel, BasicSelect, BasicNumberField } from "../ui-elements/forms";
import { useDispatch, useSelector } from "react-redux";
import { setActivity, setRange, setConfigs, setMaxBars } from "../../store/intervals/intervals";

export default function IntervalsSettings({ interval, forceUpdate }) {
    const dispatch = useDispatch();
	const intervals = useSelector(state => state.intervals);

    const rangeOptions = [
		{ value: "last12h", label: "12 hours" },
		{ value: "last24h", label: "24 hours" },
		{ value: "last48h", label: "48 hours" },
		{ value: "last72h", label: "72 hours" },
		{ value: "last1w", label: "1 week" },
		{ value: "last2w", label: "2 weeks" },
		{ value: "last4w", label: "4 weeks" },
	];

	const configOptions = [
		{ value: 'configsHR', label: "High Risk" },
		{ value: 'configsMR', label: "Medium Risk" },
	];

    const handleChangeCheckbox = (e) => {
        forceUpdate()
        dispatch(setActivity(interval, e.target.checked))
    }

    const handleChangeRange = (e) => {
        forceUpdate()
        dispatch(setRange(interval, e.target.value))
    }

    const handleChangeConfigs = (e) => {
        forceUpdate()
        dispatch(setConfigs(interval, e.target.value))
    }

    const handleChangeMaxBars = (e) => {
        forceUpdate()
        dispatch(setMaxBars(interval, e.target.value))
    } 

    return (
        <form id={interval} key={interval} className="intervals-settings__form">
            <CheckboxWithLabel
                key={`${interval}-active`}
                label={interval}
                className="intervals-setting__item"
                onChange={(e) => handleChangeCheckbox(e)}
            />
            <BasicSelect
                key={`${interval}-range`}
                options={rangeOptions}
                className="intervals-settings__item"
                defaultValue={intervals[interval]["range"]}
                minWidth={120}
                onChange={(e) => handleChangeRange(e)}
            />
            <BasicSelect
                key={`${interval}-configs`}      
                options={configOptions}
                className="intervals-settings__item"
                defaultValue={intervals[interval]["configs"]}
                minWidth={120}
                onChange={(e) => handleChangeConfigs(e)}
            />    
            <BasicNumberField
                key={`${interval}-max-bars`}
                type="number"
                className='intervals-settings__item'
                defaultValue={intervals[interval]["maxBars"]}
                minValue={0}
                maxValue={1000}
                minLength={1}
                maxLength={4}
                step={1}
                onChange={(e) => handleChangeMaxBars(e)}
            />
        </form>
    );
}