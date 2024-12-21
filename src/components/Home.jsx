import React from 'react'
import { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import { useEffect } from 'react';

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allpaste=useSelector((state)=>state.paste.pastes);

    useEffect(() => {
        if(pasteId){
          const paste=allpaste.find((p)=>
          p._id===pasteId);
          setTitle(paste.title)
          setValue(paste.content);
        }
      }, [pasteId])

    //paste ko create kar aur slice ko send kar de 
    function createPaste() {
        const paste = {
            title: title,
            _id: Date.now().toString(12),
            content: value,
            createdAt:new Date().toISOString(),
        }
        dispatch(addToPaste(paste))

        //clear
        setTitle('');
        setValue('');
        setSearchParams({})


    }

    function updatepaste() {
        const paste= {
            title: title,
            _id: pasteId,
            content: value,
            createdAt: new Date().toISOString(),
        }
        dispatch(updateToPaste(paste))
        setTitle('');
        setValue('');
        setSearchParams({})
    }

   
    

    return (
        <div className='w-[100%]  '>
            <div className='p-3 flex gap-6 justify-between w-[88%] m-auto'>
                <input
                    type='text'
                    placeholder='enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='text-white  px-2 rounded-sm bg-gray-500/50 w-[75%]  ' />

                <button type='submit'
                    className='bg-gray-700/100 py-2 px-2 rounded hover:bg-blue-500/100 '
                    onClick={pasteId ? updatepaste:createPaste}>
                    {
                        pasteId ? "Update Paste" : "Create my Paste"
                    }
                </button>
                
            </div>

            <div>
                <textarea

                    value={value}
                    placeholder="Enter content here "
                    onChange={(e) => { setValue(e.target.value) }}
                    rows={25}
                    className='rounded w-[90%] bg-gray-500/50 p-4 border-2 border-gray-500/50 mt-4 mon-w-[600px]'
                >

                </textarea>
            </div>
        </div>
    )
}

export default Home
