import { useEffect } from 'react';

const useDebounceQuery = (
	value: string,
	delay: number,
	onRefetch: () => void
) => {
	useEffect(() => {
		if (value === '') return;

		const timer = setTimeout(() => {
			onRefetch();
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);
};
export default useDebounceQuery;
