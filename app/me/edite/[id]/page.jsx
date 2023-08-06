'use client'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase/connection"
import { useRouter } from 'next/navigation'
import { collection, getDoc, addDoc, getDocs, query, where, doc, setDoc } from "firebase/firestore"
import { firestore } from "@/utils/firebase/connection.ts"
import { useEffect, useState } from 'react'
import Context from "@/components/edite/Context"
import Switcher from "@/components/edite/Switcher"
import Editor from "@/components/edite/Editor"
import { BiError } from "react-icons/bi"

const CreatePost = ({ params }) => {

    const router = useRouter()
    const [user] = useAuthState(auth)

    const [post, setPost] = useState({
        title: "",
        description: "",
        tag: "",
        image: "",
        view: 0,
        createAt: 0,
        updateAt: 0,
        url: "",
        uid: "",
        content: ""
    })

    const [oldUrl, setOldUrl] = useState("")
    let myData

    const getPost = async () => {

        myData = await getDoc(doc(firestore, "post", params.id))
        if (!myData.exists() || myData.data().uid !== user.uid) {
            router.push(`/me/new`)
        } else {
            setPost(await myData.data())
            setOldUrl(post.url)
        }
    }

    useEffect(() => {
        getPost()
    }, [])


    const [isFirstSection, setIsFirstSection] = useState(false);

    const [isConfirmationIncorrect, setIsConfirmationIncorrect] = useState(false)

    const [load, setLoad] = useState(false)

    const handleSave = async () => {

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
                    const data = await setDoc(doc(firestore, "post", params.id), post)
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

        <div className="relative flex flex-col h-full w-full">
            <Switcher
                isFirstSection={isFirstSection}
                setIsFirstSection={setIsFirstSection}
                handleSave={handleSave}
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