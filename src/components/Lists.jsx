import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { ShareSocial } from 'react-share-social'

function Lists() {
    const style = {
        root: {
            background: 'black',
            borderRadius: 29,
        }
    }
    const [activeShare, setActiveShare] = useState(null);
    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();
    const [searchterm, setSearchTerm] = useState("");
    console.log(pastes);
    const filterteredData = pastes.filter((paste) => {
        return paste.title.toLowerCase().includes(searchterm.toLowerCase());
    })

    function deletethepaste(pasteId) {
        dispatch(removeFromPaste(pasteId));
    }

    console.log("filter data", filterteredData);

    function toggleShare(pasteId) {
        setActiveShare((activeShare===pasteId)?null:pasteId)
    }




    return (
        <div>
            <input
                type="text"
                placeholder='Search Paste'
                value={searchterm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='p-2 bg-gray-500/100 rounded-2xl m-6 hover:bg-black hover:text-white  min-w-[500px]' />

            <div className='flex gap-6 flex-col h-full  border-3 border-white m-auto max-w-[1080px] '>

                {
                    filterteredData.length > 0 &&
                    filterteredData.map(
                        (paste) => {
                            return (
                                <div className='flex flex-row  justify-between items-start gap-2 px-8 py-9 bg-gray-600 rounded-xl border-2 h-60 mx-3 hover:bg-gray-800' key={paste._id}>
                                    <div className='flex gap-2  flex-wrap flex-col justify-start items-start w-[70%]'>
                                        <div className='font-bold text-xl font-serif text-start '> {paste.title}</div>
                                        <div className='font-serif text-start truncated' >{paste.content}</div>
                                    </div>

                                    <div className='flex  flex-wrap flex-col h-[100%] justify-between w-[30%]'>
                                        <div className='place-content-evenly space-x-2'>
                                            <button
                                                className='bg-slate-500 p-2 mt-2 rounded-xl hover:bg-blue-500/100'>
                                                <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                                            </button>

                                            <button
                                                className='bg-slate-500 p-2 mt-2 rounded-xl  hover:bg-blue-500/100'>
                                                <Link to={`/pastes/${paste?._id}`}>
                                                View
                                                </Link>
                                            </button>

                                            <button
                                                className='bg-slate-500 p-2 mt-2 rounded-xl  hover:bg-blue-500/100'
                                                onClick={() => deletethepaste(paste?._id)}>
                                                Delete
                                            </button>

                                            <button
                                                className='bg-slate-500 p-2 mt-2 rounded-xl  hover:bg-blue-500/100'
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paste?.content)
                                                    toast.success("Content is Copied")
                                                }}>
                                                Copy
                                            </button>
                                            <button
                                                className='bg-slate-500 p-2 mt-2 rounded-xl  hover:bg-blue-500/100'
                                                onClick={() => {
                                                    toggleShare(paste._id)
                                                    console.log(isActivate)
                                                }}>
                                                Share
                                            </button>
                                            {activeShare === paste._id && (
                                           <div>
                                        <ShareSocial
                                            url={paste.content}
                                            socialTypes={['facebook', 'whatsapp', 'linkedin']}
                                            style={style}
                                        />
                                    </div>
                                )}
                                        </div>
                                        <div>
                                            {paste.createdAt}
                                        </div>

                                    </div>



                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Lists
