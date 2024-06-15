'use client'

import { useState } from 'react'
import { Button } from './shadcn/ui/button'
import { Icons } from './icons'
import { toast } from 'sonner'

interface CopyButtonProps {
  textToCopy: any
  className: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)

      toast.success('Link copied')

      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Button
      type="button"
      size={'icon'}
      className={`hover:bg-secondary bg-background text-foreground border border-secondary ${className}`}
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? <Icons.check className="h-4 w-4" /> : <Icons.clipBoard className="h-4 w-4" />}
    </Button>
  )
}
