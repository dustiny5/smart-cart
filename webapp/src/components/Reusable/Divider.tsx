type DividerProps = {
	size?: 'none' | 'sm' | 'md' | 'lg';
	lineColor?: 'lightGray';
};

const Divider = ({ size = 'none', lineColor }: DividerProps) => {
	// https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
	const sizeVariants = {
		none: 'mt-0',
		sm: 'mt-5 mb-5',
		md: 'mt-12.5 mb-12.5',
		lg: 'mt-25 mb-25',
	};

	const lineVariants = {
		lightGray: 'border-[#737373]',
	};

	return (
		<div
			className={
				lineColor
					? `${sizeVariants[size]} ${lineVariants[lineColor]} border-1 opacity-25 rounded-2xl w-full h-[1px]`
					: sizeVariants[size]
			}
		></div>
	);
};

export default Divider;
