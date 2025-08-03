import { Modal } from '../Reusable';
import type { Product } from '../type';
import Checkout from './Checkout';
import LoginRegister from './LoginRegister';
import type { NavbarSideProps } from './NavbarLeft';
import SearchInput from './SearchInput';
import ShoppingCart from './ShoppingCart';

type NavbarRight = NavbarSideProps & {
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
};

const NavbarRight = ({
	className,
	isHamburgerMenu,
	onSetShowProductDetails,
}: NavbarRight) => {
	const hamburgerMenuSytle = {
		loginRegister: isHamburgerMenu ? 'flex' : 'navbar-side-login-register',
		favorite: isHamburgerMenu ? 'block' : 'navbar-favorite',
	};
	return (
		<div className={className}>
			<LoginRegister className={hamburgerMenuSytle.loginRegister} />
			<SearchInput
				isHamburgerMenu={isHamburgerMenu}
				onSetShowProductDetails={onSetShowProductDetails}
			/>
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
