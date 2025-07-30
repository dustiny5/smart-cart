import { Link } from 'react-router-dom';
import { Divider } from '../Reusable';

const Cancel = () => {
	return (
		<div className="absolute flex flex-col top-[50%] left-[50%]">
			Purchase Cancelled!
			<Divider size="sm" />
			<Link className="primary-btn mx-[25%] text-center" to="/">
				Go Back ‹-
			</Link>
		</div>
	);
};

export default Cancel;
