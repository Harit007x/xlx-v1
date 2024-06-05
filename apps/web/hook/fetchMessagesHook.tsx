'use client'
import React, { useEffect, useState } from 'react'
import { getSessionMessages } from '../actions/session/session-actions'
import { SessionMessagesSchema } from '../actions/session/types'

const FetchMessagesHook = (room_code:string) => {
    const [count, setCount] = useState<number | undefined>(0)
    const [data, setData] = useState<SessionMessagesSchema[] | undefined>()

    const fetchData = async (limit?:number, offset?:number) => {
        try{
            const response = await getSessionMessages(room_code, limit, offset)
            console.log("wowo =", response)
            setCount(response.count)
            setData(response.data)
        }catch(err:any){
            console.log('error =', err)
        }finally{

        }
    }
    useEffect(()=>{
        fetchData(10, 0)
    },[])

    return {
        data,
        count,
        fetchData
    }
}

export default FetchMessagesHook