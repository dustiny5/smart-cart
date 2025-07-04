import { useRef, useState } from 'react';
import DropDown from './DropDown';

const Shop = () => {
	const [isHidden, setIsHidden] = useState(true);
	const refDropDown = useRef<HTMLDivElement>(null);
	const refBtn = useRef<HTMLButtonElement>(null);

	return (
		<div>
			<button
				ref={refBtn}
				className="navbar-side-shop"
				onClick={() => {
					setIsHidden((prev) => !prev);
				}}
			>
				<div>Shop</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m19.5 8.25-7.5 7.5-7.5-7.5"
					/>
				</svg>
			</button>
			{!isHidden && (
				<DropDown
					onRefDropDown={refDropDown}
					onRefBtn={refBtn}
					onSetIsHidden={setIsHidden}
				/>
			)}
		</div>
	);
};

export default Shop;
