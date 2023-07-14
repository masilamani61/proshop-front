import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import { base_url } from '../constants'
import { producturl } from '../constants';

const basequery=fetchBaseQuery({
    baseUrl:base_url
})

export const apislice=createApi({
    baseQuery:basequery,
    tagTypes:['product','order','user'],
    endpoints:(builder)=>({
        getproduct:builder.query ({ 
            query:(p)=>p
    })
})})
export const { useGetProductQuery }=apislice;