"use client"

import Link from "next/link"
import React from "react"
import { TiFlash } from "react-icons/ti"
import { BiSearch } from "react-icons/bi"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase/connection"

const NavBar = () => {

    const [user, loading, error] = useAuthState(auth)

    return (
        <div className="px-3 navbar bg-accent">
            <Link href="/" className="text-lg font-bold flex flex-row space-x-2 justify-start text-white navbar-start flex-1 ">
                <TiFlash className="text-3xl" />
                Flash Read
            </Link>
            <div className=" navbar-end space-x-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center p-2">
                    <BiSearch className="text-3xl text-white" />
                </div>
                {
                    loading || error ? null
                        : user ?
                            <Link href="/me" className="w-12 h-12 bg-base-300 rounded-full flex items-center justify-center p-0.5">
                                <img className="h-full w-full rounded-full object-cover" src={user?.photoURL} />
                            </Link>
                            : <Link href="/me" className="hover:scale-105 ease-in-out duration-200 bg-base-300 text-white rounded-lg txet-md px-4 py-2" >Login</Link>
                }
            </div>
        </div>
    )
}

export default NavBar