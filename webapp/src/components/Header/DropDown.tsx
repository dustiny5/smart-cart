import './DropDown.css';
import { useQuery } from '@tanstack/react-query';

const DropDown = () => {
	//https://tanstack.com/query/latest/docs/framework/react/examples/simple

	// const { isPending, data, isFetching, error } = useQuery({
	// 	queryKey: ['dropdownData'],
	// 	queryFn: async () => {
	// 		const response = await fetch(
	// 			import.meta.env.SMART_CART_API_URL + '/category/products'
	// 		);
	// 		return await response.json();
	// 	},
	// });
	// if (isPending) {
	// 	return <div>Loading...</div>;
	// }
	// if (error) {
	// 	return <div>{`An error has occured` + error.message}</div>;
	// }

	return (
		<div className="dropdown">
			<button className="dropdown-btn">Dropdown</button>
			<div className="dropdown-container">
				<div className="dropdown-content">
					<h4>Category</h4>
					<button className="dropdown-link">Link 1</button>
					<button className="dropdown-link">Link 2</button>
					<button className="dropdown-link">Link 3</button>
				</div>
				<div className="dropdown-content">
					<h4>Hats</h4>
					<button className="dropdown-link">Link 4</button>
					<button className="dropdown-link">Link 5</button>
					<button className="dropdown-link">Link 6</button>
				</div>
			</div>
		</div>
	);
};

export default DropDown;
