import './Links.css';

const LINKS = [
	{
		title: 'Company Info',
		links: [
			{ name: 'About Us', url: '' },
			{ name: 'Carrier', url: '' },
			{ name: 'We are hiring', url: '' },
			{ name: 'Blog', url: '' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ name: 'About Us', url: '' },
			{ name: 'Carrier', url: '' },
			{ name: 'We are hiring', url: '' },
			{ name: 'Blog', url: '' },
		],
	},
	{
		title: 'Features',
		links: [
			{ name: 'Business Marketing', url: '' },
			{ name: 'User Analytic', url: '' },
			{ name: 'Live Chat', url: '' },
			{ name: 'Unlimited Support', url: '' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ name: 'IOS & Android', url: '' },
			{ name: 'Watch a Demo', url: '' },
			{ name: 'Customers', url: '' },
			{ name: 'API', url: '' },
		],
	},
];

const Links = () => {
	return (
		<div className="links text-color">
			{LINKS.map((linkGroup) => (
				<div key={linkGroup.title} className="links-list">
					<h4>{linkGroup.title}</h4>
					{linkGroup.links.map((link) => (
						<button className="secondary-text" key={link.name}>
							{link.name}
						</button>
					))}
				</div>
			))}
			<div className="links-email">
				<h4>Get In Touch</h4>
				<div className="links-input-button">
					<input type="email" placeholder="Your Email" />
					<button className="primary-text">Subscribe</button>
				</div>
				<p className="secondary-text">
					Join our mailing list to receive the latest news and updates
					from our team.
				</p>
			</div>
		</div>
	);
};

export default Links;
