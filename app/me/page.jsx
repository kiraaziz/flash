"use client"

import Link from 'next/link'
import { FaEdit, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import { auth, firestore, storage } from '@/utils/firebase/connection'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineLoading } from "react-icons/ai"
import EditableTap from "@/components/profile/Edite.jsx"
import LogoutTap from "@/components/profile/Logout.jsx"
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query, startAfter, startAt, where } from 'firebase/firestore'
import PostList from '@/components/user/PostList'
import { updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const Me = ({ searchParams }) => {

    const [user, loading, error] = useAuthState(auth)
    const [first, setFirst] = useState(true)
    const [from, setFrom] = useState()
    const [postList, setPostList] = useState([])
    const [loadingState, setLoadingState] = useState(false)
    const [size, setSize] = useState(0)

    const loadData = async () => {

        setLoadingState(true)
        setSize(
            (await getDocs(query(collection(firestore, "post"), where("uid", "==", user.uid)))).size
        )

        let myData

        if (!from) {
            myData = await getDocs(query(collection(firestore, "post"), where("uid", "==", user.uid), orderBy("updateAt", "desc"), limit(5)))
        } else {
            myData = await getDocs(query(collection(firestore, "post"), where("uid", "==", user.uid), orderBy("updateAt", "desc"), limit(5), startAfter(from)))
        }

        setFrom(myData.docs[4])

        setPostList((pre) => {

            let newList = [...pre]
            myData.forEach((val) => {
                let newOne = { id: val.id, data: val.data() }
                newList.push(newOne)
            })

            return newList

        })

        setLoadingState(false)
    }

    const handleProfileUpdate = async (selectedAvatar, name) => {
        try {
            
            await updateProfile(auth.currentUser, { displayName: name, photoURL: selectedAvatar })

            return true
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        if(first){
            loadData()
            setFirst(false)
        }
    }, [user])

    return (
        <div className="py-5 px-3.5 md:p-10 min-h-screen">
            {searchParams.tap === "edite" && <EditableTap uid={user.uid} handleProfileUpdate={handleProfileUpdate} user={user} />}
            {searchParams.tap === "logout" && <LogoutTap />}
            <div className=" bg-neutral-950 max-w-3xl mx-auto border-4 border-accent rounded-xl py-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="rounded-full border-4 border-white overflow-hidden mx-2">
                            <img
                                className="w-16 h-16 object-cover"
                                src={user?.photoURL}
                                alt="User Avatar"
                            />
                        </div>
                        <div className="md:ml-4">
                            <h1 className="text-2xl font-bold text-white">{user?.displayName || user?.email}</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link href="/me?tap=edite" className="flex items-center text-white text-sm px-4 py-2 bg-base-300 rounded mr-2">
                            <FaEdit className="mr-1" />
                            Edit
                        </Link>
                        <Link href="/me?tap=logout" className="flex items-center text-white text-sm px-4 py-2 bg-accent rounded">
                            <FaSignOutAlt className="mr-1" />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            <main className="container mx-auto py-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Posts</h2>
                    <Link href="/me/new" className=" bg-accent flex items-center text-white text-sm px-3 bg-neutral-950 py-1.5 rounded">
                        <FaPlus className="mr-1" />
                        Create New
                    </Link>
                </div>
                <PostList postList={postList} />
                {size < postList.length && <button onClick={loadData} className="text-white text-lg flex flex-row items-center justify-center bg-accent p-3 w-full my-3 rounded-lg">
                    {
                        loadingState ?
                            <AiOutlineLoading className="mx-auto text-2xl animate-spin text-white font-bold" />
                            : <h1>Load More</h1>
                    }
                </button>}
            </main>

        </div>
    )
}

export default Me

