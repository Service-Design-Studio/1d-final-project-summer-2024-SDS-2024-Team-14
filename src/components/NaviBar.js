import Link from "next/link";
import EnableId from "../../public/images/enable_id_logo.svg"
import Image from "next/image";
import React, {useState} from "react";
import documentIcon from "../../public/images/icons/document.svg"
import familyIcon from "../../public/images/icons/family.svg"
import resourceIcon from "../../public/images/icons/home.svg"


export default function NaviBar() {
    const [navState, setNavState] = useState(false)
    return (
    <div className="flex justify-between items-center mt-2">
        {/*Logo for desktop*/}
        <div className="md:flex md:items-center md:ml-6 ml-4 hidden">
            <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
        </div>
        {/* Add the hamburger for phone*/}
        <button
            className="flex mr-2 cursor-pointer py-3 px-3 z-30 xl:scale-[1.5] md:hidden"
            onClick={() => setNavState(!navState)}
          >
            {navState ? (
                <>
                <div className="w-8 h-8">
                </div>
              <svg
                className="fixed top-5 left-3 w-8 h-8 text-darkblue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
                </>
            ) : (
              <svg
                className="w-8 h-8 text-darkblue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>
            )}
          </button>
            <div className={`transition duration-500 fixed top-0 left-0 pt-16 bg-white z-20 h-screen ${
          navState ? "translate-x-0" : "-translate-x-full"}`}>
                {/*Links */}
                {/*<hr className="border-t-2 border-[#B0B0B0]/50 w-10/12 my-2 mx-auto" />*/}
                <ul className="text-black pl-4 pr-16">
                    {[
                        // ['Home', '/', ""],
                        ['Documents', '/documents', documentIcon],
                        ['Family', '/family-tree', familyIcon],
                        // ['Community', '', ""],
                        ['Resources', '/resources', resourceIcon],
                  ].map(([title, url, img]) => (
                        // eslint-disable-next-line react/jsx-key
                    <>
                        <div className="py-4 flex items-center">
                            <div className="w-[8vw] inline-block">
                                <Image src={img} layout="responsive" alt="navigation icon"/>
                            </div>
                            <li className='inline-block ml-3 items-center'>
                                <Link onClick={() => setNavState(!navState)} href={url} smooth={true} className="md:text-[2vw] text-[4vw] font-semibold">{title}</Link>
                            </li>
                        </div>
                    </>
                    )
                )}
                </ul>
                 {/*Logo */}
                <div className="absolute bottom-4 w-full">
                    <hr className="border-t-2 border-[#B0B0B0]/50 w-10/12 mb-4 mx-auto" />
                    <div className="flex items-center ml-4 mx-auto">
                        <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                        <span className="font-bold text-[4.5vw] text-[#405DB5]">Enable ID</span>
                    </div>
                </div>
            </div>
        {/* Full navi bar for desktop*/}
        <div className="flex lg:space-x-12 space-x-6 lg:mr-10 mr-6 hidden md:inline-block">
            {[
                ['Home', '/', ""],
                ['Documents', '/documents'],
                ['Family', '/family-tree'],
                ['Community', '', ""],
                ['Resources', '/resources'],
            ].map(([title, url]) => (
                // eslint-disable-next-line react/jsx-key
                <Link href={url} className="py-4 font-bold">{title}</Link>
            ))}
        </div>
    </div>
    )
}