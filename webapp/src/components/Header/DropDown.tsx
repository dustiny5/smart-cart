import './DropDown.css';
import { useQuery } from '@tanstack/react-query';
import type { Category, Product } from '../type';

type DropDownProps = {
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
	isHamburgerMenu: boolean;
};
const DropDown = ({
	onSetShowProductDetails,
	isHamburgerMenu,
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

	const hamburgerMenuSytle = {
		dropdown: isHamburgerMenu && 'w-[100%] left-0',
		dropdownContainer: isHamburgerMenu ? 'ml-0 flex-wrap' : 'ml-16',
	};

	return (
		<div className={`dropdown ${hamburgerMenuSytle.dropdown}`}>
			{isPending && <div>Loading...</div>}
			{error && <div>An error has occured. Please try again...</div>}
			<div
				className={`dropdown-container ${hamburgerMenuSytle.dropdownContainer}`}
			>
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
