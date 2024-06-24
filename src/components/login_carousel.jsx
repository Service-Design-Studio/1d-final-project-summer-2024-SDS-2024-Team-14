import { useState } from 'react'
export default function LoginCarousel() {
    const [onLoginTab, setOnLoginTab] = useState(true);
    return (
        <div className='bg-white w-full h-full'>
            <div className='flex relative flex-row w-full bg-gradient-to-t from-[#334155] to-transparent transition-all duration-300'>
                <div id="tab" className={`absolute ${onLoginTab ? `left-0 animate-slideIn` : `right-0 animate-slideOut`} pointer-events-none z-10 bg-darkblue/50 w-1/2 transition-all duration-300 mix-blend-multiply`}>test</div>
                <div className='z-0 flex-1 flex flex-row h-fit mx-auto px-2 bg-deepblue text-center'>
                    <div onClick={() => setOnLoginTab(true)} className={`flex-1 w-1/2 ${onLoginTab ? `text-darkblue` : `text-white`}`}>Login</div>
                    <div onClick={() => setOnLoginTab(false)} className={`flex-1 w-1/2  ${onLoginTab ? `text-white` : `text-darkblue`}`}>Sign up</div>
                </div>
            </div>
            {console.log(onLoginTab)}
        </div>
    )
}