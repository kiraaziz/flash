"use client"

import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa'
import { auth } from "@/utils/firebase/connection.ts"

const Login = () => {

    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const twitterProvider = new TwitterAuthProvider()

    const testProvider = () => signInWithEmailAndPassword(auth, "kiraaziz@gmail.com", "test12345")

    return (
        <div className=" flex flex-col justify-center sm:px-6 lg:px-8 h-full py-24">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Sign in with your social account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" bg-accent py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex justify-center">
                        <button onClick={testProvider} className="hover:scale-110 ease-in-out duration-200 rounded-full p-2.5 bg-base-300 text-white mr-2">
                            <FaFacebook className="w-7 h-7" />
                        </button>
                        <button onClick={() => signInWithPopup(auth, twitterProvider)} className="hover:scale-110 ease-in-out duration-200 rounded-full p-2.5 bg-base-300 text-white mr-2">
                            <FaTwitter className="w-7 h-7" />
                        </button>
                        <button onClick={() => signInWithPopup(auth, googleProvider)} className="hover:scale-110 ease-in-out duration-200 rounded-full p-2.5 bg-base-300 text-white">
                            <FaGoogle className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login