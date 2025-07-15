import { useHidden } from './useHidden';
import type { ReactNode, RefObject } from 'react';

type ModalWrapper = {
	onRefDropDown: RefObject<HTMLDivElement | null>;
	onRefBtn: RefObject<HTMLButtonElement | null>;
	onSetIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

const ModalWrapper = ({
	onRefDropDown,
	onRefBtn,
	onSetIsHidden,
	children,
}: ModalWrapper) => {
	useHidden(onRefDropDown, onRefBtn, () => onSetIsHidden(true));
	return (
		<div
			className="absolute font-normal shadow-md p-4 rounded-md bg-white z-1"
			ref={onRefDropDown}
		>
			{children}
		</div>
	);
};

export default ModalWrapper;
