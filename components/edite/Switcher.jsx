import { BiLoader } from 'react-icons/bi'
import { RiEdit2Line, RiEyeLine, RiSave2Fill } from 'react-icons/ri'

const Switcher = ({ isFirstSection, setIsFirstSection, handleSave, load }) => {

    return (
        <div className="sticky top-0 w-full bg-base-200 flex gap-3 p-3 items-center justify-end flex-row">
            <button onClick={() => setIsFirstSection(false)} className={`${!isFirstSection ? "btn  btn-accent" : " btn  btn-accent btn-outline bg-base-300 "} text-white`}>
                <RiEdit2Line className="mr-2" />
                Edite
            </button>
            <button onClick={() => setIsFirstSection(true)} className={`${isFirstSection ? "btn  btn-accent" : " btn  btn-accent btn-outline bg-base-300 "} text-white`}>
                <RiEyeLine className="mr-2" />
                Preview
            </button>
            <div className='flex-1 flex items-center justify-end'>
                <button onClick={handleSave} className="btn text-white text-lg btn-accent ">
                    {load ?
                        <BiLoader className='animate-spin' /> :
                        <RiSave2Fill />
                    }
                </button>
            </div>
        </div>
    )
}

export default Switcher