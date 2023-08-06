import { firestore } from "@/utils/firebase/connection.ts"
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dynamic from 'next/dynamic'

const getPostData = async (url) => {

    const res = {
        error: null,
        post: null
    }

    try {

        const q = query(collection(firestore, 'post'), where('url', '==', url))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0]
            const postId = docSnapshot.id
            const postData = docSnapshot.data()

            await updateDoc(doc(firestore, 'post', postId), { view: postData.view + 1 })

            res.post = { id: postId, ...postData }
        } else {
            res.error = 'Post not found.'
        }
    } catch (error) {
        res.error = 'Error fetching the post.'
    }

    return res
}

const Post = async ({ params }) => {

    const data = await getPostData(params.id)
    const post = data.post

    return (
        <div className="w-full p-1.5 md:p-3 " >
            {
                post &&
                <div className="w-full max-w-3xl mx-auto p-3">
                    <div className="min-h-fit grid md:grid-cols-1 grid-cols-1">
                        <div className="col-span-1 py-5 space-y-3">
                            {post.title &&
                                <h1 className="text-accent text-5xl font-bold">{post.title}</h1>
                            }
                            {post.tag && <div className="text-accent  w-max py-0.5 px-3 border-accent rounded-full border-2">{post.tag}</div>}
                        </div>
                        {post.image && <img className="w-full border-4 object-cover rounded-xl mb-5 col-span-1" src={post.image} />}
                    </div>

                </div>
            }
        </div>
    )
}

export default Post