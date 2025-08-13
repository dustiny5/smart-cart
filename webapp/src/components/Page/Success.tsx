import { Link } from 'react-router-dom';
import { Divider } from '../Reusable';
import { STORAGE_KEY } from '../constants';

const Success = () => {
	const handleGoBack = () => {
		localStorage.removeItem(STORAGE_KEY);
	};

	return (
		<div className="absolute flex flex-col top-[50%] left-[50%]">
			Thank You for Your Purchase!
			<Divider size="sm" />
			<Link
				className="primary-btn mx-[25%] text-center"
				onClick={handleGoBack}
				to="/"
			>
				Go Back ‹-
			</Link>
		</div>
	);
};

export default Success;
