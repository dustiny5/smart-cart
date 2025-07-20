import { useRef, useState, type ReactNode } from 'react';
import ModalWrapper from './ModalWrapper';

type ModalProps = {
	name?: string;
	component?: ReactNode;
	children: ReactNode;
	className?: string;
};
const Modal = ({ name, children, component, className }: ModalProps) => {
	const [isHidden, setIsHidden] = useState(true);
	const refDropDown = useRef<HTMLDivElement>(null);
	const refBtn = useRef<HTMLButtonElement>(null);

	return (
		<div className={className}>
			<button
				ref={refBtn}
				className="flex space-x-2 items-center"
				onClick={() => {
					setIsHidden((prev) => !prev);
				}}
			>
				<div>{name}</div>
				{component}
			</button>
			{!isHidden && (
				<ModalWrapper
					onRefDropDown={refDropDown}
					onRefBtn={refBtn}
					onSetIsHidden={setIsHidden}
				>
					{children}
				</ModalWrapper>
			)}
		</div>
	);
};

export default Modal;
