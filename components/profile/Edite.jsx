"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaTimes, FaSave } from 'react-icons/fa'
import { BiError, BiLoader } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { storage } from '@/utils/firebase/connection'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const EditableTap = ({ user, handleProfileUpdate, uid }) => {

    const [name, setName] = useState(user.displayName)
    const [selectedAvatar, setSelectedAvatar] = useState(user.photoURL)
    const router = useRouter()
    const [newUrl, setNewUrl] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleAvatarChange = async(e) => {
        setLoad(true)

        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setSelectedAvatar(reader.result)
        }

        if (file) {
            reader.readAsDataURL(file)

            const storageRef = ref(storage, `avatars/${uid}/${Date.now()}`)
            await uploadBytes(storageRef, file)
            const imageUrl = await getDownloadURL(storageRef)

            setNewUrl(imageUrl)
        }

        setLoad(false)

    }

    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)

    const handleUpdate = async () => {

        setLoad(true)
        const state = await handleProfileUpdate(newUrl ? newUrl : selectedAvatar, name)

        if (state) {
            router.push("/me")
        } else {
            setError(true)
        }
        setLoad(false)
    }

    return (
        <div className="p-3 fixed inset-0 flex items-center bg-base-300/80 justify-center z-50">
            <div className="text-white bg-base-100 border-2 border-accent overflow-y-auto w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
                {
                    error &&
                    <div className="z-10 text-white font-medium flex items-center justify-center gap-2 flex-row w-full mb-3 p-3  bg-error ">
                        <BiError className="text-xl" />
                        Someting Goes Wrong

                        <button onClick={() => setError(false)} className=" opacity-70 hover:opacity-100 p-0.5 ml-5 bg-base-200 text-white ">
                            <FaTimes />
                        </button>
                    </div>
                }
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <div className="max-h-[60vh] overflow-y-auto">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-white/70">Name</label>
                        <input
                            className="w-full focus:border bg-base-200 border-gray-300 rounded-lg px-3 py-2 mt-1"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <label htmlFor='imUp' className="mb-4 p-0.5">
                        <p className="mb-3 block text-sm font-medium text-white/70">Avatar Image</p>
                        {selectedAvatar && (
                            <div className="mb-4">
                                <img
                                    className="w-40 m-auto h-40 object-cover rounded-full"
                                    src={selectedAvatar}
                                    alt="Selected Avatar"
                                />
                            </div>
                        )}
                    </label>
                    <input
                        id='imUp'
                        className="hidden focus:border bg-base-200 border-gray-300 rounded-lg px-3 py-2 mt-1"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <Link href="/me"
                        className="flex items-center text-sm bg-neutral-950 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        <FaTimes className="inline-block mr-1" /> Cancel
                    </Link>
                    {
                        !load ?
                            <button
                                className="flex items-center text-sm  bg-accent rounded-lg text-white px-4 py-2"
                                onClick={handleUpdate}
                            >
                                <FaSave className="inline-block mr-1" /> Save
                            </button> :
                            <button
                                className="flex items-center text-sm  bg-accent rounded-lg text-white px-4 py-2"
                            >
                                <BiLoader className="inline-block animate-spin mr-1" />
                            </button>
                    }
                </div>

            </div>
        </div>
    )
}


export default EditableTap