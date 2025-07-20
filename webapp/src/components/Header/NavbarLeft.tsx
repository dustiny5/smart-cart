import { Modal } from '../Reusable';
import DropDown from './DropDown';
import type { NavbarProps } from './Navbar';

// isHamburgerMenu helps style the DropDown properly
export type NavbarSideProps = {
	isHamburgerMenu: boolean;
	className?: string;
};

const NavbarLeft = ({
	className,
	isHamburgerMenu,
	onSetResetToggle,
	onHandleHomeClick,
	onSetShowProductDetails,
}: NavbarProps & NavbarSideProps) => {
	return (
		<div className={className}>
			<button onClick={onHandleHomeClick}>Home</button>
			<Modal
				name="Shop"
				component={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m19.5 8.25-7.5 7.5-7.5-7.5"
						/>
					</svg>
				}
			>
				<DropDown
					isHamburgerMenu={isHamburgerMenu}
					onSetResetToggle={onSetResetToggle}
					onSetShowProductDetails={onSetShowProductDetails}
				/>
			</Modal>

			<button>About</button>
			<button>Blog</button>
			<button>Contact</button>
			<button>Pages</button>
		</div>
	);
};

export default NavbarLeft;
