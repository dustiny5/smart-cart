import { useState } from 'react';
import BestSeller from './BestSeller';
import Carousel from './Carousel';
import ProductDetails from './ProductDetails';
import type { Product } from '../type';

type BodyProps = {
	onResetToggle: boolean;
	onSetResetToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const Body = ({ onResetToggle, onSetResetToggle }: BodyProps) => {
	const [showProductDetails, setShowProductDetails] = useState<Product>();
	return (
		<>
			{onResetToggle ? (
				<ProductDetails item={showProductDetails} />
			) : (
				<>
					<Carousel />
					<BestSeller
						onSetShowProductDetails={setShowProductDetails}
						onSetResetToggle={onSetResetToggle}
					/>
				</>
			)}
		</>
	);
};

export default Body;
