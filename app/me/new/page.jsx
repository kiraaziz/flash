'use client'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase/connection"
import { collection, addDoc, getDocs, query, where, setDoc, doc } from "firebase/firestore"
import { firestore } from "@/utils/firebase/connection.ts"
import { useState } from 'react'
import Context from "@/components/edite/Context"
import Switcher from "@/components/edite/Switcher"
import Editor from "@/components/edite/Editor"
import { BiError } from "react-icons/bi"
import { FaTimes } from "react-icons/fa"

const CreatePost = () => {

    const [user] = useAuthState(auth)
    const [isFirstSection, setIsFirstSection] = useState(!true);
    const [isConfirmationIncorrect, setIsConfirmationIncorrect] = useState(false)
    const [load, setLoad] = useState(false)
    const [post, setPost] = useState({
        title: "",
        description: "",
        tag: "",
        image: "",
        view: 0,
        url: "",
        uid: "",
        createAt: 0,
        updateAt: 0,
        content: ""
    })
    const [oldUrl, setOldUrl] = useState()
    const [id, setId] = useState()

    const handleSave = async () => {

        if (post.title && post.description && post.tag && post.image && post.content.length > 0) {
            setIsConfirmationIncorrect(false)
            setLoad(true)

            try {

                let newData = post

                newData.view = 0
                newData.url = newData.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')
                newData.url = newData.url.trim()
                newData.uid = user.uid

                newData.createAt = Date.now()
                newData.updateAt = Date.now()

                const counter = await getDocs(query(collection(firestore, "post"), where("url", "==", newData.url)))

                if (counter.size === 0) {
                    const data = await addDoc(collection(firestore, "post"), newData)
                    setOldUrl(newData.url)
                    setId(data.id)
                } else {

                    setIsConfirmationIncorrect(true)
                    alert("Title Already Exist : Try An Other One")
                }

            } catch (e) {
                setIsConfirmationIncorrect(true)
            }
            setLoad(false)

        } else {
            setIsConfirmationIncorrect(true)
        }
    }

    const handleUpdate = async () => {

        if (post.title && post.description && post.tag && post.image && post.content.length > 0) {
            setIsConfirmationIncorrect(false)
            setLoad(true)

            try {

                let newData = post

                newData.url = newData.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')
                newData.url = newData.url.trim()

                newData.updateAt = Date.now()

                const counter = await getDocs(query(collection(firestore, "post"), where("url", "==", newData.url)))

                let first = counter.size === 0
                let second = counter.size >= 1 && (oldUrl ? oldUrl === newData.url : newData.url === post.url)

                if (first || second) {
                    const data = await setDoc(doc(firestore, "post", id), post)
                    setOldUrl(post.url)
                } else {
                    setIsConfirmationIncorrect(true)
                    alert("Title Already Exist : Try An Other One")
                }

            } catch (e) {
                setIsConfirmationIncorrect(true)
            }
            setLoad(false)

        } else {
            setIsConfirmationIncorrect(true)
        }
    }

    return (

        <div className="realive flex flex-col h-full w-full">
            <Switcher
                isFirstSection={isFirstSection}
                setIsFirstSection={setIsFirstSection}
                handleSave={id ? handleUpdate : handleSave}
                load={load}
            />
            <div className="w-full overflow-auto flex-1">
                {!isFirstSection ?
                    <Editor
                        post={post}
                        setPost={setPost}
                    />

                    : <Context post={post} />}
            </div>
            {
                isConfirmationIncorrect &&
                <div className="z-10 text-white font-medium flex items-center justify-center gap-2 flex-row absolute bottom-0 right-0 p-3  bg-error ">
                    <BiError className="text-xl" />
                    Someting Goes Wrong

                    <button onClick={()=>setIsConfirmationIncorrect(false)} className=" opacity-70 hover:opacity-100 p-0.5 ml-5 bg-base-200 text-white ">
                        <FaTimes />
                    </button>
                </div>
            }
        </div>
    )

}

export default CreatePost