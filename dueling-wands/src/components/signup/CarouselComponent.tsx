import React from 'react';
import Slider from 'react-slick';
import styles from './CarouselComponent.module.css';
import EHouses from '../../types/EHouses';

interface ICarousel {
  onSlideChange?: (activeIndex: number, activeItem: { title: EHouses; description: string }) => void; // Callback
}

function CarouselComponent(props : ICarousel) {
  const settings = {
    dots: true, // Affiche des points de navigation en bas
    infinite: true, // Boucle infinie
    speed: 500, // Durée de la transition en millisecondes
    slidesToShow: 1, // Nombre d'éléments visibles
    slidesToScroll: 1, // Nombre d'éléments à faire défiler
    arrows: true, // Flèches de navigation
    afterChange: (current: number) => {
      if (props.onSlideChange) {
        const activeItem = items[current];
        props.onSlideChange(current, activeItem);
      }
    },
  };

  const items = [
    {
      src: "https://www.piwwie.com/wp-content/uploads/2020/04/gryff.jpg",
      title: EHouses.GRYFFINDOR,
      description: "The strong and courageous",
    },
    {
      src: "https://www.piwwie.com/wp-content/uploads/2020/04/poufsouffle.jpg",
      title: EHouses.HUFFLEPUFF,
      description: "The loyal and fair",
    },
    {
      src: "https://www.piwwie.com/wp-content/uploads/2020/04/serdaigle.jpg",
      title: EHouses.RAVENCLAW,
      description: "The wise and thoughtful",
    },
    {
      src: "https://www.piwwie.com/wp-content/uploads/2020/04/serpentard.jpg",
      title: EHouses.SLYTHERIN,
      description: "The ambitious and cunning",
    },
  ];

  return (
    <div className={styles.carousel_container} >
      <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
        <Slider {...settings}>
          {items.map((item, index : number) => (
            <div key={index} className={styles.carousel_item}>
              <img src={item.src} />
              <div className={styles.carousel_caption}>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
    </div>
  );
}

export default CarouselComponent;
