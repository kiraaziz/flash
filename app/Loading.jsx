"use client"

import { AiOutlineLoading } from "react-icons/ai"

const Loading = () => {

    return (
        <div className="h-[80svh] w-full flex items-center justify-center">
            <div className="h-24 w-24">
                <AiOutlineLoading className="m-auto animate-spin text-white text-7xl font-bold" />
            </div>
        </div>
    )
}

export default Loading