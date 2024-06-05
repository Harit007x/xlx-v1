import React from 'react'
import { Button, Input, DropdownMenu, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuContent} from "@repo/ui/shadcn";
import { Icons } from '@repo/ui/icons';

const QNAContainer = () => {
  return (
    <div className="flex h-[88vh] min-w-[30vw] flex-col border border-foreground/10 rounded-md">
        <header className="flex h-14 items-center justify-between border-b border-foreground/10 px-6 py-4 dark:border-gray-800">
            <h2 className="text-lg font-medium">Q&A</h2>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                <Icons.listFilter className="mr-2 h-4 w-4" />
                Filter
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value="upvotes">
                <DropdownMenuRadioItem value="upvotes">Sort by Upvotes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="downvotes">Sort by Downvotes</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <div className="flex-1 overflow-auto px-6 py-4">
            <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="space-y-1">
                <h3 className="text-base font-medium">How do I set up my development environment?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-foreground">@Ron-Shanks</span> • 10:00AM
                </p>
                </div>
                <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                    <Icons.ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">12</span>
                <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                    <Icons.chevronDown className="h-4 w-4" />
                </Button>
                </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="space-y-1">
                <h3 className="text-base font-medium">What is the recommended deployment strategy?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    I'd like to know the best way to deploy my application.
                </p>
                </div>
                <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                    <Icons.ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">8</span>
                <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                    <Icons.chevronDown className="h-4 w-4" />
                </Button>
                </div>
            </div>
            </div>
        </div>
        <div className="border-t border-foreground/10 p-4 dark:border-gray-800">
            <form>
            <div className="flex items-center gap-4">
                <Input className="flex-1" placeholder="Type your message..." type="text" />
                <Button 
                    type="submit"
                    className="flex gap-2"
                >
                    Ask
                </Button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default QNAContainer