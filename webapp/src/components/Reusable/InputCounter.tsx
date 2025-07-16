import './InputCounter.css';
import { useShoppingCart } from './ShoppingCartProvider';
import type { Product } from '../type';
import { DEFAULT_MAX, DEFAULT_MIN } from '../constants';

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

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		if (inputValue === '') {
			setCartItemQuantity(initialCartItem);
			return;
		}

		const num = Number(inputValue);

		currentCartItem = {
			...currentCartItem,
			quantity: num,
		};

		if (num >= DEFAULT_MIN && num <= DEFAULT_MAX) {
			setCartItemQuantity({ ...currentCartItem, quantity: num });
		}
	};

	const handleClickMinus = () => {
		if (Number(currentCartItem.quantity) !== DEFAULT_MIN) {
			subtractCartItems(productDetails.id);
		}
	};

	const handleClickPlus = () => {
		if (Number(currentCartItem.quantity) !== DEFAULT_MAX) {
			currentCartItem = {
				...currentCartItem,
				quantity: currentCartItem.quantity + 1,
			};
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
				className="no-spinner text-color"
				type="number"
				value={currentCartItem.quantity}
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
