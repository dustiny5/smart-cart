import { useInfiniteQuery } from '@tanstack/react-query';
import Divider from '../Reusable/Divider';
import './BestSeller.css';
import type { Product } from '../type';

const DEFAULT_SIZE = 3;

type BestSellerProps = {
	onSetShowProductDetails: React.Dispatch<
		React.SetStateAction<Product | undefined>
	>;
};

const BestSeller = ({ onSetShowProductDetails }: BestSellerProps) => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['bestSellerData'],
		queryFn: async ({ pageParam }) => {
			const response = await fetch(
				import.meta.env.VITE_SMART_CART_API_URL +
					`/products/bestSeller?page=${pageParam}&size=${DEFAULT_SIZE}`
			);
			return await response.json();
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.last) return undefined;
			return allPages.length;
		},
		staleTime: Infinity,
	});

	return (
		<div className="best-seller">
			<Divider size="md" />
			<h4 className="secondary-text">Featured Products</h4>
			<h3>BESTSELLER PRODUCTS</h3>
			<div className="secondary-text text-sm">
				Problems trying to resolve the conflict between
			</div>
			<Divider size="md" />
			<div className="best-seller-cards">
				{isFetching && <div>Loading...</div>}
				{error && <div>An error has occured. Please try again...</div>}
				{data?.pages?.map((page, pageIndex) => (
					<>
						{page.content.map((item: Product) => (
							<div className="best-seller-card" key={item.id}>
								{/* Improvement: Find images of the same ratio */}
								<img
									key={item.id}
									src={item.imageUrl}
									alt={`${item.name}`}
								/>
								<button
									onClick={() =>
										onSetShowProductDetails(item)
									}
								>
									<div>{item.name}</div>
									<div>{`$${item.price}`}</div>
								</button>
							</div>
						))}
					</>
				))}
			</div>
			{hasNextPage && (
				<>
					<button
						className="secondary-btn primary-text"
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
					>
						Load More
					</button>
					<Divider size="md" />
				</>
			)}
		</div>
	);
};

export default BestSeller;
