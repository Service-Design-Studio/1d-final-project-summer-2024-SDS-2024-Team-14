import "../../styles/globals.css"
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from "react"
import { Button } from "@mui/material"
import Image from "next/image";
import SuggestionCard from "./suggestion_card"
export default function PotentialMatches(props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const [slideCount, setSlideCount] = useState(1);
    const [count, setCount] = useState(0)
    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])
    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (props.matches) {
            setCount(props.matches.length);
        } else {
            setCount(0);
        }
    }, [props.matches])
    
    return (
        <div className="2xl:px-4 mx-0 2xl:w-[75%] w-full overflow-hidden mt-8 2xl:mt-0">
            <div className="flex flex-col md:w-auto h-auto ">
                <div className="ml-12">
                    <span className="text-darkblue text-2xl font-semibold">
                        Potential Matches
                    </span>
                    <p className="text-lg text-darkblue">
                        Swipe right to explore more matches
                    </p>
                </div>
                {/* Prev/Next buttons for mobile view */}
                <div className="flex flex-row md:hidden my-3">
                    <Button
                        className='flex-1 min-w-fit px-0 md:mx-5 mx-1 embla__button embla__button--prev start-0 items-center'
                        onClick={() => {
                            if (slideCount > 0) {
                                onPrevButtonClick()
                                setSlideCount((prev) => prev--)
                            }
                        }}
                    ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-2 px-0' width={1} height={1} alt="view previous scanned documents" />
                        Prev
                    </Button>
                    <Button
                        className={`min-w-fit embla__buttons embla__button embla__controls  {embla__button--next} px-0 md:mx-5 flex-1`}
                        onClick={() => {
                            if (slideCount < count) {
                                onNextButtonClick()
                                setSlideCount((prev) => prev++)
                            }
                        }}
                    >Next
                        <Image src="/images/next_chevron.svg" className='w-4 sm:w-7 mx-2 px-0' width={1} height={1} alt="view next scanned documents" /></Button>
                </div>
                {/* Intro for desktop view */}
                <div className=" flex flex-row w-full">
                    <Button
                        className='min-w-fit px-0 md:mx-5 mx-1 embla__button embla__button--prev md:block md:w-auto hidden w-0'
                        onClick={() => {
                            if (slideCount > 0) {
                                onPrevButtonClick()
                                setSlideCount((prev) => prev--)
                            }
                        }}
                    ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view previous scanned documents" />
                    </Button>
                    {count == 0 &&
                        <div className="flex flex-col w-full h-full text-darkblue text-2xl items-center">
                            <Image
                                src={props.selected != undefined ? "/images/no_matches_found.svg" : "/images/no_selected_entry.svg"}
                                className="w-1/4 max-w-72"
                                width={1} height={1}
                                alt="No matches found" />
                            {props.selected != undefined ? "No matches found. Please check back later." : "Please select an entry on the left, or add a new entry."}
                        </div>
                    }
                       {count > 0 && <div ref={emblaRef} className="overflow-x-hidden h-full w-full">
                            <div className="embla__container gap-x-12">
                                {props.matches ? props.matches.map((data, index) => {
                                    return <SuggestionCard
                                        key={`${data.user.id}`}
                                        index={`${index}`}
                                        src={data.user.photo ? data.user.photo : "/images/default_profile_pic.svg"}
                                        name={data.user.name || "Not Available"}
                                        gender={data.user.gender || "Not Available"}
                                        age={data.user.age || "Not Available"}
                                        dob={data.user.date_birth || "Not Available"}
                                        ethnicity={data.user.ethnicity || "Not Available"}
                                        similarity={data.percentage || "Not Available"}
                                        setClick={ props.setClick}
                                    />
                                }) : null}
                            </div>
                        </div>
                    }
                    <Button
                        className={`min-w-fit embla__buttons embla__button embla__controls  {embla__button--next} px-0 md:mx-5 mx-1 md:block md:w-auto hidden w-0`}
                        onClick={() => {
                            if (slideCount < count) {
                                onNextButtonClick()
                                setSlideCount((prev) => prev++)
                            }
                        }}
                    ><Image src="/images/next_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view next scanned documents" /></Button>
                </div>

            </div>
            <div className="flex flex-col w-full 2xl:hidden 2xl:w-0 2xl:h-0">
                        
            </div>
        </div>)
       
}