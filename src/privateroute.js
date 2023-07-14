import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Private({children}) {
  console.log(children)
   const {userinfo}=useSelector(state=>state.auth)
   console.log(userinfo)
      
    if (!userinfo){
      console.log('come')
      return <Navigate to='/login'/>
    }
      return children
}

export default Private