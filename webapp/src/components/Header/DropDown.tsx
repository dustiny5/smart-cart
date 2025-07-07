import './DropDown.css';
import { useQuery } from '@tanstack/react-query';
import { useHidden } from './useHidden';
import type { RefObject } from 'react';

type DropDownProps = {
	onRefDropDown: RefObject<HTMLDivElement | null>;
	onRefBtn: RefObject<HTMLButtonElement | null>;
	onSetIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDown = ({
	onRefDropDown,
	onRefBtn,
	onSetIsHidden,
}: DropDownProps) => {
	useHidden(onRefDropDown, onRefBtn, () => onSetIsHidden(true));
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
		<div className="dropdown" ref={onRefDropDown}>
			{isPending && <div>Loading...</div>}
			{error && <div>An error has occured. Please try again...</div>}
			<div className="dropdown-container">
				{isSuccess &&
					data.map((item: any) => (
						<div key={item.id} className="dropdown-content">
							<h4 className="text-color">{item.name}</h4>
							{item.products.map((product: any) => (
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
		</div>
	);
};

export default DropDown;
