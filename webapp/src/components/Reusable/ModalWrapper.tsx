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
		because we need to close the HamburgerMenu when screen size increases.
		If there's a nested modal then `useHidden` will only be used for 1 of the them.
		A use case is for the dropdown, product links, clicking on a link will close
		both modals instead of rendering the ProductDetails component.
	*/
	!isNormalClose && useHidden(refDropDown, refBtn, () => onSetIsHidden(true));
	isNormalClose && useWindowSize() > SCREEN_WIDTH_2MD && onSetIsHidden(true);

	/*
		Hiding the dropdown after click makes the screen less bulky
	*/
	isHiddenChildren && onSetIsHidden(isHiddenChildren);

	return createPortal(
		<div ref={refDropDown}>
			{isNormalClose && (
				<button
					onClick={() => onSetIsHidden(true)}
					className="fixed top-3 right-3 z-11 text-color"
				>
					X
				</button>
			)}
			{children}
		</div>,
		portalRoot
	);
};

export default ModalWrapper;
