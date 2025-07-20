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
	return <div ref={onRefDropDown}>{children}</div>;
};

export default ModalWrapper;
