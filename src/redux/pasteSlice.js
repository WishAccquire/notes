import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes") ?
        JSON.parse(localStorage.getItem("pastes")) : []
};

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;

            //add the check for already exist check
            const index=state.pastes.findIndex((item)=>
            item._id===paste._id
        )

        const ti=state.pastes.findIndex((item)=>
        item.title===paste.title
    )

    if(ti>=0){
        toast("title is already presented")
    }

    else{

        if(index>=0){
            alert("it is already present")
        }
        else{
            state.pastes.push(paste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));

            //toast
            toast("paste created successfully");
        }
    }

        },
        updateToPaste: (state, action) => {
            const paste=action.payload
            const index=state.pastes.findIndex((item)=>
                item._id ===paste._id);
            if(index>=0){
                state.pastes[index]=paste;
            }
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast("paste updated  successfully");
        },
        resetAllPastes: (state, action) => {
          state.pastes=[];
          localStorage.removeItem("pastes");
        },
        removeFromPaste: (state, action) => {
           const paste=action.payload;
           console.log(paste);
           const index=state.pastes.findIndex((item)=>
        item._id===paste);
           if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("paste deleted")
           }
        },
    },
})


export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer