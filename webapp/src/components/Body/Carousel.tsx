import { useState } from 'react';
import './Carousel.css';

// TODO: Get shopping images later
const images = [
	'https://picsum.photos/800/400?random=1',
	'https://picsum.photos/800/400?random=2',
	'https://picsum.photos/800/400?random=3',
];

const Carousel = () => {
	const [imageIndex, setImageIndex] = useState(1);
	const [transition, setTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
	const totalImages = images.length;
	const addedImages = [images[totalImages - 1], ...images, images[0]]

	const handleNext = () => {
    if(isTransitioning) return;
    setIsTransitioning(true);
		setImageIndex((prev) => prev + 1);
		setTransition(true);
	};

	const handlePrevious = () => {
    if(isTransitioning) return;
    setIsTransitioning(true);
		setImageIndex((prev) => prev - 1);
		setTransition(true);
	};

	const handleTransitionEnd = () => {
		if (imageIndex === 0) {
			setImageIndex(totalImages);
		} else if (imageIndex === totalImages + 1) {
			setImageIndex(1);
		}
    setIsTransitioning(false);
    setTransition(false);
	};

	return (
		<div className="carousel">
			<div
				className="carousel-items"
				style={{
					transform: `translateX(-${imageIndex * (100 / addedImages.length)}%)`,
					transition: transition ? 'transform 0.5s ease-in-out' : 'none',
					width: `${addedImages.length * 100}%`,

				}}
				onTransitionEnd={handleTransitionEnd}
			>
				{addedImages.map((img, idx) => (
					<img key={idx} src={img} alt={`Image: ${idx}`} />
				))}
			</div>
			<button className="carousel-previous" onClick={handlePrevious}>
				‹
			</button>
			<button className="carousel-next" onClick={handleNext}>
				›
			</button>

      <div className="carousel-slider">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isTransitioning) return;
              setImageIndex(idx + 1);
              setTransition(true);
              setIsTransitioning(true);
            }}
            className={`${imageIndex === idx + 1 ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
		</div>
	);
};

export default Carousel;
