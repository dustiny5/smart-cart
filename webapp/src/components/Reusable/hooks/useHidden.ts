import { useEffect, type RefObject } from 'react';

const useHidden = (
	refParent: RefObject<HTMLElement | null>,
	refChild: RefObject<HTMLElement | null>,
	callback: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Must create another ref(refChild) to prevent rendering 2 times.
			if (
				!refParent.current?.contains(event.target as HTMLElement) &&
				!refChild.current?.contains(event.target as HTMLElement)
			) {
				callback();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
};
export default useHidden;
