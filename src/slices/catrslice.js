import {createSlice } from '@reduxjs/toolkit'

const initialState=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{cartitem:[],shippinaddress:{},payment:{}}
const cartslice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addtocart:(state,action)=>{
            const item =action.payload
            const exist=state.cartitem.find(x=>x._id===item._id)
            if (exist){
                state.cartitem=state.cartitem.map(x=>x._id==exist._id?item:x);
            }
            else{
                state.cartitem=[...state.cartitem,item]
            }
            state.itemprice=state.cartitem.reduce((acc,item)=>acc+item.price*item.quantity,0)
        
            localStorage.setItem('cart',JSON.stringify(state))

        },
        removefromcart:(state,action)=>{
            const id=action.payload
            state.cartitem=state.cartitem.filter(x=>x._id!==id)
            state.itemprice=state.cartitem.reduce((acc,item)=>acc+item.price*item.quantity,0)
            localStorage.setItem('cart',JSON.stringify(state))
        },
        shippingaddress:(state,action)=>{
            const address=action.payload
            state.shippinaddress=address
            localStorage.setItem('cart',JSON.stringify(state))
        },
        paymentmethod:(state,action)=>{
            state.payment=action.payload
            localStorage.setItem('cart',JSON.stringify(state))

        },
        deletecart:(state,action)=>{
            localStorage.removeItem('cart')
        }
    }
})
export const {addtocart,removefromcart,shippingaddress,paymentmethod,deletecart}=cartslice.actions
export default cartslice.reducer;