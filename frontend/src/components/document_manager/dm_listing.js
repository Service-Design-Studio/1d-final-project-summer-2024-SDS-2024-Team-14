import React from 'react';
import fileIcon from "../../../public/images/file_icon.svg"
import Image from "next/image";

const Listing = ({ title, url}) => {

  return (
      <>
        <div className='py-8 flex flex-row items-center'>
            <div className="ml-6 md:w-[2vw] w-[2vw]">
                <Image src={fileIcon} layout={"responsive"} alt="File icon"/>
            </div>
            <h1 className='ml-8 text-darkblue font-bold md:text-[2vw] text-[3vw]'>
                {title}
            </h1>
            {/*<iframe className="md:h-[12vw] h-[16vw] md:w-5/6 w-full" src={url}/>*/}
            {/*<h1 className='lg:text-lg text-md md:mt-10 mt-4 font-bold'>{title}</h1>*/}
        </div>
        <hr className="md:border-t-4 border-t-2 border-[#B0B0B0]/50" />
  </>
  );
}

export default Listing;




