import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function AdminRoute({children}) {
    console.log(children)
   const {userinfo}=useSelector(state=>state.auth)
   console.log(userinfo)
      
    if (!userinfo.isadmin){
      console.log('come')
      return <Navigate to='/'/>
    }
      return children

  
}

export default AdminRoute