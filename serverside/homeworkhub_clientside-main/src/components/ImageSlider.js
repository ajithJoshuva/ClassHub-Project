import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <div className='imageDis'>
                                <img src={slide.image} alt='Homeworkhub' className='image' />
                                <div className="homecontent">
                                    <h2 className='heading-line1'>{slide?.heading1}</h2>
                                    <h2 className='heading-line2'>{slide?.heading2}</h2>
                                    <p className='slideContent'>{slide?.content}</p>
                                    <h2 className="quote">"பிறப்பொக்கும் எல்லா உயிர்க்கும்"</h2>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        </section>
    );
};

export default ImageSlider;
