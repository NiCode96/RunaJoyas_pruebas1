"use client";

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

function ControlledCarousel({ imagen1, imagen2, imagen3, imagen4, interval = 3000, transitionDuration = 600 }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Filtramos imágenes no válidas (undefined, null, "")
  const images = [imagen1, imagen2, imagen3, imagen4].filter(src => typeof src === 'string' && src.trim() !== '');

  return (
    <div className="w-full h-full overflow-hidden rounded-xl">
      {/* Sobrescribir la duración de transición del carousel (Bootstrap usa .carousel-item { transition: transform .6s ... }) */}
      <style jsx global>{`
        /* Ajusta la duración de la animación de slide (en ms) */
        .carousel-item {
          transition: transform ${transitionDuration}ms ease-in-out !important;
        }
      `}</style>

      {images.length === 0 ? (
        <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-100 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">No hay imágenes disponibles</p>
        </div>
      ) : (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={interval} className="w-full h-full">
          {images.map((src, idx) => {
            const isLocal = typeof src === 'string' && src.startsWith('/');

            return (
              <Carousel.Item key={idx}>
                {/* Contenedor responsive: se usa aspect-ratio para mantener proporción y mejorar CLS */}
                <div className="w-full relative rounded-lg overflow-hidden" style={{ aspectRatio: '16 / 7' }}>
                  {isLocal ? (
                    <Image
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                      style={{ objectFit: 'cover' }}
                      priority={idx === 0} // priorizar el primer slide para LCP
                    />
                  ) : (
                    // Para imágenes externas: lazy + decoding async y un fallback responsivo
                    <img
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{ display: 'block', width: '100%', height: '100%' }}
                    />
                  )}
                </div>
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

export default ControlledCarousel;