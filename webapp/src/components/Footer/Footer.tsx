import type { ReactNode } from 'react';
import Divider from '../Reusable/Divider';
import './Footer.css';

type FooterProps = {
	children: ReactNode;
};

const Footer = ({ children: links }: FooterProps) => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-title">
				<h3>Smart Cart</h3>
				<div className="footer-socials">
					<a href="https://www.facebook.com">
						<img src="icon_facebook.svg" />
					</a>
					<a href="https://www.x.com">
						<img src="icon_x.svg" />
					</a>
					<a href="https://www.instagram.com">
						<img src="icon_instagram.svg" />
					</a>
				</div>
			</div>
			<Divider size="sm" lineColor="lightGray" />
			<Divider size="sm" />
			{links}
			<Divider size="md" />
			<p className="secondary-text">{`© ${currentYear} Smart Cart. All rights reserved.`}</p>
		</footer>
	);
};

export default Footer;
