import { useHidden } from './useHidden';
import type { ReactNode, RefObject } from 'react';

type ModalWrapper = {
	onRefDropDown: RefObject<HTMLDivElement | null>;
	onRefBtn: RefObject<HTMLButtonElement | null>;
	onSetIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	className?: string;
};

const ModalWrapper = ({
	onRefDropDown,
	onRefBtn,
	onSetIsHidden,
	children,
	className,
}: ModalWrapper) => {
	useHidden(onRefDropDown, onRefBtn, () => onSetIsHidden(true));
	return (
		<div className={className} ref={onRefDropDown}>
			{children}
		</div>
	);
};

export default ModalWrapper;
