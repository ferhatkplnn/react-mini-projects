import PropTypes from "prop-types";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";

import "./Carousel.css";

function Carousel({ data }) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    if (slide === data.length - 1) return setSlide(0);
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    if (slide === 0) return setSlide(data.length - 1);
    setSlide(slide - 1);
  };

  const goSlide = (index) => {
    setSlide(index);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => goSlide(idx)}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
}

export default Carousel;

Carousel.propTypes = {
  data: PropTypes.any,
};
