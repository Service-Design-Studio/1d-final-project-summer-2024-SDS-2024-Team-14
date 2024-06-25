import { useState } from 'react'
export default function LoginCarousel() {
    const [onLoginTab, setOnLoginTab] = useState(true);
    return (
        <div className='flex relative flex-row w-full bg-gradient-to-t from-[#334155] to-transparent transition-all duration-300 text-2xl font-semibold'>
            <div id="tab"
                className={`absolute ${onLoginTab ? `left-0 animate-slideIn` : `right-0 animate-slideOut`} pointer-events-none z-10 bg-white/100 w-1/2 transition-all duration-300 mix-blend-overlay rounded-t-xl border-white`}>&nbsp;</div>
            <div className='z-00 flex-1 flex flex-row h-fit mx-auto px-2 bg-disabled text-center transition-all duration-1000'>
                <div onClick={() => setOnLoginTab(true)} className={`${onLoginTab ? "text-default" : "text-white font-normal"} flex-1 w-1/2`}>Login</div>
                <div onClick={() => setOnLoginTab(false)} className={`${onLoginTab ? " text-white font-normal" : "text-default"} flex-1 w-1/2`}>Sign up</div>
            </div>
        </div>
    )
}