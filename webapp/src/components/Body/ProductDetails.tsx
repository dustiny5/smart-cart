import './ProductDetails.css';
import Divider from '../Divider';
import InputCounter from './InputCounter';
import type { Product } from '../../type';

type ProductDetailProps = {
	item: Product | undefined;
};

const ProductDetails = ({ item }: ProductDetailProps) => {
	return (
		<>
			<Divider size="md" />
			<div className="product-details">
				{item && (
					<>
						<img
							key={item.id}
							src={item.imageUrl}
							alt={item.name}
						/>
						<div className="product-details-info">
							<h4 className="text-color">{item.name}</h4>
							<h3 className="text-color">{`$${item.price}`}</h3>
							<div className="product-details-description secondary-text">
								{item.description}
							</div>
							<Divider lineColor="lightGray" />
							<InputCounter productDetails={item} />
						</div>
					</>
				)}
			</div>
			<Divider size="md" />
		</>
	);
};

export default ProductDetails;
