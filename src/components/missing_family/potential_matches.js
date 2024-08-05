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
        setCount(props.matches ? props.matches.length : 0)
    }, [props.matches])
    return (
        <div className="2xl:w-[70%] 2xl:pl-20 w-full">
            <div className="2xl:flex flex-col 2xl:visible hidden">
                <div className="ml-16 flex-1">
                    <span className="text-darkblue text-2xl font-semibold">
                        Potential Matches
                    </span>
                    <p className="text-lg">
                        Swipe right to explore more matches
                    </p>
                </div>
                <div className="flex-1 flex flex-row w-full">
                    <Button
                        className='w-fit px-0 mx-0 embla__button embla__button--prev'
                        onClick={() => {
                            if (slideCount > 0) {
                                onPrevButtonClick()
                                setSlideCount((prev) => prev--)
                            }
                        }}
                    ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view previous scanned documents" />
                    </Button>
                    {count == 0 ?
                        <div className="flex flex-col w-[65vw] h-full text-darkblue text-2xl items-center">
                            <Image
                                src={props.selected != undefined ? "/images/no_matches_found.svg" : "/images/no_selected_entry.svg"}
                                className="w-[25%] max-w-72 mb-10"
                                width={1} height={1}
                                alt="No matches found" />
                            {props.selected != undefined ? "No matches found. Please check back later." : "Please select an entry on the left, or add a new entry."}
                        </div>
                        :
                        <div ref={emblaRef} className="embla__viewport overflow-x-hidden h-full w-[65vw]">
                            <div className="embla__container">
                                {props.matches.map((data, index) => {
                                    return <SuggestionCard
                                        key={index}
                                        src={data.user.src ? data.user.src : "/images/default_profile_pic.svg"}
                                        name={data.user.name || "Not Available"}
                                        gender={data.user.gender || "Not Available"}
                                        age={data.user.age || "Not Available"}
                                        dob={data.user.date_birth || "Not Available"}
                                        ethnicity={data.user.ethnicity || "Not Available"}
                                        similarity={data.percentage || "Not Available"}
                                    />
                                })}
                            </div>
                        </div>
                    }
                    <Button
                        className={`w-fit embla__buttons embla__button embla__controls  {embla__button--next}`}
                        onClick={() => {
                            if (slideCount < count) {
                                onNextButtonClick()
                                setSlideCount((prev) => prev++)
                            }
                        }}
                    ><Image src="/images/next_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view next scanned documents" /></Button>
                </div>

            </div>
            <div className="flex flex-col w-full 2xl:hidden">
                        
            </div>
        </div>)
       
}