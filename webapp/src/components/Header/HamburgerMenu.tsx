import { useEffect, useState, type ReactNode } from 'react';
import './HamburgerMenu.css';

type HamburgerMenuProps = {
	children: ReactNode;
};
const HamburgerMenu = ({ children }: HamburgerMenuProps) => {
	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => () => setIsMounted(false), []);

	return (
		<div
			className={`hamburger-menu hamburger-menu-animate ${
				isMounted ? 'translate-x-100' : 'translate-x-0'
			}`}
		>
			{children}
		</div>
	);
};

export default HamburgerMenu;
