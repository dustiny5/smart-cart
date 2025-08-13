import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import type { CartItem } from '../type';
import { DEFAULT_MAX, DEFAULT_MIN } from '../constants';

type ShoppingCartProviderProps = {
	children: ReactNode;
};
type ShoppingCartContextType = {
	cartItems: CartItem[];
	findCartItem: (id: number) => CartItem | undefined;
	setCartItemQuantity: (cartItem: CartItem) => void;
	addCartItems: (cartItem: CartItem) => void;
	subtractCartItems: (id: number) => void;
	removeCartItem: (id: number) => void;
	clearCart: () => void;
	totalCartItems: { total: number; price: number };
	checkoutItems: () => void;
};
const ShoppingCartContext = createContext<ShoppingCartContextType>(
	{} as ShoppingCartContextType
);
const STORAGE_KEY = 'smart-cart-items';

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedItems = localStorage.getItem(STORAGE_KEY);
		const storedCartItems = storedItems ? JSON.parse(storedItems) : [];

		if (storedCartItems.length > 0) {
			setCartItems(storedCartItems);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
	}, [cartItems]);

	const totalCartItems = cartItems.reduce(
		(sum, item) => {
			sum.total += item.quantity;
			sum.price += item.quantity * item.price;
			return sum;
		},
		{ total: 0, price: 0 }
	);

	const checkoutItems = () => {
		const filteredCartItems = cartItems.filter(
			(cartItem) => cartItem.quantity !== 0
		);
		setCartItems(filteredCartItems);
	};
	const clearCart = () => setCartItems([]);

	const findCartItem = (id: number) =>
		cartItems.find((cartItem) => cartItem.id === id);

	const removeCartItem = (id: number) =>
		setCartItems((prev) =>
			prev.filter((prevCartItem) => prevCartItem.id !== id)
		);

	const setCartItemQuantity = (cartItem: CartItem) =>
		setCartItems((prev) => {
			if (!findCartItem(cartItem.id)) {
				return [...prev, cartItem];
			}

			return prev.map((prevCartItem) => {
				if (prevCartItem.id === cartItem.id) {
					return { ...prevCartItem, quantity: cartItem.quantity };
				}
				return prevCartItem;
			});
		});

	const addCartItems = (cartItem: CartItem) =>
		setCartItems((prev) => {
			if (!findCartItem(cartItem.id)) {
				return [...prev, cartItem];
			}
			return prev.map((prevCartItem) => {
				if (
					prevCartItem.id === cartItem.id &&
					cartItem.quantity < DEFAULT_MAX
				) {
					return {
						...prevCartItem,
						quantity: prevCartItem.quantity + 1,
					};
				}
				return prevCartItem;
			});
		});

	const subtractCartItems = (id: number) =>
		setCartItems((prev) => {
			return prev.map((prevCartItem) => {
				if (
					prevCartItem.id === id &&
					prevCartItem.quantity > DEFAULT_MIN
				) {
					return {
						...prevCartItem,
						quantity: prevCartItem.quantity - 1,
					};
				}
				return prevCartItem;
			});
		});

	return (
		<ShoppingCartContext.Provider
			value={{
				cartItems,
				setCartItemQuantity,
				findCartItem,
				addCartItems,
				subtractCartItems,
				removeCartItem,
				clearCart,
				totalCartItems,
				checkoutItems,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
