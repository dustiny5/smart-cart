import { useHidden } from './useHidden';
import type { ReactNode, RefObject } from 'react';

type ModalWrapper = {
	refDropDown: RefObject<HTMLDivElement | null>;
	refBtn: RefObject<HTMLButtonElement | null>;
	onSetIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

const ModalWrapper = ({
	refDropDown,
	refBtn,
	onSetIsHidden,
	children,
}: ModalWrapper) => {
	useHidden(refDropDown, refBtn, () => onSetIsHidden(true));
	return <div ref={refDropDown}>{children}</div>;
};

export default ModalWrapper;
