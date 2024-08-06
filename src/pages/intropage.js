// src/pages/intropage.js
import React, { useState } from 'react';
import slides from './intropage/slides';
import "../styles/globals.css";
import EnableId from "../../public/images/enable_id_logo.svg";
import Image from 'next/image';

const IntroPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="overflow-hidden flex flex-col min-h-screen bg-white transition-all-500 bg-local
        bg-[url('/images/background/gebirah-bluebg.png')] bg-cover pb-8">
            <div className="lg:flex lg:items-center pt-4 ml-4">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold lg:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className="flex-grow flex items-center justify-center"> {/* Centering container */}
                <div className="bg-white rounded-xl p-[1rem] lg:p-[2rem] w-[90%] lg:w-[70%] h-40vh lg:h-[80vh] lg:mx-auto mt-5 relative" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1 className="block text-3xl lg:text-4xl mb-4 font-bold text-center text-darkblue">
                        {slides[currentSlide].title}
                    </h1>
                    <Image
                        src={slides[currentSlide].image}
                        alt="Slide Image"
                        className="h-[50vw] lg:h-[26vw] w-auto mx-auto"
                        width={800}
                        height={600}
                    />
                    <div className="flex justify-center items-center my-4">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`cursor-pointer inline-block rounded-full mx-1 ${index === currentSlide ? 'bg-darkblue' : 'bg-gray-300'} 
                                h-[6px] w-[6px] lg:h-[8px] lg:w-[8px] lg:h-[10px] lg:w-[10px]`}
                            />
                        ))}
                    </div>
                    <p className="text-darkblue text-base lg:text-xl mt-12 mb-12 lg:px-20 text-center overflow-hidden text-ellipsis">
                        {slides[currentSlide].text}
                    </p>
                    <div className="flex justify-between absolute bottom-4 left-4 right-4">
                        <div>
                            {currentSlide > 0 && (
                                <button
                                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
                                    className="bg-transparent border-none cursor-pointer font-size-[0.875em] text-darkblue flex items-center"
                                >
                                    <span className="mr-1 text-md lg:text-2xl">&larr;</span>
                                    <span className="text-md lg:text-base">Back</span>
                                </button>
                            )}
                        </div>
                        <div>
                            {currentSlide < slides.length - 1 && (
                                <button
                                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                                    className="bg-transparent border-none cursor-pointer font-size-[0.875em] text-darkblue flex items-center"
                                >
                                    <span className="text-md lg:text-base">Next</span>
                                    <span className="ml-1 text-md lg:text-2xl">&rarr;</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroPage;
