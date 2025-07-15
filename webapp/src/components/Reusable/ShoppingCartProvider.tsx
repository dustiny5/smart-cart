import { createContext, useContext, useState, type ReactNode } from 'react';
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
	totalCartItems: number;
};
const ShoppingCartContext = createContext<ShoppingCartContextType>(
	{} as ShoppingCartContextType
);

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const totalCartItems = cartItems.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	const clearCart = () => setCartItems([]);

	const findCartItem = (id: number) =>
		cartItems.find((cartItem) => cartItem.id === id);

	const removeCartItem = (id: number) => {
		setCartItems((prev) =>
			prev.filter((prevCartItem) => prevCartItem.id !== id)
		);
	};

	const setCartItemQuantity = (cartItem: CartItem) => {
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
	};

	const addCartItems = (cartItem: CartItem) => {
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
	};

	const subtractCartItems = (id: number) => {
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
	};

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
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
