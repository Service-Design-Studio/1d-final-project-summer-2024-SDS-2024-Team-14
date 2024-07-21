
// const tabs=['Education', 'Health', 'Property', 'Family']

// export default function idCarousel{
//     return (
//         <div className='flex relative flex-row transition-all duration-300 text-2xl font-semibold cursor-pointer'>
//             <div
//                 className={`absolute ${props.onLoginTab ? `left-0 animate-slideIn` : `right-0 animate-slideOut`} pointer-events-none z-10 bg-white/100 w-1/2 transition-all duration-300 mix-blend-overlay rounded-t-xl border-2 border-white py-2`}>&nbsp;</div>
//             <div className='z-0 flex-1 flex flex-row px-2 bg-gray text-center transition-all duration-1000 border-gray rounded-t-xl'>
//                 <div id="loginTab" onClick={() => props.setOnLoginTab(true)} className={`${props.onLoginTab ? "text-default" : "text-gray font-normal"} flex-1 w-1/2 py-2`}>Login</div>
//                 <div id="signUpTab" onClick={() => props.setOnLoginTab(false)} className={`${props.onLoginTab ? " text-gray font-normal" : "text-default"} flex-1 w-1/2 py-2`}>Sign up</div>
//             </div>
//         </div>
//     )
// }