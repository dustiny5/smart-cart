import { useState } from 'react';
import './InputCounter.css';
import { useShoppingCart } from '../ShoppingCartProvider';
import type { Product } from '../../type';
import { DEFAULT_MAX, DEFAULT_MIN } from '../../constants';

type InputCounterProps = {
	productDetails: Product;
};

const InputCounter = ({ productDetails }: InputCounterProps) => {
	const {
		findCartItem,
		setCartItemQuantity,
		addCartItems,
		subtractCartItems,
	} = useShoppingCart();

	const initialCartItem = { ...productDetails, quantity: 0 };

	let currentCartItem = findCartItem(productDetails.id) ?? initialCartItem;

	const [count, setCount] = useState(`${currentCartItem.quantity}`);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		if (inputValue === '') {
			setCartItemQuantity(initialCartItem);
			setCount('');
			return;
		}

		const num = Number(inputValue);

		currentCartItem = {
			...currentCartItem,
			quantity: num,
		};

		if (num >= DEFAULT_MIN && num <= DEFAULT_MAX) {
			setCount(inputValue);
			setCartItemQuantity({ ...currentCartItem, quantity: num });
		}
	};

	const handleClickMinus = () => {
		if (Number(count) !== DEFAULT_MIN) {
			setCount((prev) => {
				return String(Number(prev) - 1);
			});
			subtractCartItems(productDetails.id);
		}
	};

	const handleClickPlus = () => {
		if (Number(count) !== DEFAULT_MAX) {
			setCount((prev) => {
				currentCartItem = {
					...currentCartItem,
					quantity: Number(prev) + 1,
				};
				return String(Number(prev) + 1);
			});
			addCartItems(currentCartItem);
		}
	};

	return (
		<div className="input-counter">
			<button className="primary-text px-2.5" onClick={handleClickMinus}>
				-
			</button>
			{/* disable spinner: the style is located in index.html */}
			<input
				min={DEFAULT_MIN}
				max={DEFAULT_MAX}
				className="no-spinner"
				type="number"
				value={count}
				onInput={handleInput}
				onKeyDown={(e) => {
					if (e.key === '-') {
						e.preventDefault();
					}
				}}
			/>
			<button className="primary-text px-2" onClick={handleClickPlus}>
				+
			</button>
		</div>
	);
};

export default InputCounter;
