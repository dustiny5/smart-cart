import { Divider, Modal } from '../Reusable';
import type { Product } from '../type';
import HamburgerMenu from './HamburgerMenu';
import './Navbar.css';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';

export type NavbarProps = {
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
};
const Navbar = ({ onSetShowProductDetails }: NavbarProps) => {
	return (
		<header className="header">
			<nav className="navbar">
				<h3 className="navbar-brand text-color">
					<button onClick={() => onSetShowProductDetails(undefined)}>
						Smart Cart
					</button>
				</h3>
				<div className="navbar-menu">
					<NavbarLeft
						className="navbar-left secondary-text"
						isHamburgerMenu={false}
						onSetShowProductDetails={onSetShowProductDetails}
					/>
					<NavbarRight
						className="navbar-side primary-text"
						isHamburgerMenu={false}
						onSetShowProductDetails={onSetShowProductDetails}
					/>
					<Modal
						isNormalClose={true}
						className="navbar-hamburger primary-text"
						component={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						}
					>
						<HamburgerMenu>
							<NavbarLeft
								className="flex flex-col items-center justify-between gap-y-3 secondary-text"
								isHamburgerMenu={true}
								onSetShowProductDetails={
									onSetShowProductDetails
								}
							/>
							<Divider size="sm" />
							<NavbarRight
								className="flex flex-col items-center gap-y-3 primary-text"
								isHamburgerMenu={true}
								onSetShowProductDetails={
									onSetShowProductDetails
								}
							/>
						</HamburgerMenu>
					</Modal>
				</div>
			</nav>
		</header>
	);
};
export default Navbar;
