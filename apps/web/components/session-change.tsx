'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../../../packages/store/src/atoms'
import { Icons } from '@repo/ui/icons'

const SessionChange = () => {
    console.log("on session change")
    const session = useSession()
    const setUser = useSetRecoilState(userAtom);
    useEffect(()=>{
        setUser({
            // @ts-ignore
            user_id: session?.data?.user?.id,
            // @ts-ignore
            username: session?.data?.user?.username,
            // @ts-ignore
            first_name: session?.data?.user?.first_name,
            // @ts-ignore
            last_name: session?.data?.user?.last_name,
        });
    },[session])
    // if (session.status === 'loading') {
    //     return(
    //         <main className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center ">
    //             <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
    //         </main>
    //     )
    // }
    return null
}

export default SessionChange