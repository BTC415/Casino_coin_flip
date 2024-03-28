import React from "react"
export default function PageWrapper({ children }:{children:React.ReactNode}) {
    return (
        <div className=' overflow-y-auto  w-full min-h-screen bg-[#212121] z-40 absolute top-0' >
            {children}
        </div>
    )
}