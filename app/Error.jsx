"use client"

import { BiErrorAlt } from "react-icons/bi"

const Error = () => {

    return (
        <div className="h-full w-full flex items-center justify-center">
            <h1 className="flex flex-row items-center justify-center text-xl font-semibold text-red-500 odd:">
                <BiErrorAlt className="text-3xl mr-3" />
                Something Goes Wrong
            </h1>
        </div>
    )
}

export default Error