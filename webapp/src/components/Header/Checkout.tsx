import './Checkout.css';
import { Divider, InputCounter, useShoppingCart } from '../Reusable';
import { useEffect, useState } from 'react';

const Checkout = () => {
	const {
		cartItems,
		checkoutItems,
		totalCartItems: { price },
	} = useShoppingCart();
	const [show, setShow] = useState(false);

	// This useEffect allows a smooth render, no choppy renders.
	useEffect(() => {
		checkoutItems();
		const showCheckoutTimer = setTimeout(() => setShow(true));
		return () => clearTimeout(showCheckoutTimer);
	}, []);

	return (
		<div className="checkout">
			<div className="checkout-container">
				{show &&
					cartItems.map((cartItem) => {
						return (
							<div key={cartItem.id}>
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
			</div>
			<div className="checkout-total text-color">
				<div>Total</div>
				<div>{`$${price.toFixed(2)}`}</div>
			</div>
			<Divider size="sm" />
			<div className="checkout-buttons">
				<button className="primary-btn">Checkout</button>
			</div>
		</div>
	);
};

export default Checkout;
