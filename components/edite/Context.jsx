import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Context = ({ post }) => {

    return (
        <div className="max-w-xl p-3 m-auto h-full ">
            <div className="min-h-fit grid md:grid-cols-1 grid-cols-1">
                <div className="col-span-1 py-5 space-y-3">
                    {post.title && 
                        <h1 className="text-accent text-5xl font-bold">{post.title}</h1>
                    }
                    {post.tag && <div className="text-accent  w-max py-0.5 px-3 border-accent rounded-full border-2">{post.tag}</div>}
                </div>
                {post.image && <img className="w-full border-4 object-cover rounded-xl mb-5 col-span-1" src={post.image} />}
            </div>
            <ReactMarkdown 
                className='markdown py-5'
                children={post.content}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                id="code"
                                children={String(children).replace(/\n$/, '')}
                                style={dracula}
                                language={match[1]}
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </div>
    )
}

export default Context