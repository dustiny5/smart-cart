import { useHidden, useWindowSize } from './hooks';
import { type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { SCREEN_WIDTH_2MD } from '../constants';

type ModalWrapper = {
	refDropDown: RefObject<HTMLDivElement | null>;
	refBtn: RefObject<HTMLButtonElement | null>;
	onSetIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	isNormalClose: boolean;
	isHiddenChildren: boolean;
};

const ModalWrapper = ({
	refDropDown,
	refBtn,
	onSetIsHidden,
	children,
	isNormalClose,
	isHiddenChildren,
}: ModalWrapper) => {
	const portalRoot = document.getElementById('root');
	if (!portalRoot) return null;
	/* 
		Originally did not have the `isNormalClose` boolean. This was added
		because we need to hide the HamburgerMenu when screen size increases.
	*/
	!isNormalClose && useHidden(refDropDown, refBtn, () => onSetIsHidden(true));
	isNormalClose && useWindowSize() > SCREEN_WIDTH_2MD && onSetIsHidden(true);

	/*
		Hiding the dropdown after click makes the screen less bulky
	*/
	isHiddenChildren && onSetIsHidden(isHiddenChildren);

	return createPortal(
		<div ref={refDropDown}>
			<button
				onClick={() => onSetIsHidden(true)}
				className="fixed top-3 right-3 z-11 text-color"
			>
				X
			</button>
			{children}
		</div>,
		portalRoot
	);
};

export default ModalWrapper;
