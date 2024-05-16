import React from 'react'
import { Badge } from '@repo/ui/shadcn'
import { SessionBoxItems } from '../types/types'
import { Icons } from '../../../packages/ui/src/icons'

const SessionBox = (props: SessionBoxItems) => {
  return (
    <main className='flex flex-col p-4 gap-3 border border-foreground/10 rounded-lg'>
        
        <div className='flex flex-col gap-2'>

            <p className='font-bold text-md'>{props.sessionName}</p>
            
            <p className='text-sm font-font-semibold'>{props.scheduledDateTime}</p>
    
            <p className='text-sm text-muted-foreground'>{props.description}</p>
        
        </div>
        
        <span className='flex justify-between'>
            <div className='flex gap-2'>
                {props.tags.map((item:string, index:number)=>{
                  return(
                    <Badge>{item}</Badge>
                  )
                })}
            </div>
            <Icons.link2 width="18" height="18"/>
        </span>
    </main>
  )
}

export default SessionBox