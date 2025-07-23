import { Modal } from '../Reusable';
import Checkout from './Checkout';
import type { NavbarSideProps } from './NavbarLeft';
import ShoppingCart from './ShoppingCart';

const NavbarRight = ({ className, isHamburgerMenu }: NavbarSideProps) => {
	const hamburgerMenuSytle = {
		loginRegister: isHamburgerMenu ? 'flex' : 'navbar-side-login-register',
		favorite: isHamburgerMenu ? 'block' : 'navbar-favorite',
	};
	return (
		<div className={className}>
			<button
				disabled
				className={`disable ${hamburgerMenuSytle.loginRegister}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6 max-lg:hidden"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					/>
				</svg>
				<div>Login / Register</div>
			</button>
			<button disabled className="disable">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-6"
				>
					<path
						fillRule="evenodd"
						d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			<Modal component={<ShoppingCart />}>
				<Checkout />
			</Modal>

			<button
				disabled
				className={`disable ${hamburgerMenuSytle.favorite}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
					/>
				</svg>
			</button>
		</div>
	);
};

export default NavbarRight;
