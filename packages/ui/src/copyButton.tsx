'use client';

import { useState } from 'react';
import { Button } from './shadcn/ui/button';
import { Icons } from './icons';
import { toast } from 'sonner';
import clsx from 'clsx';

interface CopyButtonProps {
  textToCopy: any
  className: string
  toastMessage: string
  type?: 'text' | 'icon'
  beforeCopyText?: string
  afterCopyText?: string
}

export const CopyButton = (props: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(props.textToCopy);
      setCopied(true);

      toast.success(props.toastMessage, {
        duration: 1500,
      });

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button
      type="button"
      size={'icon'}
      variant={'outline'}
      className={clsx(
        `hover:bg-secondary bg-background text-foreground border border-secondary ${props.className}`,
        {
          'w-full': props.type=='text',
        }
      )}
      onClick={handleCopy}
      disabled={copied}
    >
      {
        props.type == 'text'
        ?
          copied 
            ? 
              props.afterCopyText
            : 
              props.beforeCopyText
        :
          copied
            ? 
              <Icons.check className="h-4 w-4" />
            : 
              <Icons.clipBoard className="h-4 w-4" />
      }
    </Button>
  );
};
