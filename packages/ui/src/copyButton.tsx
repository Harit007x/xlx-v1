'use client'

import { useState } from "react";
import { Button } from "./shadcn/ui/button";
import { Icons } from "./icons";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button 
      size={'icon'}
      className={`hover:bg-secondary bg-secondary text-foreground  ${copied && "bg-foreground hover:bg-foreground text-background"}`}
      onClick={handleCopy}
    >
      {copied ? <Icons.clipboardCheck/> : <Icons.clipBoard/>}
    </Button>
  );
};

export {CopyButton}