"use client"

import 'react-quill/dist/quill.snow.css'
import { RiLoader4Line } from 'react-icons/ri'
import { useState } from "react"
import { storage } from "@/utils/firebase/connection"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const Editor = ({ post, setPost }) => {

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e, f) => {

        setPost((prevPost) => ({
            ...prevPost,
            [f]: e.target ? e.target.value : e,
        }))
    }


    const isImage = (file) => {
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
        return file && acceptedImageTypes.includes(file.type)
    }

    const handleFileChange = async (event) => {

        setLoading(true)
        const file = event.target.files[0]

        if (isImage(file)) {
            const uniqueId = Date.now().toString()
            const fileExtension = file.name.split('.').pop()
            const fileName = `${uniqueId}.${fileExtension}`
            const storageRef = ref(storage, `/post/cover/${fileName}`)

            try {
                await uploadBytes(storageRef, file)

                const downloadURL = await getDownloadURL(storageRef)

                setPost((prevPost) => ({
                    ...prevPost,
                    "image": downloadURL
                }))

            } catch (e) {
                alert('Error uploading file');
            }
        } else {
            alert("invalid file format. Please upload an image (JPEG, PNG, or GIF).")
        }

        setLoading(false)
    }

    return (
        <div className='w-full overflow-auto'>
            <div className=" max-w-2xl m-auto w-full p-2 lg:p-5">
                <div className='p-2 gap-2 flex items-center justify-between flex-col md:flex-row w-full mb-5'>
                    <input type="file" accept="image/*" className="hidden" id="upImage" onChange={handleFileChange} />
                    <label htmlFor="upImage" className="md:w-max w-full btn btn-accent gap-2 text-white">
                        {loading && <RiLoader4Line className="animate-spin" />}
                        {loading ? 'Uploading...' : 'Upload an image'}
                    </label>
                    {
                        post.image &&
                        <img className=' rounded-md object-cover w-full md:w-60 h-40' src={post.image} />
                    }
                </div>
                <div className='py-5 md:px-4 px-2 space-y-4 flex flex-col w-full'>
                    <input
                        className='input font-bold input-bordered text-lg bg-transparent'
                        placeholder='Title'
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={(e) => handleInputChange(e, "title")}
                    />
                    <textarea
                        placeholder='Post Description'
                        className='text-md bg-transparent textarea-bordered textarea bordered font-light'
                        id="description"
                        name="description"
                        rows={4}
                        value={post.description}
                        onChange={(e) => handleInputChange(e, "description")} >
                    </textarea>
                    <input
                        className=' w-24 px-3 py-2 border-2 bg-transparent rounded-full border-accent text-sm text-accent'
                        placeholder='Tag'
                        type="tag"
                        id="tag"
                        name="tag"
                        value={post.tag}
                        onChange={(e) => handleInputChange(e, "tag")}
                    />
                    <MDEditor
                        preview="edit"
                        value={post.content}
                        onChange={(e) => handleInputChange(e, "content")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Editor