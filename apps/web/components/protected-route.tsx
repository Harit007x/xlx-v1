'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { Icons } from './icons'

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const session = useSession()

    if (session.status === 'loading') {
        return(
            <main className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center ">
                <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
            </main>
        ) // Show a loading indicator
    }

    // @ts-ignore
    if (!session.data?.user.user_id) {
        redirect('/login');
    }

    return (
        <main>
            {children}
        </main>
    );
    
}

export default ProtectedRoute