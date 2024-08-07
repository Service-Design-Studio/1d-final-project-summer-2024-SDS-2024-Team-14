import Image from 'next/image';
import '../styles/globals.css';

export default function Loading() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className='w-100 h-fit relative animate-pulse'>
                <Image width={100} height={100} className='w-full h-auto py-3' src={"/images/enable_id_logo.svg"} alt="Login loading" />
                <span className="text-2xl text-center font-medium text-darkblue">
                    Loading...
                </span>
            </div>
        </div>
    )
}