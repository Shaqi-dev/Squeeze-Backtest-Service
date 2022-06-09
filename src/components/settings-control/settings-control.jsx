import React from "react";
import Button from '@mui/material/Button';
import { backtestService } from '../../services';
import './settings-control.css'

export default function SettingsControl({ activeIntervalsSettings }) {
	
	const binds = ["O", "H", "L", "C", "HL", "OC"];
	const minimalVolume = 30;
	const minimalTradesCount = 5;
	const minimalPercentProfitableTrades = 60;
	const minimalProfitPercent = 0;
	const maximalDrawdown = -5;

	const handleStartBacktest = () => {
		backtestService(
			['FLUXUSDT'],
			activeIntervalsSettings,
			binds,
			minimalVolume,
			minimalTradesCount,
			minimalPercentProfitableTrades,
			minimalProfitPercent,
			maximalDrawdown
		);
	}

	const handleCheckSettings = () => {
		console.log('activeIntervalsSettings', activeIntervalsSettings);
	}
    
	return (
		<div className="settings-control">
			<Button
				variant="contained"
				className="settings-control__button"
				onClick={handleStartBacktest}
			>
				Start Backtest
			</Button>
			<Button
				variant="outlined"
				className="settings-control__button settings-control__button_outlined"
				onClick={handleCheckSettings}
			>
				Check Settings
			</Button>
		</div>
	);
}
