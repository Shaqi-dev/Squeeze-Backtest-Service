import React from "react";
import Button from '@mui/material/Button';
import { backtestService } from '../../services';

export default function BacktestSettingsControl({ activeIntervalsSettings }) {
	
	const binds = ["O", "H", "L", "C", "HL", "OC"];
	const minimalVolume = 30;
	const minimalTradesCount = 5;
	const minimalPercentProfitableTrades = 60;
	const minimalProfitPercent = 0;
	const maximalDrawdown = -5;

	const handleStartBacktest = () => {
		backtestService(
			['JASMYUSDT'],
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
		<div className="backtest-control">
			<Button
				variant="contained"
				className="time-settings__button"
				onClick={handleStartBacktest}
			>
				Start Backtest
			</Button>
			<Button
				variant="contained"
				className="time-settings__button"
				onClick={handleCheckSettings}
			>
				Check Settings
			</Button>
		</div>
	);
}
