import React from "react";
import Carousel from "react-bootstrap/Carousel";

// ExampleCarouselImage Component
function ExampleCarouselImage({ images, index }) {
	return (
		<img
			className="d-block w-100"
			src={images[index]} // Use the current index to display the corresponding image
			alt={`Slide ${index + 1}`} // Alt text for accessibility
		/>
	);
}

// UncontrolledExample Component
function ImageCarousel() {
	const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZAhZTmV7ezdrDYE73Kiy0mwGx3Zhwvagf3g&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5WKKj_Y8od_BJFvoLDKlz50BBGd2i1sH03wGY8jFIKmeKyIzdEnSLUjqmCF_nVqYMBw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE_18dJrdd1gfLSqCtbyi5_sSJ_L8DY6XJxhlEHgRWlVw2GEmauc4lVB4QHNoT3kRpxs8&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZAhZTmV7ezdrDYE73Kiy0mwGx3Zhwvagf3g&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5WKKj_Y8od_BJFvoLDKlz50BBGd2i1sH03wGY8jFIKmeKyIzdEnSLUjqmCF_nVqYMBw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE_18dJrdd1gfLSqCtbyi5_sSJ_L8DY6XJxhlEHgRWlVw2GEmauc4lVB4QHNoT3kRpxs8&usqp=CAU"];

	return (
		<Carousel>
			{images.map((image, index) => (
				<Carousel.Item key={index}>
					<ExampleCarouselImage images={images} index={index} />
					<Carousel.Caption>
						<h3>{`Image ${index + 1}`}</h3>
		
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
}

export default ImageCarousel;
