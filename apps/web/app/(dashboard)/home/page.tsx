'use client'
import { Button } from '@repo/ui/shadcn'
import { signOut } from 'next-auth/react'
import React from 'react'

const Home = () => {
  return (
    <main>
      Home
      <Button
          onClick={() => signOut()}
        >
          Logout
      </Button>

    </main>
  )
}

export default Home