import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { primaryGradient } from '../styles/mixins';
import Container from './common/Container';
import Testimonial from './common/Testimonial';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in',
  };

  return (
    <StyledTestimonials>
      <Container>
        <Slider {...settings} className="slider">
          {testimonials.map(({ rating, quote, author }) => (
            <Testimonial
              key={author}
              rating={rating}
              quote={quote}
              author={author}
            />
          ))}
        </Slider>
      </Container>
    </StyledTestimonials>
  );
};

const StyledTestimonials = styled.section`
  background: ${primaryGradient};

  .slider {
    padding-top: ${({ theme }) => theme.spacing['10']};
    padding-bottom: ${({ theme }) => theme.spacing['10']};
  }

  .slick-dots {
    bottom: ${({ theme }) => theme.spacing['5']};

    .slick-active {
      button::before {
        color: ${({ theme }) => theme.colors.white};
      }
    }

    button::before {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default Testimonials;
