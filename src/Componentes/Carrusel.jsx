"use client";

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel({imagen1, imagen2, imagen3}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="w-full h-full max-h-[600px] overflow-hidden rounded-xl">
            <Carousel activeIndex={index} onSelect={handleSelect} className="w-full h-full">
                <Carousel.Item>
                    <img
                        className="w-full h-auto object-cover rounded-lg"
                        src={imagen1}
                        alt="First slide"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="w-full h-auto object-cover rounded-lg"
                        src={imagen2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="w-full h-auto object-cover rounded-lg"
                        src={imagen3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ControlledCarousel;