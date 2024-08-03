// src/pages/intropage.js
import React, { useState } from 'react';
import Carousel from './intropage/Carousel';
import slides from './intropage/slides';
import "../styles/globals.css";
import EnableId from "../../public/images/enable_id_logo.svg";
import Image from 'next/image';

const IntroPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="overflow-hidden flex flex-col align-middle min-h-screen bg-white transition-all-500 bg-local
        bg-[url('/images/background/gebirah-bluebg.png')] bg-cover pb">
            <div className="md:flex md:items-center pt-4 ml-4">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className="bg-white rounded-xl p-[2rem] w-[70%] mx-auto mt-12" style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <h1 className="block text-2xl mb-4 font-bold text-center text-darkblue">
                    {slides[currentSlide].title}
                </h1>
                <Image
                    src={slides[currentSlide].image}
                    alt="Slide Image"
                    className="h-[26vw] w-auto mx-auto"
                    width={800}
                    height={600}
                />
                <div className="flex justify-center items-center my-4">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                height: '10px',
                                width: '10px',
                                borderRadius: '50%',
                                backgroundColor: index === currentSlide ? '#405DB5' : '#d0d0d0',
                                margin: '0 5px',
                                display: 'inline-block',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
                <p className="text-darkblue text-base mt-12 mb-12 px-100 text-center">
                    {slides[currentSlide].text}
                </p>
                <div className="flex justify-between">
                    <div>
                        <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875em', color: '#405DB5', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.25rem', fontSize: '1.25em' }}>&larr;</span> Back
                        </button>
                    </div>
                    <div>
                        <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875em', color: '#405DB5', display: 'flex', alignItems: 'center' }}>
                            Next <span style={{ marginLeft: '0.25rem', fontSize: '1.25em' }}>&rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroPage;
