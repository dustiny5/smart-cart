import BestSeller from './BestSeller';
import Carousel from './Carousel';
import ProductDetails from './ProductDetails';
import type { Product } from '../type';

type BodyProps = {
	onShowProductDetails: Product | undefined;
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
	onResetToggle: boolean;
	onSetResetToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const Body = ({
	onResetToggle,
	onSetResetToggle,
	onShowProductDetails,
	onSetShowProductDetails,
}: BodyProps) => {
	return (
		<>
			{onResetToggle ? (
				<ProductDetails item={onShowProductDetails} />
			) : (
				<>
					<Carousel />
					<BestSeller
						onSetShowProductDetails={onSetShowProductDetails}
						onSetResetToggle={onSetResetToggle}
					/>
				</>
			)}
		</>
	);
};

export default Body;
