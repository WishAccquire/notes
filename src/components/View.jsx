import React from "react"
import { useState ,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams,Link} from 'react-router-dom'

function View() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [isActivate, setIsActivate] = useState(true);
 
  //getting id
  const {id}=useParams();
  
  const allpaste=useSelector((state)=>state.paste.pastes);

 const paste=allpaste.find((p)=>p._id===id)
 
    
    return (
      <div className='w-[100%]  '>
      <div className='p-3 flex gap-6 justify-between w-[88%] m-auto'>
          <input
              type='text'
              value={paste.title}
              placeholder='enter title here'
              className='text-white  px-2 rounded-sm bg-gray-500/50 w-[75%]  ' 
              disabled={isActivate}/>

          <button type='submit'
              className='bg-gray-700/100 w-[20%] py-2 px-2 rounded hover:bg-blue-500/100 '>
               <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
          </button>
          <button type='submit'
              className='bg-gray-700/100 w-[20%] py-2 px-2 rounded hover:bg-blue-500/100 '
              onClick={() => {
                navigator.clipboard.writeText(paste?.content)
                toast.success("Content is Copied")
              }}>
               Copy
          </button>
          
      </div>

      <div>
          <textarea
              placeholder="Enter content here "
              rows={25}
              className='rounded w-[90%] bg-gray-500/50 p-4 border-2 border-gray-500/50 mt-4 mon-w-[600px]'
              disabled={isActivate}
          >
              {paste.content}
          </textarea>
      </div>
  </div>
    )
}

export default View

