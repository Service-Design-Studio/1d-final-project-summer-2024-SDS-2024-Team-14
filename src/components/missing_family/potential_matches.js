import "../../styles/globals.css"
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from "react"
import { Button } from "@mui/material"
import Image from "next/image";
import SuggestionCard from "./suggestion_card"
export default function PotentialMatches() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const [slideCount, setSlideCount] = useState(1);
    const placeholderList = [
        {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "dob": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 95
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "dob": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png",
            "similarity": 90
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "dob": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 85
        },
        {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "dob": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 75
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "dob": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png"
            ,
            "similarity": 70
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "dob": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 86
        }, {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "dob": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 13
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "dob": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png",
            "similarity": 29
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "dob": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png",
            "similarity": 100
        }
    ]
    const [count, setCount] = useState(placeholderList.length)
    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])
    function sortList(placeholderList) {
        if (placeholderList) {
            placeholderList.sort((a, b) => { return b.similarity - a.similarity })
        }
    }
    useEffect(() => {
        if (placeholderList) {
            sortList(placeholderList)
        }
    }, [placeholderList])
    sortList(placeholderList)
    return (
        <div className="flex flex-col mx-10 w-full">
            <div className="flex-1">
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
                ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view previous scanned documents" /></Button>
                <div ref={emblaRef} className="embla__viewport overflow-x-hidden h-full w-[65vw]">
                    <div className="embla__container">
                        {placeholderList.map((data, index) => {
                            return <SuggestionCard
                                key={index}
                                src={data.src}
                                name={data.name}
                                gender={data.gender}
                                age={data.age}
                                dob={data.dob}
                                ethnicity={data.ethnicity}
                                similarity={data.similarity}
                            />
                        })}
                    </div>

                </div>

                <Button
                    className={`w-1/12 embla__buttons embla__button embla__controls  {embla__button--next}`}
                    onClick={() => {
                        if (slideCount < count) {
                            onNextButtonClick()
                            setSlideCount((prev) => prev++)
                        }
                    }}
                ><Image src="/images/next_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view next scanned documents" /></Button>
            </div>

        </div>
    )
}