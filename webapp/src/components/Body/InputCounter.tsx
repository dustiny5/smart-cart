import { useState } from 'react';
import './InputCounter.css';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 99;

const InputCounter = () => {
	const [count, setCount] = useState('');

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		if (inputValue === '') {
			setCount('');
			return;
		}

		const num = Number(inputValue);

		if (num < DEFAULT_MIN) setCount(String(DEFAULT_MIN));
		else if (num > DEFAULT_MAX) setCount(String(DEFAULT_MAX));
		else setCount(inputValue);
	};

	const handleClickMinus = () => {
		setCount((prev) => {
			if (prev === String(DEFAULT_MIN) || prev === '')
				return String(DEFAULT_MIN);
			return String(Number(prev) - 1);
		});
	};

	const handleClickPlus = () => {
		setCount((prev) => {
			if (prev === String(DEFAULT_MAX)) return prev;
			return String(Number(prev) + 1);
		});
	};

	return (
		<div className="input-counter">
			<button className="primary-text px-2.5" onClick={handleClickMinus}>
				-
			</button>
			{/* disable spinner: the style is located in index.html */}
			<input
				className="no-spinner"
				type="number"
				value={count}
				onInput={handleInput}
			/>
			<button className="primary-text px-2" onClick={handleClickPlus}>
				+
			</button>
		</div>
	);
};

export default InputCounter;
