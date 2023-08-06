"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase/connection'
import { useRouter } from 'next/navigation'

const LogoutTap = () => {

    const router = useRouter()
    
    const [confirmationWord, setConfirmationWord] = useState('')
    const [isConfirmationIncorrect, setIsConfirmationIncorrect] = useState(false)

    const handleConfirmationWordChange = (e) => {
        setConfirmationWord(e.target.value)
        setIsConfirmationIncorrect(false)
    }

    const handleLogout = () => {
        if (confirmationWord === 'LOGOUT') {
            signOut(auth)
            router.push("/me")
        } else {
            setIsConfirmationIncorrect(true)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-3 z-50 bg-base-300/80">
            <div className=" bg-base-100 text-white border-2 border-accent w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Logout</h2>
                <p className="mb-4">
                    Please type the word <span className="font-semibold text-accent">LOGOUT</span> to confirm.
                </p>
                <input
                    className={` bg-base-200 w-full border ${isConfirmationIncorrect ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent`}
                    type="text"
                    value={confirmationWord}
                    onChange={handleConfirmationWordChange}
                />
                {isConfirmationIncorrect && (
                    <p className="text-red-500 text-sm mt-1">Incorrect confirmation word</p>
                )}
                <div className="flex justify-end mt-4">
                    <Link href="/me"
                        className="flex items-center text-sm bg-neutral-950 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        <FaTimes className="mr-1" />
                        Cancel
                    </Link>
                    <button
                        className="flex items-center text-sm  bg-accent rounded-lg text-white px-4 py-2"
                        onClick={handleLogout}
                    >
                        <FaCheck className="mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutTap