import React, { useState } from "react";
import { useSelector } from "react-redux";
import BacktestSettingsControl from "./backtest-settings-control";
import IntervalsSettings from "./intervals-settings";
import "./backtest-settings.css";

export default function BacktestSettings() {
	const intervals = useSelector(state => state.intervals);
	const intervalsLabels = Object.keys(intervals)
	const activeIntervals = intervalsLabels.filter(label => intervals[label].active === true);
	
	const activeIntervalsSettings = activeIntervals.map(interval => [interval, intervals[interval]['range'], intervals[interval]['configs'], intervals[interval]['maxBars']])

	function useForceUpdate() {
		const [, setValue] = useState(0); // integer state
		return () => setValue(value => value + 1); // update the state to force render
	}
		const forceUpdate = useForceUpdate();

	const intervalsSettingsForms = Object.keys(intervals).map((interval) => <IntervalsSettings key={interval} interval={interval} forceUpdate={forceUpdate}/>);

	return (
		<>
			<div className="backtest-settings__intervals itntervals-settings">
				<div className="intervals-settings__labels">
					<div className="itntervals-settings__labels-item">Interval</div>
					<div className="itntervals-settings__labels-item">Range</div>
					<div className="itntervals-settings__labels-item">Configs</div>
					<div className="itntervals-settings__labels-item">Max bars</div>
				</div>
				<div className="intervals-settings__forms">
					{intervalsSettingsForms}
				</div>	
			</div>
			<BacktestSettingsControl activeIntervalsSettings={activeIntervalsSettings}/>
		</>
	);
}
