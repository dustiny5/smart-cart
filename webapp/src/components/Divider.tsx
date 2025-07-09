type DividerProps = {
	size?: 'none' | 'sm' | 'md' | 'lg';
	lineColor?: 'lightGray';
};

const Divider = ({ size = 'none', lineColor }: DividerProps) => {
	// https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
	const sizeVariants = {
		none: 'pt-0',
		sm: 'pt-10',
		md: 'pt-25',
		lg: 'pt-50',
	};

	const lineVariants = {
		lightGray: 'border-[#737373]',
	};

	return (
		<div
			className={
				lineColor
					? `${lineVariants[lineColor]} border-1 opacity-25 rounded-2xl w-full h-[1px]`
					: sizeVariants[size]
			}
		></div>
	);
};

export default Divider;
