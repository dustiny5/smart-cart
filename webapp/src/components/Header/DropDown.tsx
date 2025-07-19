import './DropDown.css';
import { useQuery } from '@tanstack/react-query';
import type { Category, Product } from '../type';

type DropDownProps = {
	onSetResetToggle: React.Dispatch<React.SetStateAction<boolean>>;
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
};
const DropDown = ({
	onSetShowProductDetails,
	onSetResetToggle,
}: DropDownProps) => {
	// https://tanstack.com/query/latest/docs/framework/react/examples/simple
	const { isPending, isSuccess, data, error } = useQuery({
		queryKey: ['dropdownData'],
		queryFn: async () => {
			const response = await fetch(
				import.meta.env.VITE_SMART_CART_API_URL + '/category/products'
			);
			return await response.json();
		},
		staleTime: Infinity,
	});
	return (
		<div className="dropdown">
			{isPending && <div>Loading...</div>}
			{error && <div>An error has occured. Please try again...</div>}
			<div className="dropdown-container">
				{isSuccess &&
					data.map((item: Category) => (
						<div key={item.id} className="dropdown-content">
							<h4 className="text-color">{item.name}</h4>
							{item.products.map((product: Product) => (
								<button
									key={product.id}
									className="dropdown-item secondary-text"
									onClick={() => {
										onSetShowProductDetails(product);
										onSetResetToggle((prev) => !prev);
									}}
								>
									{product.name}
								</button>
							))}
						</div>
					))}
			</div>
		</div>
	);
};

export default DropDown;
