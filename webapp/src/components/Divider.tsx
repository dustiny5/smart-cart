type DividerProps = {
	size: 'sm' | 'md' | 'lg';
};

const Divider = ({ size }: DividerProps) => {
	// https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
	const sizeVariants = {
		sm: 'pt-10',
		md: 'pt-25',
		lg: 'pt-50',
	};
	return <div className={`${sizeVariants[size]}`}></div>;
};

export default Divider;
