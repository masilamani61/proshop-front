import {configureStore} from '@reduxjs/toolkit'
import {apislice} from './slices/apislice'
import cartsliceReducer from './slices/catrslice'
import authsliceReducer from './slices/authslices'
const store=configureStore({
    reducer:{
        [apislice.reducerPath]:apislice.reducer,
        cart:cartsliceReducer,
        auth:authsliceReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apislice.middleware)
    ,
    devTools:true
    
}
)
export default store