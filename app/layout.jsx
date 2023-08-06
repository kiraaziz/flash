import NavBar from "@/components/NavBar"
import "@/utils/styles/globals.css"

const PostLayout = ({ children }) => {

    return (
        <html data-theme="dracula" className="bg-neutral-800">
            <body className="w-full h-[100svh] flex flex-col">
                <NavBar />
                <div className=" bg-base-100 w-full flex-1 flex-col overflow-auto">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default PostLayout

//loading states =>me =>edite
//delete post =>add tab= delete like logout
//show personal detail on postes => post
//search page => no info
//home page => no info