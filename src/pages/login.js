import Textbox from "./textbox"
import Image from 'next/image'
import { useRouter } from "next/navigation";
import "../../styles/globals.css"
export default function Login() {
    return (
    <div className='flex flex-col bg-[url("/images/picture_for_opening.png")] z-10 bg-cover bg-no-repeat h-screen bg-center items-center justify-center align-center'>
        <div className="bg-gradient-to-t from-[#334155] to-transparent p-6 rounded shadow-md mx-auto text-center">
            <div className="flex justify-between items-center mb-4">
                <div className="relative inline-block text-left">
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-white shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-100">
                    <Image src="/images/english.svg" width={30} height={0} alt="english" className="icon w-2/12 mr-1 p-0 text-white"/> 
                    <h2 className="text-white">Language</h2> 
                    <Image src="/images/angle_down.svg" width={30} height={0} alt="dropdown" className="icon w-2/10 mr-1 p-0"/>
                    </button>
                </div>
            </div>
        <h2 className="text-xl text-white font-semibold mb-2">Water as clear as a million pixels</h2>
            <div className="flex space-x-4 mt-4">
                <button className="w-full py-2 border border-white rounded text-white">Log In</button>
                <button className="w-full py-2 border border-white rounded bg-white text-default rounded">Sign Up</button>
            </div>
        </div>
    </div>
      );
    }