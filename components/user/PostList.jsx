import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

const PostList = ({ postList }) => {

    const truncateString=(str, maxLength)=> {

        if (str.length <= maxLength) {
            return str
        }

        const truncatedString = str.slice(0, maxLength - 3) + '...'
        return truncatedString
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-4 gap-6">
            {
                postList.map((val) => {
                    return (
                        <div className=" bg-base-300 p-4 rounded-lg shadow-md flex flex-col">
                            <Link href={`/post/${val.data.url}`} className="flex-1">
                                <img
                                    className="w-full h-40 object-cover mb-4 rounded-lg"
                                    src={val.data.image}
                                    alt="Post Image"
                                />
                                <h3 className="text-lg text-accent font-semibold mb-2">{truncateString(val.data.title, 60)}</h3>
                                <p className="text-white/80 mb-4 ">{truncateString(val.data.description, 100)}</p>

                            </Link>
                            <Link href={`/me/edite/${val.id}`} className="text-white text-lg flex flex-row items-center justify-center bg-accent p-2 w-full rounded-lg ">
                                <FaEdit className="mr-3 " />
                                Edite
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default PostList