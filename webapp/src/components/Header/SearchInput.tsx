import { useRef, useState } from 'react';
import './SearchInput.css';
import { useQuery } from '@tanstack/react-query';
import { useDebounceQuery, useHidden } from '../Reusable/hooks';
import type { Product } from '../type';
import type { NavbarProps } from './Navbar';
import { useQueryClient } from '@tanstack/react-query';

type SearchInputProps = NavbarProps & {
	isHamburgerMenu: boolean;
};

const SearchInput = ({
	onSetShowProductDetails,
	isHamburgerMenu,
}: SearchInputProps) => {
	const [isHiddenSearch, setIsHiddenSearch] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const [search, setSearch] = useState('');
	const queryClient = useQueryClient();

	const handleSearchIconClick = () => {
		const input = inputRef.current;
		input?.focus();
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleInputBlur = () => {
		setIsHiddenSearch(true);
		setSearch('');
	};

	const { data, isFetching, error, refetch } = useQuery<Product[]>({
		queryKey: ['searchInput'],
		queryFn: async () => {
			const response = await fetch(
				`${
					import.meta.env.VITE_SMART_CART_API_URL
				}/products/similar/${search}`
			);
			if (!response.ok) {
				throw new Error(
					'Something went wrong authenticating the user.'
				);
			}
			return response.json();
		},
		retry: false,
		enabled: false,
	});

	// This removes the dropdown product btn when search is an empty string.
	!search && queryClient.removeQueries({ queryKey: ['searchInput'] });

	useDebounceQuery(search, 500, () => refetch());
	useHidden(inputRef, dropDownRef, () => handleInputBlur());

	const hamburgerStyle = {
		input: isHamburgerMenu
			? 'search-input-input-hamburger'
			: 'max-w-[200px] pl-8 opacity-100',
	};

	return (
		<div className={!isHiddenSearch ? 'search-input' : ''}>
			<button
				disabled={!isHiddenSearch}
				className={!isHiddenSearch ? 'search-input-icon' : ''}
				onClick={handleSearchIconClick}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-6"
				>
					<path
						fillRule="evenodd"
						d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			<input
				ref={inputRef}
				onInput={handleInput}
				onFocus={() => setIsHiddenSearch(false)}
				placeholder="Search"
				value={search}
				className={`search-input-input text-color ${
					!isHiddenSearch
						? hamburgerStyle.input
						: 'max-w-0 p-0 opacity-0'
				}`}
				type="search"
			/>
			<div ref={dropDownRef} className="search-input-products text-color">
				{/* If the user clicks away form the search `isHiddenSearch`,
				 * deletes all text the `search`,
				 * or enters a text that is not found(error),
				 * then hide the search dropdown.
				 */}
				{isFetching ? (
					<div>Loading...</div>
				) : (
					!!error ||
					isHiddenSearch ||
					(search &&
						data?.map((product) => (
							<button
								key={product.id}
								onClick={() => onSetShowProductDetails(product)}
							>
								{product.name}
							</button>
						)))
				)}
				{!error ||
					(!isHiddenSearch && search && (
						<div>No Products Found.</div>
					))}
			</div>
		</div>
	);
};

export default SearchInput;
