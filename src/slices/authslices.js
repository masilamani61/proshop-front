import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userinfo:localStorage.getItem('userinfo')?(JSON.parse(localStorage.getItem('userinfo'))):null
}

const authslice=createSlice(
    {
        name:"user",
        initialState,
        reducers:{
            setcreadiantials:(state,action)=>{
                console.log(action.payload.data)
                const user=action.payload
                state.userinfo=user
            
                localStorage.setItem('userinfo',JSON.stringify( user))
            },
            logout:(state,action)=>{
                state.userinfo=null
                localStorage.removeItem('userinfo')
            }
        }
    }
)
export const {setcreadiantials,logout}=authslice.actions
export default authslice.reducer