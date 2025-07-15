import './DropDown.css';
import { useQuery } from '@tanstack/react-query';
import type { Category, Product } from '../type';

const DropDown = () => {
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
		<>
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
								>
									{product.name}
								</button>
							))}
						</div>
					))}
			</div>
		</>
	);
};

export default DropDown;
