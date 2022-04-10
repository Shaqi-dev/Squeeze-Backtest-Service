import React, { useState } from "react";
import { useSelector } from "react-redux";
import SettingsIntervals from "../settings-intervals";
import SettingsControl from "../settings-control";
import "./backtest.css";

export default function Backtest() {
	const intervals = useSelector(state => state.intervals);
	const intervalsLabels = Object.keys(intervals)
	const activeIntervals = intervalsLabels.filter(label => intervals[label].active === true);
	
	const activeIntervalsSettings = activeIntervals.map(interval => [interval, intervals[interval]['range'], intervals[interval]['configs'], intervals[interval]['maxBars']])

	function useForceUpdate() {
		const [, setValue] = useState(0); // integer state
		return () => setValue(value => value + 1); // update the state to force render
	}
		const forceUpdate = useForceUpdate();

	const intervalsSettingsForms = Object.keys(intervals).map((interval) => <SettingsIntervals key={interval} interval={interval} forceUpdate={forceUpdate}/>);

	return (
		<>
			<div className="backtest__intervals settings-intervals">
				<ul className="settings-intervals__labels">
					<li>Interval</li>
					<li>Range</li>
					<li>Configs</li>
					<li>Max bars</li>
				</ul>
				{intervalsSettingsForms}
			</div>
			<SettingsControl activeIntervalsSettings={activeIntervalsSettings}/>
		</>
	);
}
