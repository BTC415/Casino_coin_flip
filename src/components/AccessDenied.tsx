import { useEffect } from "react";
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls";

const AccessDenied = () => {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    return (
        <div style={{ height: '100vh', backgroundImage: `url(${VITE_API_ASSETS_IMAGE_URL}bg-access-denied.png)`, backgroundColor: "black", backgroundSize: "cover" , color: 'white' }}>
            
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col items-center text-center w-full">
                    
                    <div className="uppercase text-[40px] sm:text-[58px] font-mont font-bold relative h-[60px] sm:h-[86px] w-full text-center align-middle overflow-visible">
                        <h1 className="[text-shadow:-1px_1px_0_#C882FF,_1px_1px_0_#C882FF,_1px_-1px_0_#C882FF,_-1px_-1px_0_#C882FF]  text-[#CC00FF] blur-[10px] absolute top-0 w-full text-center">Access denied</h1>
                        <h1 className="[text-shadow:-1px_1px_0_#C882FF,_1px_1px_0_#C882FF,_1px_-1px_0_#C882FF,_-1px_-1px_0_#C882FF]  text-[#CC00FF] blur-[12px] absolute top-0 w-full text-center">Access denied</h1>
                        <h1 className="[text-shadow:-1px_1px_0_#C882FF,_1px_1px_0_#C882FF,_1px_-1px_0_#C882FF,_-1px_-1px_0_#C882FF]  text-[#CC00FF] absolute top-0 w-full text-center">Access denied</h1>
                        <h1 className="[text-shadow:2px_2px_0_#C882FF,_2px_2px_0_#C882FF,_2px_-2px_0_#C882FF,_-2px_-2px_0_#C882FF] absolute top-0 w-full text-center">Access denied</h1>
                        <h1 className="[text-shadow:2px_2px_2px_var(--tw-shadow-color)] shadow-[#dcbef5] absolute top-0 w-full text-center">Access denied</h1>
                    </div>
                    <p className="uppercase font-mont tracking-[3px] text-[10px] sm:text-[15px] font-bold">Please try again later</p>
                    <img alt="astronaut" src={`${VITE_API_ASSETS_IMAGE_URL}astronaut.gif`} className="max-w-[365px] w-full m-5 " />
                </div>
            </div>
        </div>
    )
}
export default AccessDenied;


