import './Checkout.css';
import { Divider, InputCounter, useShoppingCart } from '../Reusable';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { CheckoutRequestBody, CheckoutResponse } from '../type';

const Checkout = () => {
	const {
		cartItems,
		checkoutItems,
		totalCartItems: { price },
	} = useShoppingCart();
	const [show, setShow] = useState(false);

	const { isSuccess, isPending, data, error, mutate } =
		useMutation<CheckoutResponse>({
			mutationFn: async () => {
				const checkoutRequestBody: CheckoutRequestBody = {
					items: cartItems.map((item) => {
						return {
							name: item.name,
							price: item.price * 100,
							quantity: item.quantity,
						};
					}),
				};
				const response = await fetch(
					import.meta.env.VITE_SMART_CART_API_URL +
						'/create/checkout-session',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(checkoutRequestBody),
					}
				);
				return await response.json();
			},
		});

	// This useEffect allows a smooth render, no choppy renders.
	useEffect(() => {
		checkoutItems();
		const showCheckoutTimer = setTimeout(() => setShow(true));
		return () => clearTimeout(showCheckoutTimer);
	}, []);

	const handleCheckoutClick = () => mutate();

	useEffect(() => {
		isSuccess && (window.location.href = data.sessionUrl);
	}, [handleCheckoutClick]);
	return (
		<div className="checkout">
			{show &&
				cartItems.map((cartItem) => {
					return (
						<div className="checkout-container" key={cartItem.id}>
							<div className="checkout-product">
								<img
									key={cartItem.id}
									src={cartItem.imageUrl}
									alt={cartItem.name}
								/>
								<div className="checkout-details-info">
									<h4 className="text-color">
										{cartItem.name}
									</h4>
									<h3 className="text-color">{`$${cartItem.price}`}</h3>
									<div className="secondary-text">
										{cartItem.description}
									</div>
								</div>
								<InputCounter productDetails={cartItem} />
							</div>
							<Divider size="sm" lineColor="lightGray" />
						</div>
					);
				})}
			<div className="checkout-total text-color">
				<div>Total</div>
				<div>{`$${price.toFixed(2)}`}</div>
			</div>
			<Divider size="sm" />
			<div className="checkout-buttons">
				<button onClick={handleCheckoutClick} className="primary-btn">
					Checkout
				</button>
			</div>
			{isPending && 'Loading ...'}
			{error && 'Please try again'}
		</div>
	);
};

export default Checkout;
