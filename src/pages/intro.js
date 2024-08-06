// src/pages/intro.js
import React, { useState, useEffect } from 'react';
import slides from '../components/intropage/slides';
import "../styles/globals.css";
import EnableId from "../../public/images/enable_id_logo.svg";
import Image from 'next/image';

export default function Intro({ session }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const src = isLargeScreen ? slides[currentSlide].imageLg : slides[currentSlide].imageSm;

    return (
        <div className="overflow-hidden flex flex-col min-h-screen bg-white transition-all-500 bg-local
        bg-[url('/images/background/gebirah-bluebg.png')] bg-cover pb-8">
            <div className="md:flex md:items-center pt-4 ml-4">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className="flex-grow flex items-center justify-center overflow-hidden">
                <div className="bg-white rounded-3xl p-[1rem] lg:p-[2rem] w-[90%] lg:w-[70%] h-40vh lg:h-[80vh] mx-auto mt-5 relative" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    {/* i know should use md instead of lg but when i change the view to md stuff like ipad it looks damn weird so i used lg instead */}
                    <h1 className="block text-3xl lg:text-4xl mb-4 font-bold text-center text-darkblue">
                        {slides[currentSlide].title}
                    </h1>
                    <Image
                        src={src}
                        alt="Slide Image"
                        className="h-[50vh] lg:h-[22vw] w-auto mx-auto rounded-xl border-2 border-gray"
                        width={800}
                        height={600}
                    />
                    <div className="flex justify-center items-center my-4">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`cursor-pointer inline-block rounded-full mx-1 ${index === currentSlide ? 'bg-darkblue' : 'bg-gray-300'} 
                                h-[6px] w-[6px] md:h-[8px] md:w-[8px] lg:h-[10px] lg:w-[10px]`}
                            />
                        ))}
                    </div>
                    <div className="flex-grow flex items-center justify-center"> {/* Centering the text container */}
                        <p className="text-darkblue text-base lg:text-xl mt-12 mb-12 lg:px-20 text-center overflow-hidden text-ellipsis h-[10vh] lg:h-[20vh]">
                            {slides[currentSlide].text}
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 flex justify-between items-center rounded-3xl">
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
