import BestSeller from './BestSeller';
import Carousel from './Carousel';
import ProductDetails from './ProductDetails';
import type { Product } from '../type';

type BodyProps = {
	showProductDetails: Product | undefined;
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
};
const Body = ({ showProductDetails, onSetShowProductDetails }: BodyProps) => {
	return (
		<>
			{showProductDetails ? (
				<ProductDetails item={showProductDetails} />
			) : (
				<>
					<Carousel />
					<BestSeller
						onSetShowProductDetails={onSetShowProductDetails}
					/>
				</>
			)}
		</>
	);
};

export default Body;
