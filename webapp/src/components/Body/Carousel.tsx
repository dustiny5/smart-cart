import { useState } from 'react';
import './Carousel.css';

// TODO: Get shopping images later
const images = [
	'https://picsum.photos/800/400?random=1',
	'https://picsum.photos/800/400?random=2',
	'https://picsum.photos/800/400?random=3',
];

const Carousel = () => {
	const [imageIndex, setImageIndex] = useState(0);

	const handleNext = () => {
		if (imageIndex === images.length - 1) {
			setImageIndex(0);
		} else {
			setImageIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (imageIndex === 0) {
			setImageIndex(images.length - 1);
		} else {
			setImageIndex((prev) => prev - 1);
		}
	};

	return (
		<div className="carousel">
			<div
				className="carousel-items"
				style={{
					width: `${images.length * 100}%`,
					transform: `translateX(-${
						imageIndex * (100 / images.length)
					}%)`,
				}}
			>
				{images.map((image, index) => (
					<img key={index} src={image} alt={`Image: ${index + 1}`} />
				))}
			</div>
			<button className="carousel-previous" onClick={handlePrevious}>
				{'<'}
			</button>
			<button className="carousel-next" onClick={handleNext}>
				{'>'}
			</button>
		</div>
	);
};

export default Carousel;
