'use client'

import React from 'react'
import { Button } from './ui/button';
import axios from 'axios';
import { createUser } from '@/lib/action';

const User = () => {
  
  const handleClick = async () => {
    createUser('Barry', 'ok')
  }

  return (
    <div>
        <Button className='text-red-400' onClick={handleClick}>Create User</Button>
    </div>
  )
}

export default User