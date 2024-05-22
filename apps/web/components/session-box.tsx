import React from 'react'
import { Badge } from '@repo/ui/shadcn'
import { TSessionBoxItems } from '../types/types'
import { Icons } from '../../../packages/ui/src/icons'

const SessionBox = (props: TSessionBoxItems) => {
  return (
    <main className='flex flex-col p-4 gap-3 border border-foreground/10 rounded-lg hover:bg-secondary' onClick={props.onClick}>
        
        <div className='flex flex-col gap-2'>

            <p className='font-bold text-md'>{props.name}</p>
            
            <p className='text-sm font-font-semibold'>{props.schedule_date_time.toLocaleString()}</p>
    
            <p className='text-sm text-muted-foreground'>{props.description}</p>
        
        </div>
        
        <span className='flex justify-between'>
            <div className='flex gap-2'>
                {props.tags.map((item:any, index:number)=>{
                  return(
                    <Badge key={item.value} >{item.value}</Badge>
                  )
                })}
            </div>
            <Icons.link2 width="18" height="18"/>
        </span>
    </main>
  )
}

export default SessionBox